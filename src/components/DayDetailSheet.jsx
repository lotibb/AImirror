const STATUS_LABEL = { good: 'Good', watch: 'Watch', alert: 'Alert' }
const STATUS_STYLE = {
  good: 'bg-green-50 text-green-700 border-green-200',
  watch: 'bg-amber-50 text-amber-700 border-amber-200',
  alert: 'bg-red-50 text-red-700 border-red-200',
}

export default function DayDetailSheet({ date, data, onClose }) {
  const formattedDate = new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white rounded-t-3xl z-50 px-6 pt-4 pb-10">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
        <h3 className="font-semibold text-dark text-base">{formattedDate}</h3>
        {data ? (
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLE[data.status]}`}>
                {STATUS_LABEL[data.status]}
              </span>
              <span className="text-xs text-gray-400">{data.region} scan</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        ) : (
          <div className="mt-4 text-center py-8">
            <p className="text-3xl mb-2">📷</p>
            <p className="text-gray-400 text-sm">No scan recorded for this day</p>
          </div>
        )}
      </div>
    </>
  )
}
