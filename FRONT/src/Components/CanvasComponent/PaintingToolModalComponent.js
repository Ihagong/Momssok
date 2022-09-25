import React, { useState } from 'react'
import { useCanvas } from './CanvasContext'
import { PaintingToolModalComponentTag, ModalBackgroundTag, ChildButtonTag2 } from '../../Style/Components'
import { ChangeStrokeStyleButton } from './ChangeStrokeStyleButton'


export function PaintingToolModalComponent({ modalOpen, modalClose }) {
  const { changeStrokeTexture, changeLineWidth } = useCanvas()
  const [value, setValue] = useState(3)

  return (
    <>
      { modalOpen ?
        <ModalBackgroundTag>
          <PaintingToolModalComponentTag>
            {/* <ChangeStrokeStyleButton /> */}
            <button onClick={() => {changeStrokeTexture(0)}}>연필</button>
            <button onClick={() => {changeStrokeTexture(1)}}>크레파스</button>
            <button onClick={() => {changeStrokeTexture(2)}}>물감</button>
            <input type='range' min='1' max='100' value={value}
              onChange={(e) => {
                setValue(e.target.value)
                changeLineWidth(e.target.value)
              }}
            />
            <ChildButtonTag2 onClick={modalClose}>닫기</ChildButtonTag2>
          </PaintingToolModalComponentTag>
        </ModalBackgroundTag>
      : null }
    </>
  )
}