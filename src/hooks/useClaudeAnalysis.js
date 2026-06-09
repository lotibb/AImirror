import { useState, useCallback } from 'react'
import Anthropic from '@anthropic-ai/sdk'
import { PROMPTS, MOCK_RESPONSES } from '../constants/prompts'

// URL of an optional Cloudflare Worker proxy that holds the key server-side.
const PROXY_URL = import.meta.env.VITE_PROXY_URL || ''

// Anthropic key baked into the build so anyone using the deployed app can run
// real analysis. Lives in the public bundle — only safe on a host that isn't a
// scanned public git repo (e.g. Netlify Drop), or it gets auto-revoked.
const EMBEDDED_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || ''

// Claude supports these image media types; anything else (e.g. HEIC) won't work.
const SUPPORTED_MEDIA = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

function buildPayload(base64DataUrl, region) {
  // Derive the real media type from the data URL so uploaded PNG/WebP/GIF images
  // work, not just JPEG captures from the camera.
  const match = /^data:([^;]+);base64,(.*)$/s.exec(base64DataUrl)
  const detectedType = match?.[1]
  const mediaType = SUPPORTED_MEDIA.includes(detectedType) ? detectedType : 'image/jpeg'
  const base64 = match?.[2] ?? base64DataUrl.split(',')[1]

  return {
    model: 'claude-opus-4-8',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
        { type: 'text', text: PROMPTS[region] || PROMPTS.face },
      ],
    }],
  }
}

export function useClaudeAnalysis() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyze = useCallback(async (base64DataUrl, region) => {
    setLoading(true)
    setError(null)

    try {
      const userKey = localStorage.getItem('ma_api_key') || ''
      const directKey = userKey || EMBEDDED_API_KEY
      // Real analysis by default; demo only when explicitly enabled, or when
      // there's no way to reach the API at all.
      const demoMode = localStorage.getItem('ma_demo_mode') === 'true' || (!PROXY_URL && !directKey)

      if (demoMode) {
        await new Promise(r => setTimeout(r, 2000))
        return MOCK_RESPONSES[region] || MOCK_RESPONSES.face
      }

      const payload = buildPayload(base64DataUrl, region)

      // Direct call (personal key from Account page, or the embedded key).
      // A personal key takes priority over the proxy; the proxy takes priority
      // over the embedded key.
      if (userKey || (!PROXY_URL && directKey)) {
        const client = new Anthropic({ apiKey: directKey, dangerouslyAllowBrowser: true })
        const response = await client.messages.create(payload)
        return response.content[0].text
      }

      // Optional proxy path (only if VITE_PROXY_URL is configured).
      const res = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error?.message || `Request failed (${res.status})`)
      }
      return data.content[0].text
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { analyze, loading, error }
}
