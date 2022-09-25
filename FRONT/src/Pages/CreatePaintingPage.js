import React, { useState } from 'react'
import { CanvasComponent } from '../Components/CanvasComponent/CanvasComponent'
// import { ClearCanvasButton } from '../Components/CanvasComponent/ClearCanvasButton'
// import { ChangeStrokeStyleButton } from '../Components/CanvasComponent/ChangeStrokeStyleButton'
// import { SaveCanvasButton } from '../Components/CanvasComponent/SaveCanvasButton'
// import { AddObjectButton } from '../Components/CanvasComponent/addObjectButton'
// import { ChangeLineWidthBar } from '../Components/CanvasComponent/ChangeLineWidthBar'
import { CanvasProvider } from '../Components/CanvasComponent/CanvasContext'
import { PaintingToolModalComponent } from '../Components/CanvasComponent/PaintingToolModalComponent'
import { ColorPickerModalComponent } from '../Components/CanvasComponent/ColorPickerModalComponent'
import { PaintingToolTag, ChildButtonTag1, ChildButtonTag2 } from '../Style/Components'


function CreatePaintingPage(props) {
  // console.log(loadedPaintingSrc)
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false)
  const [paintingToolModalOpen, setPaintingToolModalOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleClickCloseButton = () => {
  }

  const handleClickSaveButton = () => {
  }

  const handleClickPaintingToolButton = () => {
    setPaintingToolModalOpen(true)
  }

  const handleClickColorPickerButton = () => {
    setColorPickerModalOpen(true)
  }

  const handleClickModalClose = () => {
    setPaintingToolModalOpen(false)
    setColorPickerModalOpen(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <CanvasProvider loadedPainting={props.loadedPainting}>
        <ColorPickerModalComponent modalOpen={colorPickerModalOpen} modalClose={handleClickModalClose} onClick={() => setModalOpen(false)} />
        <PaintingToolModalComponent modalOpen={paintingToolModalOpen} modalClose={handleClickModalClose} onClick={() => setModalOpen(false)} />
        <CanvasComponent />
        <div style={{ display: 'flex' }}>
          {/* <ChangeStrokeStyleButton />
          <ClearCanvasButton />
          <SaveCanvasButton />
          <AddObjectButton />
          <ChangeLineWidthBar /> */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '1060px', padding: '20px' }}>
            <PaintingToolTag onClick={handleClickPaintingToolButton}><img src='/icons/tools.svg'></img></PaintingToolTag>
            <PaintingToolTag onClick={handleClickColorPickerButton}><img src='/icons/color.svg'></img></PaintingToolTag>
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