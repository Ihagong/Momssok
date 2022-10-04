import React from 'react'
import { useCanvas } from './CanvasContext'
import { LetterButtonGo } from '../../Style/Components'

export const SavePaintingButton = () => {
  const { savePainting } = useCanvas()

  return <LetterButtonGo style={{marginTop: "10px", marginLeft: "0px", height: "60px", fontSize: '55px' }} onClick={savePainting}>저장</LetterButtonGo>
}