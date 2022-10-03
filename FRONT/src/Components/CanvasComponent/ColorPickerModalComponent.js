import React, { useEffect } from 'react'
import { ModalBackgroundTag, ColorPickerModalComponentTag, ColorTag } from '../../Style/Components'


export function ColorPickerModalComponent({ modalOpen, setColorPickerModalOpen, offset, gesture, strokeColorIndex, changeStrokeColor }) {

  useEffect(() => {
    const offsetX = offset.offsetX
    const offsetY = offset.offsetY
    console.log(offset)
    if (modalOpen && gesture === 'indexGesture') {
      if (offsetY >= 346 && offsetY <= 446) {
        if (offsetX >= 4 && offsetX < 104) {
          changeStrokeColor(0)
        } else if (offsetX >= 104 && offsetX < 204) {
          changeStrokeColor(1)
        } else if (offsetX >= 204 && offsetX < 304) {
          changeStrokeColor(2)
        } else if (offsetX >= 304 && offsetX < 404) {
          changeStrokeColor(3)
        } else if (offsetX >= 404 && offsetX < 504) {
          changeStrokeColor(4)
        } else if (offsetX >= 504 && offsetX < 604) {
          changeStrokeColor(5)
        } else if (offsetX >= 604 && offsetX < 704) {
          changeStrokeColor(6)
        } else {
          setColorPickerModalOpen(false)
        }
      } else if (offsetY >= 446 && offsetY <= 546) {
        if (offsetX >= 4 && offsetX < 104) {
          changeStrokeColor(7)
        } else if (offsetX >= 104 && offsetX < 204) {
          changeStrokeColor(8)
        } else if (offsetX >= 204 && offsetX < 304) {
          changeStrokeColor(9)
        } else if (offsetX >= 304 && offsetX < 404) {
          changeStrokeColor(10)
        } else if (offsetX >= 404 && offsetX < 504) {
          changeStrokeColor(11)
        } else if (offsetX >= 504 && offsetX < 604) {
          changeStrokeColor(12)
        } else if (offsetX >= 604 && offsetX < 704) {
          changeStrokeColor(13)
        } else {
          setColorPickerModalOpen(false)
        }
      } else if (!(offsetY >= 546 && offsetY <= 700 && offsetX >= 240 && offsetX <= 370)) { // 아이콘 재배치 후 수정 필요
        setColorPickerModalOpen(false)
      }
    }
  }, [offset, gesture])

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setColorPickerModalOpen(false)
    }
  }

  return (
    <>
      { modalOpen ?
        <ModalBackgroundTag onClick={onCloseModal}>
          <ColorPickerModalComponentTag style={{ left: `${(window.innerWidth-1100)/2}px` }}>
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