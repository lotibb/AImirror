import { useState } from 'react'
import { calendarData } from '../mockData/calendarData'
import DayDetailSheet from '../components/DayDetailSheet'

const STATUS_DOT = { good: 'bg-accent', watch: 'bg-amber-400', alert: 'bg-red-400' }
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function ChevronLeft() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

export default function CalendarPage() {
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(4) // 0-indexed, 4 = May (rich mockup data)
  const [selectedDay, setSelectedDay] = useState(null)

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
    setSelectedDay(null)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
    setSelectedDay(null)
  }

  const getDayData = (day) => {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return calendarData[key] || null
  }

  const cells = []
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const selectedDateStr = selectedDay
    ? `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
    : null
  const selectedData = selectedDay ? getDayData(selectedDay) : null

  const isToday = (day) => year === 2026 && month === 5 && day === 1

  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-primary px-5 pt-12 pb-5">
        <h1 className="text-white font-bold text-xl">Calendar</h1>
        <p className="text-white/70 text-sm mt-1">Daily scan results</p>
      </div>

      <div className="px-4 py-4">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 rounded-xl bg-white shadow-sm text-gray-500 active:bg-gray-50">
            <ChevronLeft />
          </button>
          <h2 className="font-bold text-dark">{MONTHS[month]} {year}</h2>
          <button onClick={nextMonth} className="p-2 rounded-xl bg-white shadow-sm text-gray-500 active:bg-gray-50">
            <ChevronRight />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d => (
            <div key={d} className="text-center text-[11px] text-gray-400 font-medium py-1">{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (!day) return <div key={i} />
            const data = getDayData(day)
            const today = isToday(day)
            const selected = day === selectedDay
            return (
              <button
                key={i}
                onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                className={`aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium transition-all
                  ${selected ? 'ring-2 ring-primary ring-offset-1' : ''}
                  ${today ? 'bg-primary/10' : 'bg-white'}
                `}
              >
                <span className={today ? 'text-primary font-bold' : 'text-dark'}>{day}</span>
                {data
                  ? <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${STATUS_DOT[data.status]}`} />
                  : <div className="w-1.5 h-1.5 mt-0.5" />
                }
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-5 mt-4 justify-center">
          {[
            { color: 'bg-accent', label: 'Good' },
            { color: 'bg-amber-400', label: 'Watch' },
            { color: 'bg-red-400', label: 'Alert' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${color}`} />
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedDay && (
        <DayDetailSheet
          date={selectedDateStr}
          data={selectedData}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  )
}
