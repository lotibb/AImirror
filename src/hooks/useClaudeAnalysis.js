import { useState, useCallback } from 'react'
import Anthropic from '@anthropic-ai/sdk'
import { PROMPTS, MOCK_RESPONSES } from '../constants/prompts'

export function useClaudeAnalysis() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyze = useCallback(async (base64DataUrl, region) => {
    setLoading(true)
    setError(null)

    try {
      const apiKey = localStorage.getItem('ma_api_key')
      const demoMode = localStorage.getItem('ma_demo_mode') !== 'false' || !apiKey

      if (demoMode) {
        await new Promise(r => setTimeout(r, 2000))
        return MOCK_RESPONSES[region] || MOCK_RESPONSES.face
      }

      const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
      const base64 = base64DataUrl.split(',')[1]

      const response = await client.messages.create({
        model: 'claude-opus-4-8',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: 'image/jpeg', data: base64 },
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
