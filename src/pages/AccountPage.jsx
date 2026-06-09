import { useState } from 'react'

const SKIN_TONES = [
  { label: 'Type I',   color: '#F9DCC6', text: 'Very fair' },
  { label: 'Type II',  color: '#F2C59A', text: 'Fair' },
  { label: 'Type III', color: '#E0A872', text: 'Medium' },
  { label: 'Type IV',  color: '#C17A3B', text: 'Olive / tan' },
  { label: 'Type V',   color: '#8B5E3C', text: 'Brown' },
  { label: 'Type VI',  color: '#4A2C17', text: 'Dark brown' },
]

const ALL_GOALS = ['Skin Health', 'Fatigue', 'Posture', 'Hydration', 'Sleep Quality', 'Stress']

const CONDITIONS = ['Periorbital Darkening', 'Seasonal Rhinitis']
const MEDICATIONS = ['None currently']
const ALLERGIES = ['Dust mites', 'Pollen']

function Tag({ label, color = 'gray' }) {
  const styles = {
    gray:  'bg-gray-100 text-gray-600',
    blue:  'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    red:   'bg-red-50 text-red-500',
  }
  return (
    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${styles[color]}`}>
      {label}
    </span>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-semibold text-dark">{value}</span>
    </div>
  )
}

export default function AccountPage() {
  const [apiKey, setApiKey]     = useState(() => localStorage.getItem('ma_api_key') || '')
  const [demoMode, setDemoMode] = useState(() => localStorage.getItem('ma_demo_mode') === 'true')
  const [saved, setSaved]       = useState(false)

  const [sex, setSex]           = useState('Male')
  const [age, setAge]           = useState('22')
  const [skinTone, setSkinTone] = useState(2)
  const [goals, setGoals]       = useState(['Skin Health', 'Fatigue', 'Posture'])

  const toggleGoal = (g) =>
    setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])

  const saveSettings = () => {
    localStorage.setItem('ma_api_key', apiKey)
    localStorage.setItem('ma_demo_mode', String(demoMode))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-primary px-5 pb-4 safe-top">
        <h1 className="text-white font-bold text-xl">Account</h1>
      </div>

      <div className="px-4 py-4 space-y-4">

        {/* Profile */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center text-2xl shrink-0">
              👤
            </div>
            <div className="flex-1">
              <p className="font-bold text-dark text-base">Lothar I.</p>
              <p className="text-xs text-gray-400 mt-0.5">iturbelothar9@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Health Profile */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-dark text-sm mb-4">Health Profile</h2>

          {/* Age + Sex */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="text-xs text-gray-500 block mb-1.5">Age</label>
              <input
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-dark focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 block mb-1.5">Biological Sex</label>
              <div className="flex rounded-xl border border-gray-200 overflow-hidden text-xs font-medium">
                {['Male', 'Female', 'Other'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSex(s)}
                    className={`flex-1 py-2.5 transition-colors ${
                      sex === s ? 'bg-primary text-white' : 'text-gray-500'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Skin Tone */}
          <div className="mb-4">
            <label className="text-xs text-gray-500 block mb-2">
              Skin Tone — Fitzpatrick {SKIN_TONES[skinTone].label}
              <span className="text-gray-400 ml-1">({SKIN_TONES[skinTone].text})</span>
            </label>
            <div className="flex gap-2">
              {SKIN_TONES.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setSkinTone(i)}
                  className={`flex-1 rounded-full transition-all ${
                    skinTone === i ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  style={{ height: 28, backgroundColor: t.color }}
                />
              ))}
            </div>
          </div>

          {/* Monitoring Goals */}
          <div>
            <label className="text-xs text-gray-500 block mb-2">Monitoring Goals</label>
            <div className="flex flex-wrap gap-2">
              {ALL_GOALS.map(g => (
                <button
                  key={g}
                  onClick={() => toggleGoal(g)}
                  className={`text-[11px] font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    goals.includes(g)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-500 border-gray-200'
                  }`}
                >
                  {goals.includes(g) ? '✓ ' : ''}{g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Medical Context */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-dark text-sm mb-3">Medical Context</h2>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-400 mb-1.5">Known Conditions</p>
              <div className="flex flex-wrap gap-1.5">
                {CONDITIONS.map(c => <Tag key={c} label={c} color="blue" />)}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-400 mb-1.5">Current Medications</p>
              <div className="flex flex-wrap gap-1.5">
                {MEDICATIONS.map(m => <Tag key={m} label={m} color="gray" />)}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-400 mb-1.5">Allergies</p>
              <div className="flex flex-wrap gap-1.5">
                {ALLERGIES.map(a => <Tag key={a} label={a} color="amber" />)}
              </div>
            </div>
          </div>

          <p className="text-[10px] text-gray-300 mt-3">
            This information is used to improve scan analysis accuracy. Stored locally only.
          </p>
        </div>

        {/* Subscription */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-dark text-sm">Subscription</p>
              <p className="text-xs text-gray-400 mt-0.5">Free Plan</p>
            </div>
            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-medium">Free</span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-1.5">
            {[
              ['Total Scans', '47'],
              ['Member Since', 'Mar 5, 2026'],
              ['Current Streak', '42 days 🔥'],
              ['Avg Monthly Score', '72 / 100'],
            ].map(([label, value]) => (
              <Row key={label} label={label} value={value} />
            ))}
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-dark text-sm mb-4">Claude API Settings</h2>

          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 mr-4">
              <p className="text-sm font-medium text-dark">Demo Mode</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Off = real Claude analysis. On = sample responses.</p>
            </div>
            <button
              onClick={() => setDemoMode(d => !d)}
              className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${demoMode ? 'bg-accent' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${demoMode ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1.5">Anthropic API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-dark focus:outline-none focus:border-primary font-mono placeholder:font-sans placeholder:text-gray-400"
            />
            <p className="text-[10px] text-gray-400 mt-1">Stored locally on your device only. Never sent to our servers.</p>
          </div>

          <button
            onClick={saveSettings}
            className={`w-full mt-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              saved ? 'bg-green-100 text-green-700' : 'bg-primary text-white'
            }`}
          >
            {saved ? '✓ Saved' : 'Save Settings'}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center py-2 space-y-1">
          <p className="text-xs text-gray-300 font-medium">MirrorAssistant v0.1.0</p>
          <p className="text-[10px] text-gray-300">Prototype — For demonstration purposes only</p>
          <p className="text-[10px] text-gray-300">Not a medical device. Consult a professional for health decisions.</p>
        </div>

      </div>
    </div>
  )
}
