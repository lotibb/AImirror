import { useState, useCallback } from 'react'
import Anthropic from '@anthropic-ai/sdk'
import { PROMPTS, MOCK_RESPONSES } from '../constants/prompts'

// Baked into the build at deploy time (see .env). Lets anyone using the
// deployed app run real analysis without entering their own key.
const EMBEDDED_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || ''

// Claude supports these image media types; anything else (e.g. HEIC) won't work.
const SUPPORTED_MEDIA = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

export function useClaudeAnalysis() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyze = useCallback(async (base64DataUrl, region) => {
    setLoading(true)
    setError(null)

    try {
      // A user-supplied key (Account page) overrides the embedded one.
      const apiKey = localStorage.getItem('ma_api_key') || EMBEDDED_API_KEY
      // Real analysis by default; demo only when explicitly enabled or no key.
      const demoMode = localStorage.getItem('ma_demo_mode') === 'true' || !apiKey

      if (demoMode) {
        await new Promise(r => setTimeout(r, 2000))
        return MOCK_RESPONSES[region] || MOCK_RESPONSES.face
      }

      const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })

      // Derive the real media type from the data URL so uploaded PNG/WebP/GIF
      // images work, not just JPEG captures from the camera.
      const match = /^data:([^;]+);base64,(.*)$/s.exec(base64DataUrl)
      const detectedType = match?.[1]
      const mediaType = SUPPORTED_MEDIA.includes(detectedType) ? detectedType : 'image/jpeg'
      const base64 = match?.[2] ?? base64DataUrl.split(',')[1]

      const response = await client.messages.create({
        model: 'claude-opus-4-8',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64 },
            },
            { type: 'text', text: PROMPTS[region] || PROMPTS.face },
          ],
        }],
      })

      return response.content[0].text
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { analyze, loading, error }
}
