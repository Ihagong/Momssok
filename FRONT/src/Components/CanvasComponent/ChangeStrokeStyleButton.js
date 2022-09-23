import React from 'react'
import { useCanvas } from './CanvasContext'

export const ChangeStrokeStyleButton = () => {
  const { changeStrokeStyle } = useCanvas()

  return (
    <>
      <button onClick={() => {changeStrokeStyle('black')}}>검정</button>
      <button onClick={() => {changeStrokeStyle('red')}}>빨강</button>
      <button onClick={() => {changeStrokeStyle('blue')}}>파랑</button>
      <button onClick={() => {changeStrokeStyle('green')}}>초록</button>
    </>
  )
}