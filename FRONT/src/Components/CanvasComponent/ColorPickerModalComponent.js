import React, { useState } from 'react'
import { useCanvas } from './CanvasContext'
import { PaintingToolModalComponentTag, ModalBackgroundTag, ChildButtonTag2 } from '../../Style/Components'


export function ColorPickerModalComponent({ modalOpen, modalClose }) {
  const { changeStrokeStyle } = useCanvas()

  return (
    <>
      { modalOpen ?
        <ModalBackgroundTag>
          <PaintingToolModalComponentTag>
            <button onClick={() => {changeStrokeStyle('black')}}>검정</button>
            <button onClick={() => {changeStrokeStyle('red')}}>빨강</button>
            <button onClick={() => {changeStrokeStyle('blue')}}>파랑</button>
            <button onClick={() => {changeStrokeStyle('green')}}>초록</button>
            <ChildButtonTag2 onClick={modalClose}>닫기</ChildButtonTag2>
          </PaintingToolModalComponentTag>
        </ModalBackgroundTag>
      : null }
    </>
  )
}