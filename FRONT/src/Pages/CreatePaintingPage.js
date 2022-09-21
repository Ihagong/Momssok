import React from 'react'
import { CanvasComponent } from '../Components/CanvasComponent/CanvasComponent'
// import { ClearCanvasButton } from '../Components/CanvasComponent/ClearCanvasButton'
// import { ChangeStrokeStyleButton } from '../Components/CanvasComponent/ChangeStrokeStyleButton'
// import { SaveCanvasButton } from '../Components/CanvasComponent/SaveCanvasButton'
// import { AddObjectButton } from '../Components/CanvasComponent/addObjectButton'
// import { ChangeLineWidthBar } from '../Components/CanvasComponent/ChangeLineWidthBar'
import { CanvasProvider } from "../Components/CanvasComponent/CanvasContext"
import { PaintingToolTag, ChildButtonTag1, ChildButtonTag2 } from '../Style/Components'


function CreatePaintingPage(props) {
  // console.log(loadedPaintingSrc)

  const handleClickCloseButton = () => {
  }

  const handleClickSaveButton = () => {
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <CanvasProvider loadedPainting={props.loadedPainting}>
        <CanvasComponent />
        <div style={{ display: 'flex' }}>
          {/* <ChangeStrokeStyleButton />
          <ClearCanvasButton />
          <SaveCanvasButton />
          <AddObjectButton />
          <ChangeLineWidthBar /> */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '1060px', padding: '20px' }}>
            <PaintingToolTag><img src='/icons/tools.svg'></img></PaintingToolTag>
            <PaintingToolTag><img src='/icons/color.svg'></img></PaintingToolTag>
            <PaintingToolTag><img src='/icons/camera.svg'></img></PaintingToolTag>
            <ChildButtonTag1 style={{ width: '200px' }} onClick={handleClickCloseButton}>닫기</ChildButtonTag1>
            <ChildButtonTag2 style={{ width: '200px' }} onClick={handleClickSaveButton}>저장</ChildButtonTag2>
          </div>
        </div>
      </CanvasProvider>
    </div>
  );
}

export default CreatePaintingPage