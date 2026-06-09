import { useNavigate } from 'react-router-dom'
import { conditions } from '../mockData/conditions'
import { todayScore, todayStatus } from '../mockData/healthScore'

const STATUS_COLOR = {
  good: { ring: 'border-accent', text: 'text-accent', bg: 'bg-green-50', label: 'Good', dot: 'bg-accent' },
  watch: { ring: 'border-amber-400', text: 'text-amber-500', bg: 'bg-amber-50', label: 'Watch', dot: 'bg-amber-400' },
  alert: { ring: 'border-red-400', text: 'text-red-500', bg: 'bg-red-50', label: 'Alert', dot: 'bg-red-400' },
}

const CONDITION_STATUS = {
  good: 'bg-accent',
  watch: 'bg-amber-400',
  alert: 'bg-red-400',
}

export default function HomePage() {
  const navigate = useNavigate()
  const s = STATUS_COLOR[todayStatus] || STATUS_COLOR.watch
  const todayLabel = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-primary px-5 pb-4 safe-top">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm">Good morning,</p>
            <h1 className="text-white text-2xl font-bold">Lothar 👋</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-lg">🔔</span>
          </div>
        </div>

        {/* Streak */}
        <div className="mt-4 bg-white/15 rounded-2xl px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="text-white font-bold">42-day streak</p>
            <p className="text-white/60 text-xs">Keep it up! Scan today to continue.</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Status Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-dark text-sm">Today's Status</h2>
            <span className="text-xs text-gray-400">{todayLabel}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full ${s.bg} border-4 ${s.ring} flex items-center justify-center shrink-0`}>
              <span className={`text-xl font-bold ${s.text}`}>{todayScore}</span>
            </div>
            <div>
              <p className={`font-bold text-lg ${s.text}`}>{s.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">Based on today's facial scan</p>
            </div>
          </div>
        </div>

        {/* Active Conditions */}
        <div>
          <h2 className="font-semibold text-dark text-sm mb-2">Active Conditions</h2>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {conditions.map(c => (
              <div key={c.id} className="bg-white rounded-xl p-3 shadow-sm shrink-0 min-w-[110px]">
                <div className={`w-2 h-2 rounded-full mb-1.5 ${CONDITION_STATUS[c.status]}`} />
                <p className="font-semibold text-dark text-xs leading-tight">{c.name}</p>
                <p className="text-gray-400 text-[10px] mt-0.5">{c.region}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Last Scan */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-dark text-sm">Last Scan</h2>
            <span className="text-xs text-gray-400">May 31, 2026</span>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-2xl">📷</span>
            </div>
            <div>
              <p className="text-sm font-medium text-dark">Face Scan</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                Mild periorbital darkening detected. Skin hydration adequate. Overall: Watch.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/scan')}
          className="w-full py-4 bg-accent text-white font-semibold rounded-2xl text-sm shadow-sm active:opacity-80 transition-opacity"
        >
          Take Today's Scan →
        </button>
      </div>
    </div>
  )
}
