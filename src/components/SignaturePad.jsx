import { useRef, useState, useEffect, useCallback } from 'react'
import { Eraser } from '@phosphor-icons/react'

export default function SignaturePad({ onSignature, className = '' }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)

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
    e.preventDefault()
    const ctx = canvasRef.current.getContext('2d')
    const { x, y } = getCoords(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
  }, [getCoords])

  const draw = useCallback((e) => {
    if (!isDrawing) return
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
  }, [isDrawing, getCoords])

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
    onSignature(null)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
  }, [])

  return (
    <div className={className}>
      <div className="relative">
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
