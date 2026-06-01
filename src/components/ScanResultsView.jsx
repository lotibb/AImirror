import { useState } from 'react'

function FormattedText({ text }) {
  if (!text) return null
  return (
    <div className="space-y-1">
      {text.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />
        const isBullet = line.startsWith('- ')
        const parts = line.split(/(\*\*[^*]+\*\*)/g)
        const rendered = parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="font-semibold text-dark">{part.slice(2, -2)}</strong>
            : <span key={j}>{part}</span>
        )
        if (isBullet) {
          const bulletParts = line.slice(2).split(/(\*\*[^*]+\*\*)/g)
          const bulletRendered = bulletParts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j} className="font-semibold text-dark">{part.slice(2, -2)}</strong>
              : <span key={j}>{part}</span>
          )
          return (
            <div key={i} className="flex gap-2">
              <span className="text-primary font-bold text-sm mt-0.5">•</span>
              <span className="text-sm text-gray-700 flex-1">{bulletRendered}</span>
            </div>
          )
        }
        return <p key={i} className="text-sm text-gray-700">{rendered}</p>
      })}
    </div>
  )
}

export default function ScanResultsView({ image, region, result, error, onScanAgain }) {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-full bg-gray-50 pb-4">
      <div className="bg-primary px-4 pt-10 pb-4">
        <div className="flex items-center gap-3">
          {image && (
            <img src={image} alt="Scan" className="w-12 h-12 rounded-xl object-cover border-2 border-white/40" />
          )}
          <div>
            <h1 className="text-white font-bold text-lg">Analysis Results</h1>
            <p className="text-white/70 text-xs">{region} • Just now</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-red-600 text-sm font-medium">Analysis failed</p>
            <p className="text-red-500 text-xs mt-0.5">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-3">AI Analysis — Claude</p>
            <FormattedText text={result} />
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className={`flex-1 py-3 rounded-2xl text-sm font-semibold transition-colors ${
              saved ? 'bg-green-100 text-green-700' : 'bg-accent text-white'
            }`}
          >
            {saved ? '✓ Saved' : 'Save to History'}
          </button>
          <button
            onClick={onScanAgain}
            className="flex-1 py-3 bg-white border border-gray-200 text-dark rounded-2xl text-sm font-semibold"
          >
            Scan Again
          </button>
        </div>
      </div>
    </div>
  )
}
