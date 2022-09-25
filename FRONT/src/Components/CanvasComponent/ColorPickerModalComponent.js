import React, { useState } from 'react'
// import { useCanvas } from './CanvasContext'
import { PaintingToolModalComponentTag, ModalBackgroundTag, ColorPickerTag, ColorTag } from '../../Style/Components'


export function ColorPickerModalComponent({ modalOpen, modalClose, strokeColorIndex, changeStrokeColor }) {
  // const { changeStrokeColor } = useCanvas()

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
            <ColorPickerTag>
              <ColorTag style={{ backgroundColor: '#121212', borderRadius: strokeColorIndex === 0 ? '8px' : '10px 0 0 10px',
                border: strokeColorIndex === 0 ? '6px solid #FF005C' : null }} onClick={() => {changeStrokeColor(0); modalClose();}} />
              <ColorTag style={{ backgroundColor: '#F6F6F6', borderRadius: strokeColorIndex === 1 ? '8px' : null,
                border: strokeColorIndex === 1 ? '6px solid #FF005C' : null }} onClick={() => {changeStrokeColor(1); modalClose();}} />
              <ColorTag style={{ backgroundColor: '#EA7272', borderRadius: strokeColorIndex === 2 ? '8px' : null,
                border: strokeColorIndex === 2 ? '6px solid #FF005C' : null }} onClick={() => {changeStrokeColor(2); modalClose();}} />
              <ColorTag style={{ backgroundColor: '#EB2C37', borderRadius: strokeColorIndex === 3 ? '8px' : null,
                border: strokeColorIndex === 3 ? '6px solid #FF005C' : null }} onClick={() => {changeStrokeColor(3); modalClose();}} />
              <ColorTag style={{ backgroundColor: '#EB8C35', borderRadius: strokeColorIndex === 4 ? '8px' : null,
                border: strokeColorIndex === 4 ? '6px solid #FF005C' : null }} onClick={() => {changeStrokeColor(4); modalClose();}} />
              <ColorTag style={{ backgroundColor: '#FEED01', borderRadius: strokeColorIndex === 5 ? '8px' : null,
                border: strokeColorIndex === 5 ? '6px solid #FF005C' : null }} onClick={() => {changeStrokeColor(5); modalClose();}} />
              <ColorTag style={{ backgroundColor: '#94C120', borderRadius: strokeColorIndex === 6 ? '8px' : null,
                border: strokeColorIndex === 6 ? '6px solid #FF005C' : null }} onClick={() => {changeStrokeColor(6); modalClose();}} />
              <ColorTag style={{ backgroundColor: '#0C8E36', borderRadius: strokeColorIndex === 7 ? '8px' : null,
                border: strokeColorIndex === 7 ? '6px solid #FF005C' : null }} onClick={() => {changeStrokeColor(7); modalClose();}} />
              <ColorTag style={{ backgroundColor: '#74BBEE', borderRadius: strokeColorIndex === 8 ? '8px' : null,
                border: strokeColorIndex === 8 ? '6px solid #FF005C' : null }} onClick={() => {changeStrokeColor(8); modalClose();}} />
              <ColorTag style={{ backgroundColor: '#0665C4', borderRadius: strokeColorIndex === 9 ? '8px' : null,
                border: strokeColorIndex === 9 ? '6px solid #FF005C' : null }} onClick={() => {changeStrokeColor(9); modalClose();}} />
              <ColorTag style={{ backgroundColor: '#5F2BA8', borderRadius: strokeColorIndex === 10 ? '8px' : '0 10px 10px 0',
                border: strokeColorIndex === 10 ? '6px solid #FF005C' : null }} onClick={() => {changeStrokeColor(10); modalClose();}} />
            </ColorPickerTag>
          </PaintingToolModalComponentTag>
        </ModalBackgroundTag>
      : null }
    </>
  )
}