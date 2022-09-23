import React, { useState } from 'react'
import { useCanvas } from './CanvasContext'

export const ChangeLineWidthBar = () => {
  const { changeLineWidth } = useCanvas()
  const [value, setValue] = useState(3)

  return (
    <>
    <div>
      <input type='range' min='1' max='100' value={value}
        onChange={(e) => {
          setValue(e.target.value)
          changeLineWidth(e.target.value)
        }}
      />
    </div>
    </>
  )
}