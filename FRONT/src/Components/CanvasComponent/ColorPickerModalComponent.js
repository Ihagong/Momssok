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

  const strokeColor = [
    '#F6F6F6', '#F88484', '#EB2C37', '#EB8C35', '#FEED01', '#94C120', '#0C8E36',
    '#121212', '#74BBEE', '#7E4319', '#F6C4A8', '#882BA8', '#0665C4', '#74BBEE'
  ]
  return (
    <>
      { modalOpen ?
        <ModalBackgroundTag onClick={onCloseModal}>
          <PaintingToolModalComponentTag>
            <ColorPickerTag>
              <div style={{ display: 'flex' }}>
                <ColorTag style={{ backgroundColor: '#F6F6F6', borderRadius: strokeColorIndex === 0 ? '8px' : '10px 0 0 0',
                  outline: strokeColorIndex === 0 ? '6px solid #FF005C' : null,
                  zIndex: strokeColorIndex === 0 ? 1 : null }} onClick={() => {changeStrokeColor(0); modalClose();}} />
                <ColorTag style={{ backgroundColor: '#F88484', borderRadius: strokeColorIndex === 1 ? '8px' : null,
                  outline: strokeColorIndex === 1 ? '6px solid #FF005C' : null,
                  zIndex: strokeColorIndex === 1 ? 1 : null }} onClick={() => {changeStrokeColor(1); modalClose();}} />
                <ColorTag style={{ backgroundColor: '#EB2C37', borderRadius: strokeColorIndex === 2 ? '8px' : null,
                  outline: strokeColorIndex === 2 ? '6px solid #FF005C' : null,
                  zIndex: strokeColorIndex === 2 ? 1 : null }} onClick={() => {changeStrokeColor(2); modalClose();}} />
                <ColorTag style={{ backgroundColor: '#EB8C35', borderRadius: strokeColorIndex === 3 ? '8px' : null,
                  outline: strokeColorIndex === 3 ? '6px solid #FF005C' : null,
                  zIndex: strokeColorIndex === 3 ? 1 : null }} onClick={() => {changeStrokeColor(3); modalClose();}} />
                <ColorTag style={{ backgroundColor: '#FEED01', borderRadius: strokeColorIndex === 4 ? '8px' : null,
                  outline: strokeColorIndex === 4 ? '6px solid #FF005C' : null,
                  zIndex: strokeColorIndex === 4 ? 1 : null }} onClick={() => {changeStrokeColor(4); modalClose();}} />
                <ColorTag style={{ backgroundColor: '#94C120', borderRadius: strokeColorIndex === 5 ? '8px' : null,
                  outline: strokeColorIndex === 5 ? '6px solid #FF005C' : null,
                  zIndex: strokeColorIndex === 5 ? 1 : null }} onClick={() => {changeStrokeColor(5); modalClose();}} />
                <ColorTag style={{ backgroundColor: '#0C8E36', borderRadius: strokeColorIndex === 6 ? '8px' : '0 10px 0 0',
                  outline: strokeColorIndex === 6 ? '6px solid #FF005C' : null,
                  zIndex: strokeColorIndex === 6 ? 1 : null }} onClick={() => {changeStrokeColor(6); modalClose();}} />
              </div>
              <div style={{ display: 'flex' }}>
                <ColorTag style={{ backgroundColor: '#121212', borderRadius: strokeColorIndex === 7 ? '8px' : '0 0 0 10px',
                  outline: strokeColorIndex === 7 ? '6px solid #FF005C' : null,
                  zIndex: strokeColorIndex === 7 ? 1 : null }} onClick={() => {changeStrokeColor(7); modalClose();}} />
                <ColorTag style={{ backgroundColor: '#747474', borderRadius: strokeColorIndex === 8 ? '8px' : null,
                  outline: strokeColorIndex === 8 ? '6px solid #FF005C' : null,
                  zIndex: strokeColorIndex === 8 ? 1 : null }} onClick={() => {changeStrokeColor(8); modalClose();}} />
                <ColorTag style={{ backgroundColor: '#7E4319', borderRadius: strokeColorIndex === 9 ? '8px' : null,
                  outline: strokeColorIndex === 9 ? '6px solid #FF005C' : null,
                  zIndex: strokeColorIndex === 9 ? 1 : null }} onClick={() => {changeStrokeColor(9); modalClose();}} />
                <ColorTag style={{ backgroundColor: '#F6C4A8', borderRadius: strokeColorIndex === 10 ? '8px' : null,
                  outline: strokeColorIndex === 10 ? '6px solid #FF005C' : null,
                  zIndex: strokeColorIndex === 10 ? 1 : null }} onClick={() => {changeStrokeColor(10); modalClose();}} />
                <ColorTag style={{ backgroundColor: '#882BA8', borderRadius: strokeColorIndex === 11 ? '8px' : null,
                  outline: strokeColorIndex === 11 ? '6px solid #FF005C' : null,
                  zIndex: strokeColorIndex === 11 ? 1 : null }} onClick={() => {changeStrokeColor(11); modalClose();}} />
                <ColorTag style={{ backgroundColor: '#0665C4', borderRadius: strokeColorIndex === 12 ? '8px' : null,
                  outline: strokeColorIndex === 12 ? '6px solid #FF005C' : null,
                  zIndex: strokeColorIndex === 12 ? 1 : null }} onClick={() => {changeStrokeColor(12); modalClose();}} />
                <ColorTag style={{ backgroundColor: '#74BBEE', borderRadius: strokeColorIndex === 13 ? '8px' : '0 0 10px 0',
                  outline: strokeColorIndex === 13 ? '6px solid #FF005C' : null,
                  zIndex: strokeColorIndex === 13 ? 1 : null }} onClick={() => {changeStrokeColor(13); modalClose();}} />
              </div>
            </ColorPickerTag>
          </PaintingToolModalComponentTag>
        </ModalBackgroundTag>
      : null }
    </>
  )
}