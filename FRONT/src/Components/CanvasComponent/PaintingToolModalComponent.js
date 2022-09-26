import React, { useState } from 'react'
import { useCanvas } from './CanvasContext'
import { PaintingToolModalComponentTag, ModalBackgroundTag } from '../../Style/Components'
// import { ChangeStrokeStyleButton } from './ChangeStrokeStyleButton'


export function PaintingToolModalComponent({ modalOpen, modalClose, changeStrokeTexture }) {
  const { changeLineWidth } = useCanvas()
  const [value, setValue] = useState(3)

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      modalClose()
    }
  }

  return (
    <>
      { modalOpen ?
        <ModalBackgroundTag onClick={onCloseModal}>
          <PaintingToolModalComponentTag>
            {/* <ChangeStrokeStyleButton /> */}
            <button onClick={() => {changeStrokeTexture(0)}}>색연필</button>
            <button onClick={() => {changeStrokeTexture(1)}}>크레파스</button>
            <button onClick={() => {changeStrokeTexture(2)}}>물감</button>
            <input type='range' min='1' max='100' value={value}
              onChange={(e) => {
                setValue(e.target.value)
                changeLineWidth(e.target.value)
              }}
            />
          </PaintingToolModalComponentTag>
        </ModalBackgroundTag>
      : null }
    </>
  )
}