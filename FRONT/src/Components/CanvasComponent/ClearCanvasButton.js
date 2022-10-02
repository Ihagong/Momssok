import React from 'react'
import { useCanvas } from './CanvasContext'
import { PaintingToolTag } from '../../Style/Components'


export const ClearCanvasButton = () => {
  const { clearCanvas } = useCanvas()

  return <PaintingToolTag onClick={clearCanvas}><img src='/icons/refreshicon.svg'></img></PaintingToolTag>
}