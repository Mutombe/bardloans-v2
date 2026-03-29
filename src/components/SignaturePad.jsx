import { useRef, useState, useEffect, useCallback } from 'react'
import { Eraser, PencilSimple, UploadSimple } from '@phosphor-icons/react'

const SIG_WIDTH = 600
const SIG_HEIGHT = 200

export default function SignaturePad({ onSignature, className = '' }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [mode, setMode] = useState('draw') // 'draw' | 'upload'
  const [uploadPreview, setUploadPreview] = useState(null)

  const getCoords = useCallback((e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }, [])

  const startDrawing = useCallback((e) => {
    if (mode !== 'draw') return
    e.preventDefault()
    const ctx = canvasRef.current.getContext('2d')
    const { x, y } = getCoords(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
  }, [getCoords, mode])

  const draw = useCallback((e) => {
    if (!isDrawing || mode !== 'draw') return
    e.preventDefault()
    const ctx = canvasRef.current.getContext('2d')
    const { x, y } = getCoords(e)
    ctx.lineTo(x, y)
    ctx.strokeStyle = '#1B1464'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    setHasSignature(true)
  }, [isDrawing, getCoords, mode])

  const stopDrawing = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false)
      if (hasSignature) {
        onSignature(canvasRef.current.toDataURL('image/png'))
      }
    }
  }, [isDrawing, hasSignature, onSignature])

  const clear = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
    setUploadPreview(null)
    onSignature(null)
  }

  // Render uploaded image onto a standardized canvas for consistent PDF output
  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        // Create an offscreen canvas at the standard signature size
        const offscreen = document.createElement('canvas')
        offscreen.width = SIG_WIDTH
        offscreen.height = SIG_HEIGHT
        const ctx = offscreen.getContext('2d')

        // White background
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, SIG_WIDTH, SIG_HEIGHT)

        // Fit the image within the signature area with padding
        const pad = 20
        const maxW = SIG_WIDTH - pad * 2
        const maxH = SIG_HEIGHT - pad * 2
        const scale = Math.min(maxW / img.width, maxH / img.height)
        const w = img.width * scale
        const h = img.height * scale
        const x = (SIG_WIDTH - w) / 2
        const y = (SIG_HEIGHT - h) / 2

        ctx.drawImage(img, x, y, w, h)

        const dataUrl = offscreen.toDataURL('image/png')
        setUploadPreview(dataUrl)
        setHasSignature(true)
        onSignature(dataUrl)

        // Also draw onto the visible canvas
        if (canvasRef.current) {
          const visCtx = canvasRef.current.getContext('2d')
          visCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          visCtx.fillStyle = '#ffffff'
          visCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          const visScale = Math.min(
            (canvasRef.current.width - 40) / img.width,
            (canvasRef.current.height - 40) / img.height
          )
          const vw = img.width * visScale
          const vh = img.height * visScale
          const vx = (canvasRef.current.width - vw) / 2
          const vy = (canvasRef.current.height - vh) / 2
          visCtx.drawImage(img, vx, vy, vw, vh)
        }
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
  }, [])

  return (
    <div className={className}>
      {/* Mode tabs */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => { setMode('draw'); clear() }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all cursor-pointer ${
            mode === 'draw' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          <PencilSimple size={14} weight="bold" /> Draw
        </button>
        <button
          type="button"
          onClick={() => { setMode('upload'); clear() }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all cursor-pointer ${
            mode === 'upload' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          <UploadSimple size={14} weight="bold" /> Upload
        </button>
      </div>

      <div className="relative">
        {mode === 'draw' ? (
          <>
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-32 sm:h-40 border-2 border-dashed border-gray-200 rounded-xl bg-white cursor-crosshair touch-none"
            />
            {!hasSignature && (
              <p className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm pointer-events-none">
                Sign here with your finger or mouse
              </p>
            )}
          </>
        ) : (
          <>
            <canvas ref={canvasRef} className="hidden" />
            {uploadPreview ? (
              <div className="w-full h-32 sm:h-40 border-2 border-mint rounded-xl bg-mint/5 flex items-center justify-center overflow-hidden">
                <img src={uploadPreview} alt="Signature" className="max-h-full max-w-full object-contain p-2" />
              </div>
            ) : (
              <label className="w-full h-32 sm:h-40 border-2 border-dashed border-gray-200 rounded-xl bg-white flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <UploadSimple size={28} className="text-gray-300 mb-2" />
                <span className="text-gray-400 text-sm font-medium">Upload signature image</span>
                <span className="text-gray-300 text-xs mt-0.5">PNG, JPG — white background preferred</span>
                <input type="file" className="hidden" accept=".png,.jpg,.jpeg" onChange={handleUpload} />
              </label>
            )}
          </>
        )}

        {hasSignature && (
          <button
            type="button"
            onClick={clear}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <Eraser size={16} weight="bold" />
          </button>
        )}
      </div>
    </div>
  )
}
