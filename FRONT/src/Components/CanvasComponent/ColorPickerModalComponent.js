import React from 'react'
import { ModalBackgroundTag, ColorPickerModalComponentTag, ColorTag } from '../../Style/Components'


export function ColorPickerModalComponent({ modalOpen, modalClose, strokeColorIndex, changeStrokeColor }) {

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      modalClose()
    }
  }

  return (
    <>
      { modalOpen ?
        <ModalBackgroundTag onClick={onCloseModal}>
          <ColorPickerModalComponentTag>
            <div style={{ display: 'flex' }}>
              <ColorTag style={{ backgroundColor: '#121212', borderRadius: strokeColorIndex === 0 ? '8px' : '10px 0 0 0',
                outline: strokeColorIndex === 0 ? '6px solid #FF005C' : null,
                zIndex: strokeColorIndex === 0 ? 1 : null }} onClick={() => {changeStrokeColor(0)}} />
              <ColorTag style={{ backgroundColor: '#F88484', borderRadius: strokeColorIndex === 1 ? '8px' : null,
                outline: strokeColorIndex === 1 ? '6px solid #FF005C' : null,
                zIndex: strokeColorIndex === 1 ? 1 : null }} onClick={() => {changeStrokeColor(1)}} />
              <ColorTag style={{ backgroundColor: '#EB2C37', borderRadius: strokeColorIndex === 2 ? '8px' : null,
                outline: strokeColorIndex === 2 ? '6px solid #FF005C' : null,
                zIndex: strokeColorIndex === 2 ? 1 : null }} onClick={() => {changeStrokeColor(2)}} />
              <ColorTag style={{ backgroundColor: '#EB8C35', borderRadius: strokeColorIndex === 3 ? '8px' : null,
                outline: strokeColorIndex === 3 ? '6px solid #FF005C' : null,
                zIndex: strokeColorIndex === 3 ? 1 : null }} onClick={() => {changeStrokeColor(3)}} />
              <ColorTag style={{ backgroundColor: '#FEED01', borderRadius: strokeColorIndex === 4 ? '8px' : null,
                outline: strokeColorIndex === 4 ? '6px solid #FF005C' : null,
                zIndex: strokeColorIndex === 4 ? 1 : null }} onClick={() => {changeStrokeColor(4)}} />
              <ColorTag style={{ backgroundColor: '#94C120', borderRadius: strokeColorIndex === 5 ? '8px' : null,
                outline: strokeColorIndex === 5 ? '6px solid #FF005C' : null,
                zIndex: strokeColorIndex === 5 ? 1 : null }} onClick={() => {changeStrokeColor(5)}} />
              <ColorTag style={{ backgroundColor: '#0C8E36', borderRadius: strokeColorIndex === 6 ? '8px' : '0 10px 0 0',
                outline: strokeColorIndex === 6 ? '6px solid #FF005C' : null,
                zIndex: strokeColorIndex === 6 ? 1 : null }} onClick={() => {changeStrokeColor(6)}} />
            </div>
            <div style={{ display: 'flex' }}>
              <ColorTag style={{ backgroundColor: '#F6F6F6', borderRadius: strokeColorIndex === 7 ? '8px' : '0 0 0 10px',
                outline: strokeColorIndex === 7 ? '6px solid #FF005C' : null,
                zIndex: strokeColorIndex === 7 ? 1 : null }} onClick={() => {changeStrokeColor(7)}} />
              <ColorTag style={{ backgroundColor: '#747474', borderRadius: strokeColorIndex === 8 ? '8px' : null,
                outline: strokeColorIndex === 8 ? '6px solid #FF005C' : null,
                zIndex: strokeColorIndex === 8 ? 1 : null }} onClick={() => {changeStrokeColor(8)}} />
              <ColorTag style={{ backgroundColor: '#7E4319', borderRadius: strokeColorIndex === 9 ? '8px' : null,
                outline: strokeColorIndex === 9 ? '6px solid #FF005C' : null,
                zIndex: strokeColorIndex === 9 ? 1 : null }} onClick={() => {changeStrokeColor(9)}} />
              <ColorTag style={{ backgroundColor: '#F6C4A8', borderRadius: strokeColorIndex === 10 ? '8px' : null,
                outline: strokeColorIndex === 10 ? '6px solid #FF005C' : null,
                zIndex: strokeColorIndex === 10 ? 1 : null }} onClick={() => {changeStrokeColor(10)}} />
              <ColorTag style={{ backgroundColor: '#882BA8', borderRadius: strokeColorIndex === 11 ? '8px' : null,
                outline: strokeColorIndex === 11 ? '6px solid #FF005C' : null,
                zIndex: strokeColorIndex === 11 ? 1 : null }} onClick={() => {changeStrokeColor(11)}} />
              <ColorTag style={{ backgroundColor: '#0665C4', borderRadius: strokeColorIndex === 12 ? '8px' : null,
                outline: strokeColorIndex === 12 ? '6px solid #FF005C' : null,
                zIndex: strokeColorIndex === 12 ? 1 : null }} onClick={() => {changeStrokeColor(12)}} />
              <ColorTag style={{ backgroundColor: '#74BBEE', borderRadius: strokeColorIndex === 13 ? '8px' : '0 0 10px 0',
                outline: strokeColorIndex === 13 ? '6px solid #FF005C' : null,
                zIndex: strokeColorIndex === 13 ? 1 : null }} onClick={() => {changeStrokeColor(13)}} />
            </div>
          </ColorPickerModalComponentTag>
        </ModalBackgroundTag>
      : null }
    </>
  )
}