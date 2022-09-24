import React from 'react'
import { useCanvas } from './CanvasContext'

export const AddObjectButton = () => {
  const { addObject } = useCanvas()

  return <button onClick={addObject}>추가</button>
}