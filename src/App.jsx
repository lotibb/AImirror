import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import ScanPage from './pages/ScanPage'
import CalendarPage from './pages/CalendarPage'
import HistoryPage from './pages/HistoryPage'
import AccountPage from './pages/AccountPage'

export default function App() {
  return (
    <HashRouter>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </HashRouter>
  )
}
