import { useState } from 'react'

export default function AccountPage() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('ma_api_key') || '')
  const [demoMode, setDemoMode] = useState(() => localStorage.getItem('ma_demo_mode') !== 'false')
  const [saved, setSaved] = useState(false)

  const saveSettings = () => {
    localStorage.setItem('ma_api_key', apiKey)
    localStorage.setItem('ma_demo_mode', String(demoMode))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-primary px-5 pt-12 pb-6">
        <h1 className="text-white font-bold text-xl">Account</h1>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Profile */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center text-2xl shrink-0">
              👤
            </div>
            <div>
              <p className="font-bold text-dark text-base">Lothar I.</p>
              <p className="text-xs text-gray-400 mt-0.5">iturbelothar9@gmail.com</p>
            </div>
          </div>
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
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-xs text-gray-500">{label}</span>
                <span className="text-xs font-semibold text-dark">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-dark text-sm mb-4">Claude API Settings</h2>

          {/* Demo mode toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 mr-4">
              <p className="text-sm font-medium text-dark">Demo Mode</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Use sample responses — no API key needed</p>
            </div>
            <button
              onClick={() => setDemoMode(d => !d)}
              className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${demoMode ? 'bg-accent' : 'bg-gray-300'}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  demoMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* API key input */}
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
