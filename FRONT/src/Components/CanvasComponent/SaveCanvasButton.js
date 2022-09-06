import React from 'react'
import { useCanvas } from './CanvasContext'

export const SaveCanvasButton = () => {
  const { saveCanvas } = useCanvas()

  return <button onClick={saveCanvas}>저장</button>
}