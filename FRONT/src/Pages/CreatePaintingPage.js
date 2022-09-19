import React from 'react'
import { CanvasComponent } from '../Components/CanvasComponent/CanvasComponent'
import { ClearCanvasButton } from '../Components/CanvasComponent/ClearCanvasButton'
import { ChangeStrokeStyleButton } from '../Components/CanvasComponent/ChangeStrokeStyleButton'
import { SaveCanvasButton } from '../Components/CanvasComponent/SaveCanvasButton'
import { AddObjectButton } from '../Components/CanvasComponent/addObjectButton'
import { ChangeLineWidthBar } from '../Components/CanvasComponent/ChangeLineWidthBar'
import { KeepDiaryComponent } from '../Components/KeepDiaryComponent'
import { CanvasProvider } from "../Components/CanvasComponent/CanvasContext"


function CreatePaintingPage() {
  return (
    <>
      <CanvasProvider>
        <KeepDiaryComponent />
        <ChangeStrokeStyleButton />
        <ClearCanvasButton />
        <SaveCanvasButton />
        <AddObjectButton />
        <ChangeLineWidthBar />
        <CanvasComponent />
      </CanvasProvider>
    </>
  );
}

export default CreatePaintingPage