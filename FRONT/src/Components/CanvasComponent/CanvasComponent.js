import React, { useEffect } from 'react'
import { useCanvas } from './CanvasContext'
import '../../CSS/drawing.css'
import { PaintingCanvasTag } from '../../Style/Components'


export function CanvasComponent() {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
    imgSrcs,
  } = useCanvas()

  useEffect(() => {
    prepareCanvas()
  }, [])

  useEffect(() => {
    document.getElementById('painting').innerText = ''
    imgSrcs.forEach(imgSrc => {
      const img = document.createElement('img')
      img.src = imgSrc
      img.style.cursor = 'pointer'
      img.className = 'painting'
      img.width = 100
      img.height = 100
      document.getElementById('painting').appendChild(img);
    })
  }, [imgSrcs])

  return (
    <>
      <div
        id='painting'
        style={{
          position: 'absolute',
        }}>
      </div>
      <PaintingCanvasTag
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={finishDrawing}
        onTouchMove={draw}
        ref={canvasRef}
      />
    </>
  );
}