import React from 'react'
import { useCanvas } from './CanvasContext'
import { ChildButtonTag1 } from '../../Style/Components'


export const ClearCanvasButton = () => {
  const { clearCanvas } = useCanvas()

  return <ChildButtonTag1 style={{ width: '200px' }} onClick={clearCanvas}>원래대로</ChildButtonTag1>
}