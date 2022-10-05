import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { drawingDetailState, loadedPaintingInfoState } from '../../store/atoms'

import { useCanvas } from './CanvasContext'
import '../../CSS/drawing.css'
import { PaintingCanvasTag } from '../../Style/Components'


export function CanvasComponent({ width }) {
  const [drawingIsDetail, setDrawingIsDetail] = useRecoilState(drawingDetailState)
  const [loadedPaintingInfo, setLoadedPaintingInfo] = useRecoilState(loadedPaintingInfoState)

  console.log(loadedPaintingInfo, drawingIsDetail)

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
      <PaintingCanvasTag style={{ touchAction: 'none', backgroundColor: 'transparent' }}
        // onMouseDown={startDrawing}
        // onMouseUp={finishDrawing}
        // onMouseMove={draw}
        onPointerDown={startDrawing}
        onPointerUp={finishDrawing}
        onPointerMove={draw}
        ref={canvasRef}
      />
      {/* <PaintingCanvasTag style={{ touchAction: 'none', position: 'absolute', zIndex: -3, width: '500px', height: '550px' }} /> */}
      <PaintingCanvasTag style={{ touchAction: 'none', position: 'absolute', zIndex: -3, width: `${width}px`, height: '550px' }} />
    </>
  );
}