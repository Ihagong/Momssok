import React, { useState } from 'react'
import { useCanvas } from './CanvasContext'
import { PaintingToolModalComponentTag, ModalBackgroundTag, ChildButtonTag2 } from '../../Style/Components'


export function ColorPickerModalComponent({ modalOpen, modalClose }) {
  const { changeStrokeColor } = useCanvas()

  return (
    <>
      { modalOpen ?
        <ModalBackgroundTag>
          <PaintingToolModalComponentTag>
            <button onClick={() => {changeStrokeColor(0); modalClose();}}>검정색</button>
            <button onClick={() => {changeStrokeColor(1); modalClose();}}>흰색</button>
            <button onClick={() => {changeStrokeColor(2); modalClose();}}>핑크색</button>
            <button onClick={() => {changeStrokeColor(3); modalClose();}}>빨간색</button>
            <button onClick={() => {changeStrokeColor(4); modalClose();}}>주황색</button>
            <button onClick={() => {changeStrokeColor(5); modalClose();}}>노란색</button>
            <button onClick={() => {changeStrokeColor(6); modalClose();}}>연두색</button>
            <button onClick={() => {changeStrokeColor(7); modalClose();}}>초록색</button>
            <button onClick={() => {changeStrokeColor(8); modalClose();}}>하늘색</button>
            <button onClick={() => {changeStrokeColor(9); modalClose();}}>파란색</button>
            <button onClick={() => {changeStrokeColor(10); modalClose();}}>보라색</button>
            <ChildButtonTag2 onClick={modalClose}>닫기</ChildButtonTag2>
          </PaintingToolModalComponentTag>
        </ModalBackgroundTag>
      : null }
    </>
  )
}