// AImirror backend proxy (zero dependencies).
//
// Holds the Anthropic API key in the ANTHROPIC_API_KEY env var (set in the
// Render dashboard — never in this repo). The deployed frontend POSTs the
// message payload here; this server attaches the key and forwards it to
// Anthropic, then returns the response. Because the key lives server-side it is
// never in the public bundle and never gets auto-revoked.

import { createServer } from 'node:http'

const KEY = process.env.ANTHROPIC_API_KEY
const PORT = process.env.PORT || 3000

// Origins allowed to call this proxy (your deployed frontend + local dev).
const ALLOWED_ORIGINS = [
  'https://lotibb.github.io', // GitHub Pages (production)
  'http://localhost:5173',    // Vite dev server (local testing)
]

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'

const server = createServer((req, res) => {
  const origin = req.headers.origin || ''
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  res.setHeader('Access-Control-Allow-Origin', allow)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  // Health check / keep-warm endpoint (open in a browser to confirm it's up).
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('AImirror proxy is running')
    return
  }

  if (req.method !== 'POST') {
    res.writeHead(405)
    res.end('Method Not Allowed')
    return
  }

  if (!KEY) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: { message: 'Server is missing the ANTHROPIC_API_KEY env var.' } }))
    return
  }

  const chunks = []
  req.on('data', (c) => chunks.push(c))
  req.on('end', async () => {
    try {
      const body = Buffer.concat(chunks).toString('utf8')
      const upstream = await fetch(ANTHROPIC_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': KEY,
          'anthropic-version': '2023-06-01',
        },
        body,
      })
      const text = await upstream.text()
      res.writeHead(upstream.status, { 'Content-Type': 'application/json' })
      res.end(text)
    } catch (err) {
      res.writeHead(502, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: { message: err?.message || 'Proxy request failed' } }))
    }
  })
})

server.listen(PORT, () => {
  console.log(`AImirror proxy listening on ${PORT}`)
})
