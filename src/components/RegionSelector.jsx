import { REGIONS } from '../constants/prompts'

export default function RegionSelector({ selected, onChange, dark = false }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {REGIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
            selected === id
              ? 'bg-primary text-white'
              : dark
              ? 'bg-white/20 text-white border border-white/30'
              : 'bg-white text-gray-500 border border-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
