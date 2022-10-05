import React from 'react'
import { useRecoilState } from 'recoil'
import { drawingDetailState } from '../../store/atoms'

import { useCanvas } from './CanvasContext'
import { LetterButtonGo } from '../../Style/Components'

export const SavePaintingButton = () => {
  const [drawingIsDetail, setDrawingIsDetail] = useRecoilState(drawingDetailState)
  const { savePainting } = useCanvas()

  return (
    <>
      { drawingIsDetail === true ? 
        <LetterButtonGo style={{marginTop: "10px", marginLeft: "0px", height: "60px", fontSize: '55px' }} onClick={savePainting}>수정</LetterButtonGo> 
        : <LetterButtonGo style={{marginTop: "10px", marginLeft: "0px", height: "60px", fontSize: '55px' }} onClick={savePainting}>저장</LetterButtonGo> 
      }
    </>
  )
}