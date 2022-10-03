import React, { useEffect, useState } from 'react'
import { PaintingToolModalComponentTag, ModalBackgroundTag, PaintingToolButtonTag, StrokeWidthButtonTag, StrokeWidthTag } from '../../Style/Components'


export function PaintingToolModalComponent({ modalOpen, setPaintingToolModalOpen, offset, gesture, changeStrokeTexture, changeStrokeLineWidthIndex }) {
  const [toolIndex, setToolIndex] = useState(0)
  const [lineWidthIndex, setLineWidthIndex] = useState(0)
  const leftWidth = (window.innerWidth-1100)/2

  useEffect(() => {
    const offsetX = offset.offsetX
    const offsetY = offset.offsetY
    if (modalOpen && gesture === 'indexGesture') {
      if (offsetY >= 270 && offsetY < 450) {
        if (offsetX >= 0 && offsetX < 100) {
          handleClickToolButton(0)
        } else if (offsetX >= 100 && offsetX < 200) {
          handleClickToolButton(1)
        } else if (offsetX >= 200 && offsetX < 300) {
          handleClickToolButton(2)
        } else if (offsetX >= 300 && offsetX < 400) {
          handleClickToolButton(3)
        } else if (offsetX >= 400 && offsetX < 500) {
          handleClickToolButton(4)
        } else {
          setPaintingToolModalOpen(false)
        }
      } else if (offsetY >= 450 && offsetY <= 540) {
        if (offsetX >= 0 && offsetX < 100) {
          handleClickLineWidthButton(0)
        } else if (offsetX >= 100 && offsetX < 200) {
          handleClickLineWidthButton(1)
        } else if (offsetX >= 200 && offsetX < 300) {
          handleClickLineWidthButton(2)
        } else if (offsetX >= 300 && offsetX < 400) {
          handleClickLineWidthButton(3)
        } else if (offsetX >= 400 && offsetX < 500) {
          handleClickLineWidthButton(4)
        } else {
          setPaintingToolModalOpen(false)
        }
      } else if (!(offsetY >= 540 && offsetY <= 700 && offsetX >= 30 && offsetX < 160)) { // 아이콘 재배치 후 수정 필요
        setPaintingToolModalOpen(false)
      }
    }
  }, [offset, gesture])

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setPaintingToolModalOpen(false)
    }
  }

  const handleClickToolButton = (toolIndex) => {
    setToolIndex(toolIndex)
    changeStrokeTexture(toolIndex)
  }

  const handleClickLineWidthButton = (lineWidthIndex) => {
    setLineWidthIndex(lineWidthIndex)
    changeStrokeLineWidthIndex(lineWidthIndex)
  }

  return (
    <>
      { modalOpen ?
  
        <ModalBackgroundTag onClick={onCloseModal}>
          <PaintingToolModalComponentTag style={{ left: `${leftWidth}px` }} >
            <div style={{ display: 'flex' }}>
              <PaintingToolButtonTag style={{ backgroundColor: toolIndex === 0 ? '#00000010' : null,
                outline: toolIndex === 0 ? '6px solid #FF005C' : null  }} onClick={() => {handleClickToolButton(0)}}>
                <img src='/icons/paintingTool_0.png' /></PaintingToolButtonTag>
              <PaintingToolButtonTag style={{ backgroundColor: toolIndex === 1 ? '#00000010' : null,
                outline: toolIndex === 1 ? '6px solid #FF005C' : null  }} onClick={() => {handleClickToolButton(1)}}>
                <img src='/icons/paintingTool_1.png' /></PaintingToolButtonTag>
              <PaintingToolButtonTag style={{ backgroundColor: toolIndex === 2 ? '#00000010' : null,
                outline: toolIndex === 2 ? '6px solid #FF005C' : null  }} onClick={() => {handleClickToolButton(2)}}>
                <img src='/icons/paintingTool_2.png' /></PaintingToolButtonTag>
              <PaintingToolButtonTag style={{ backgroundColor: toolIndex === 3 ? '#00000010' : null,
                outline: toolIndex === 3 ? '6px solid #FF005C' : null  }} onClick={() => {handleClickToolButton(3)}}>
                <img src='/icons/paintingTool_3.png' /></PaintingToolButtonTag>
              <PaintingToolButtonTag style={{ backgroundColor: toolIndex === 4 ? '#00000010' : null,
                outline: toolIndex === 4 ? '6px solid #FF005C' : null  }} onClick={() => {handleClickToolButton(4)}}>
                <img src='/icons/paintingTool_4.png' /></PaintingToolButtonTag>
            </div>
            <div style={{ display: 'flex', backgroundColor: 'var(--Brown-LightText)', borderRadius: '20px' }}>
              <StrokeWidthButtonTag style={{ backgroundColor: lineWidthIndex === 0 ? '#00000010' : null,
                outline: lineWidthIndex === 0 ? '6px solid #FFE400' : null }} onClick={() => {handleClickLineWidthButton(0)}}>
                <StrokeWidthTag style={{ width: '5px' }} />
              </StrokeWidthButtonTag>
              <StrokeWidthButtonTag style={{ backgroundColor: lineWidthIndex === 1 ? '#00000010' : null,
                outline: lineWidthIndex === 1 ? '6px solid #FFE400' : null }} onClick={() => {handleClickLineWidthButton(1)}}>
                <StrokeWidthTag style={{ width: '10px' }} />
              </StrokeWidthButtonTag>
              <StrokeWidthButtonTag style={{ backgroundColor: lineWidthIndex === 2 ? '#00000010' : null,
                outline: lineWidthIndex === 2 ? '6px solid #FFE400' : null }} onClick={() => {handleClickLineWidthButton(2)}}>
                <StrokeWidthTag style={{ width: '15px' }} />
              </StrokeWidthButtonTag>
              <StrokeWidthButtonTag style={{ backgroundColor: lineWidthIndex === 3 ? '#00000010' : null,
                outline: lineWidthIndex === 3 ? '6px solid #FFE400' : null }} onClick={() => {handleClickLineWidthButton(3)}}>
                <StrokeWidthTag style={{ width: '20px' }} />
              </StrokeWidthButtonTag>
              <StrokeWidthButtonTag style={{ backgroundColor: lineWidthIndex === 4 ? '#00000010' : null,
                outline: lineWidthIndex === 4 ? '6px solid #FFE400' : null }} onClick={() => {handleClickLineWidthButton(4)}}>
                <StrokeWidthTag style={{ width: '30px' }} />
              </StrokeWidthButtonTag>
            </div>
          </PaintingToolModalComponentTag>
        </ModalBackgroundTag>
      : null }
    </>
  )
}