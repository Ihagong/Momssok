import React from 'react'
import { useCanvas } from './CanvasContext'
import { LetterButtonGo } from '../../Style/Components'

export const SaveCanvasButton = () => {
  const { SaveCanvas } = useCanvas()

  return <LetterButtonGo style={{marginTop: "10px", marginLeft: "0px", height: "60px", fontSize: '55px' }} onClick={SaveCanvas}>저장</LetterButtonGo>
}