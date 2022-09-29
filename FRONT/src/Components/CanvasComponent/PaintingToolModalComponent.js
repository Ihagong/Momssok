import React, { useState } from 'react'
import { PaintingToolModalComponentTag, ModalBackgroundTag, PaintingToolButtonTag, StrokeWidthButtonTag, StrokeWidthTag } from '../../Style/Components'


export function PaintingToolModalComponent({ modalOpen, modalClose, changeStrokeTexture, changeStrokeLineWidthIndex }) {
  const [toolIndex, setToolIndex] = useState(0)
  const [lineWidthIndex, setLineWidthIndex] = useState(0)

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      modalClose()
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
          <PaintingToolModalComponentTag>
            <div style={{ display: 'flex' }}>
              <PaintingToolButtonTag style={{ backgroundColor: toolIndex === 0 ? '#00000010' : null,
                outline: toolIndex === 0 ? '6px solid #FF005C' : null  }} onClick={() => {handleClickToolButton(0)}}>
                <img src='/icons/paintingTool_pen.png' /></PaintingToolButtonTag>
              <PaintingToolButtonTag style={{ backgroundColor: toolIndex === 1 ? '#00000010' : null,
                outline: toolIndex === 1 ? '6px solid #FF005C' : null  }} onClick={() => {handleClickToolButton(1)}}>
                <img src='/icons/paintingTool_crayon.png' /></PaintingToolButtonTag>
              <PaintingToolButtonTag style={{ backgroundColor: toolIndex === 2 ? '#00000010' : null,
                outline: toolIndex === 2 ? '6px solid #FF005C' : null  }} onClick={() => {handleClickToolButton(2)}}>
                <img src='/icons/paintingTool_pencil.png' /></PaintingToolButtonTag>
              <PaintingToolButtonTag style={{ backgroundColor: toolIndex === 3 ? '#00000010' : null,
                outline: toolIndex === 3 ? '6px solid #FF005C' : null  }} onClick={() => {handleClickToolButton(3)}}>
                <img src='/icons/paintingTool_brush.png' /></PaintingToolButtonTag>
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
                <StrokeWidthTag style={{ width: '20px' }} />
              </StrokeWidthButtonTag>
              <StrokeWidthButtonTag style={{ backgroundColor: lineWidthIndex === 3 ? '#00000010' : null,
                outline: lineWidthIndex === 3 ? '6px solid #FFE400' : null }} onClick={() => {handleClickLineWidthButton(3)}}>
                <StrokeWidthTag style={{ width: '30px' }} />
              </StrokeWidthButtonTag>
            </div>
          </PaintingToolModalComponentTag>
        </ModalBackgroundTag>
      : null }
    </>
  )
}