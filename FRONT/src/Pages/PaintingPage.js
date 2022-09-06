import React from 'react'
import { CanvasComponent } from '../Components/CanvasComponent/CanvasComponent'
import { ClearCanvasButton } from '../Components/CanvasComponent/ClearCanvasButton'
import { ChangeStrokeStyleButton } from '../Components/CanvasComponent/ChangeStrokeStyleButton'
import { ChangeLineWidthBar } from '../Components/CanvasComponent/ChangeLineWidthBar'

function PaintingPage() {
  return (
    <>
      <ChangeStrokeStyleButton/>
      <ClearCanvasButton/>
      <ChangeLineWidthBar/>
      <CanvasComponent/>
    </>
  );
}

export default PaintingPage