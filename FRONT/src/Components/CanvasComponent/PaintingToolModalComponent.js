import React, { useState } from 'react'
import { useCanvas } from './CanvasContext'
import { PaintingToolModalComponentTag, ModalBackgroundTag, ChildButtonTag2 } from '../../Style/Components'
import { ChangeStrokeStyleButton } from './ChangeStrokeStyleButton'


export function PaintingToolModalComponent({ modalOpen, modalClose }) {
  const { changeLineWidth } = useCanvas()
  const [value, setValue] = useState(3)

  return (
    <>
      { modalOpen ?
        <ModalBackgroundTag>
          <PaintingToolModalComponentTag>
            {/* <ChangeStrokeStyleButton /> */}
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