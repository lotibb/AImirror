import { useState, useEffect, useRef } from 'react'
import { useCamera } from '../hooks/useCamera'
import { useClaudeAnalysis } from '../hooks/useClaudeAnalysis'
import { REGIONS } from '../constants/prompts'
import RegionSelector from '../components/RegionSelector'
import ScanResultsView from '../components/ScanResultsView'

export default function ScanPage() {
  const [phase, setPhase] = useState('idle') // idle | camera | preview | analyzing | results
  const [selectedRegion, setSelectedRegion] = useState('face')
  const [capturedImage, setCapturedImage] = useState(null)
  const [analysisResult, setAnalysisResult] = useState(null)
  const { videoRef, error: cameraError, start, stop, capture } = useCamera()
  const { analyze, error: analysisError } = useClaudeAnalysis()
  const fileInputRef = useRef(null)

  const regionLabel = REGIONS.find(r => r.id === selectedRegion)?.label || 'Face'

  const handleOpenCamera = async () => {
    setPhase('camera')
    await start()
  }

  const handleUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setCapturedImage(ev.target.result)
      setPhase('preview')
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleCapture = () => {
    const dataUrl = capture()
    setCapturedImage(dataUrl)
    stop()
    setPhase('preview')
  }

  const handleRetake = () => {
    setCapturedImage(null)
    setPhase('idle')
  }

  const handleAnalyze = async () => {
    setPhase('analyzing')
    const result = await analyze(capturedImage, selectedRegion)
    setAnalysisResult(result)
    setPhase('results')
  }

  const handleReset = () => {
    setCapturedImage(null)
    setAnalysisResult(null)
    setPhase('idle')
  }

  useEffect(() => {
    return () => { stop() }
  }, [stop])

  // Full-screen camera overlay
  if (phase === 'camera') {
    return (
      <div className="camera-overlay bg-black">
        <div className="flex items-center justify-between px-4 pb-3 safe-top">
          <button onClick={() => { stop(); setPhase('idle') }} className="text-white p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="text-white font-medium text-sm">{regionLabel}</span>
          <div className="w-8" />
        </div>

        <div className="flex-1 relative overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-6 border-2 border-white/40 rounded-3xl pointer-events-none" />
        </div>

        <div className="pb-10 pt-4 px-4 bg-black/50">
          <RegionSelector selected={selectedRegion} onChange={setSelectedRegion} dark />
          <div className="flex justify-center mt-5">
            <button
              onClick={handleCapture}
              className="rounded-full border-4 border-white bg-white/10 flex items-center justify-center active:scale-95 transition-transform"
              style={{ width: 72, height: 72 }}
            >
              <div className="w-14 h-14 rounded-full bg-white" />
            </button>
          </div>
        </div>

        {cameraError && (
          <div className="absolute top-24 left-4 right-4 bg-red-900/80 text-white text-xs rounded-xl p-3">
            {cameraError}
          </div>
        )}
      </div>
    )
  }

  if (phase === 'preview') {
    return (
      <div className="camera-overlay bg-black">
        <div className="flex items-center justify-between px-4 pb-3 safe-top">
          <button onClick={handleRetake} className="text-white text-sm font-medium px-2 py-1">← Back</button>
          <span className="text-white font-medium text-sm">Preview</span>
          <div className="w-16" />
        </div>
        <div className="flex-1 overflow-hidden">
          <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
        </div>
        <div className="px-4 pb-10 pt-4 bg-black/80">
          <button
            onClick={handleAnalyze}
            className="w-full py-4 bg-accent text-white font-semibold rounded-2xl text-sm"
          >
            Analyze with Claude →
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'analyzing') {
    return (
      <div className="camera-overlay bg-black/90 items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-white font-semibold">Analyzing {regionLabel}...</p>
        <p className="text-white/40 text-xs">Powered by Claude AI</p>
      </div>
    )
  }

  if (phase === 'results') {
    return (
      <div className="h-full overflow-y-auto">
        <ScanResultsView
          image={capturedImage}
          region={regionLabel}
          result={analysisResult}
          error={analysisError}
          onScanAgain={handleReset}
        />
      </div>
    )
  }

  // Idle
  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-primary px-5 pb-4 safe-top">
        <h1 className="text-white text-xl font-bold">New Scan</h1>
        <p className="text-white/70 text-sm mt-1">Choose a region and open the camera</p>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div>
          <h2 className="font-semibold text-dark text-sm mb-3">Scan Region</h2>
          <RegionSelector selected={selectedRegion} onChange={setSelectedRegion} />
        </div>

        {/* Camera preview placeholder */}
        <div className="bg-dark rounded-2xl overflow-hidden h-48">
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <p className="text-white/30 text-sm">Camera inactive</p>
          </div>
        </div>

        {cameraError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-red-600 text-sm">{cameraError}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleOpenCamera}
            className="flex-1 py-4 bg-primary text-white font-semibold rounded-2xl text-sm shadow-sm active:opacity-80"
          >
            Open Camera
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 py-4 bg-white border border-gray-200 text-dark font-semibold rounded-2xl text-sm shadow-sm active:opacity-70"
          >
            Upload Photo
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
    </div>
  )
}
