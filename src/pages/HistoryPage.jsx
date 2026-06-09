import { todayScore, todayStatus, trend } from '../mockData/healthScore'
import { conditions } from '../mockData/conditions'
import { diagnoses } from '../mockData/diagnoses'

const STATUS_STYLE = {
  good: { border: 'border-l-accent', text: 'text-accent', bg: 'bg-green-50', dot: 'bg-accent', label: 'Good' },
  watch: { border: 'border-l-amber-400', text: 'text-amber-500', bg: 'bg-amber-50', dot: 'bg-amber-400', label: 'Watch' },
  alert: { border: 'border-l-red-400', text: 'text-red-500', bg: 'bg-red-50', dot: 'bg-red-400', label: 'Alert' },
}

const SEVERITY_STYLE = {
  low: 'bg-blue-50 text-blue-600 border-blue-200',
  moderate: 'bg-amber-50 text-amber-600 border-amber-200',
  high: 'bg-red-50 text-red-600 border-red-200',
}

const TREND_ARROW = {
  improving: { arrow: '↗', color: 'text-accent' },
  worsening: { arrow: '↘', color: 'text-red-500' },
  stable: { arrow: '→', color: 'text-amber-500' },
}

export default function HistoryPage() {
  const s = STATUS_STYLE[todayStatus] || STATUS_STYLE.watch

  const monthScores = trend.map(t => t.score)
  const monthAvg = Math.round(monthScores.reduce((a, b) => a + b, 0) / monthScores.length)
  const goodDays = monthScores.filter(s => s >= 75).length
  const watchDays = monthScores.filter(s => s >= 65 && s < 75).length
  const alertDays = monthScores.filter(s => s < 65).length
  const totalScans = monthScores.length
  const goodPct = Math.round((goodDays / totalScans) * 100)
  const watchPct = Math.round((watchDays / totalScans) * 100)
  const alertPct = 100 - goodPct - watchPct
  const ms = STATUS_STYLE[monthAvg >= 75 ? 'good' : monthAvg >= 65 ? 'watch' : 'alert']

  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-primary px-5 pb-4 safe-top">
        <h1 className="text-white font-bold text-xl">Health Report</h1>
        <p className="text-white/70 text-sm mt-1">Aggregated from all your scans</p>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Score */}
        <div className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${s.border}`}>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-2">Today's Health Score</p>
          <div className="flex items-end gap-1.5">
            <span className={`text-5xl font-bold ${s.text}`}>{todayScore}</span>
            <span className="text-gray-300 text-xl mb-1">/100</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
            <span className={`text-sm font-semibold ${s.text}`}>{s.label}</span>
            <span className="text-gray-400 text-xs">— based on today's scan</span>
          </div>
        </div>

        {/* Monthly Score */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">May 2026 · Monthly Overview</p>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${ms.bg} ${ms.text}`}>{ms.label}</span>
          </div>
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className={`text-3xl font-bold ${ms.text}`}>{monthAvg}</span>
            <span className="text-gray-300 text-base">/100</span>
            <span className="text-xs text-gray-400 ml-1">monthly avg</span>
          </div>
          <div className="rounded-full overflow-hidden h-2.5 mb-2 flex">
            {goodPct > 0 && <div style={{ width: `${goodPct}%` }} className="bg-accent" />}
            {watchPct > 0 && <div style={{ width: `${watchPct}%` }} className="bg-amber-400" />}
            {alertPct > 0 && <div style={{ width: `${alertPct}%` }} className="bg-red-400" />}
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-[10px] text-gray-500">{goodPct}% good</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-[10px] text-gray-500">{watchPct}% watch</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-[10px] text-gray-500">{alertPct}% alert</span>
            </div>
            <span className="text-[10px] text-gray-400 ml-auto">{totalScans} scans</span>
          </div>
        </div>

        {/* Active Conditions */}
        <div>
          <h2 className="font-semibold text-dark text-sm mb-2">Active Conditions</h2>
          <div className="space-y-2">
            {conditions.map(c => {
              const cs = STATUS_STYLE[c.status]
              const ct = TREND_ARROW[c.trend]
              return (
                <div key={c.id} className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 mr-2">
                      <p className="font-semibold text-dark text-sm">{c.name}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{c.region} · First seen {c.firstSeen}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cs.bg} ${cs.text}`}>
                        {cs.label}
                      </span>
                      <span className="text-[10px] text-gray-400">{c.scans} scans</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{c.description}</p>
                  <p className={`text-[11px] font-semibold mt-1.5 ${ct.color}`}>{ct.arrow} {c.trend.charAt(0).toUpperCase() + c.trend.slice(1)}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Flagged Diagnoses */}
        <div>
          <h2 className="font-semibold text-dark text-sm mb-2">Flagged Diagnoses</h2>
          <div className="space-y-2">
            {diagnoses.map(d => (
              <div key={d.id} className="bg-white rounded-xl p-3 shadow-sm">
                <div className="flex items-start gap-2">
                  <span className="text-base mt-0.5">⚠️</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-dark text-sm flex-1">{d.flag}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border shrink-0 capitalize ${SEVERITY_STYLE[d.severity]}`}>
                        {d.severity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{d.description}</p>
                    <p className="text-[11px] text-gray-400 mt-1">Seen in {d.seenInScans} scans</p>
                    <div className="mt-2 bg-blue-50 rounded-lg px-2.5 py-1.5">
                      <p className="text-xs text-blue-600 leading-relaxed">💡 {d.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 30-day trend chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-dark text-sm mb-3">30-Day Health Trend</h2>
          <div className="flex items-end gap-0.5 h-16">
            {trend.map((t, i) => {
              const h = Math.round((t.score / 100) * 64)
              const color = t.score >= 80 ? '#1EB53A' : t.score >= 65 ? '#f59e0b' : '#ef4444'
              return (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm min-w-[3px]"
                  style={{ height: h, backgroundColor: color }}
                />
              )
            })}
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-gray-400">{trend[0]?.date}</span>
            <span className="text-[10px] text-gray-400">{trend[trend.length - 1]?.date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
