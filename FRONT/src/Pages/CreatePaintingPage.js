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


// 크레파스

const crayonBlack = new Image()
crayonBlack.src = '/textures/crayon_black.png'

const crayonWhite = new Image()
crayonWhite.src = '/textures/crayon_white.png'

const crayonPink = new Image()
crayonPink.src = '/textures/crayon_pink.png'

const crayonRed = new Image()
crayonRed.src = '/textures/crayon_red.png'

const crayonOrange = new Image()
crayonOrange.src = '/textures/crayon_orange.png'

const crayonYellow = new Image()
crayonYellow.src = '/textures/crayon_yellow.png'

const crayonLightGreen = new Image()
crayonLightGreen.src = '/textures/crayon_lightgreen.png'

const crayonGreen = new Image()
crayonGreen.src = '/textures/crayon_green.png'

const crayonSkyBlue = new Image()
crayonSkyBlue.src = '/textures/crayon_skyblue.png'

const crayonBlue = new Image()
crayonBlue.src = '/textures/crayon_blue.png'

const crayonPurple = new Image()
crayonPurple.src = '/textures/crayon_purple.png'

// 물감

// const paintBlack = new Image()
// paintBlack.src = '/textures/paint_black.png'

// const paintWhite = new Image()
// paintWhite.src = '/textures/paint_white.png'

// const paintPink = new Image()
// paintPink.src = '/textures/paint_pink.png'

// const paintRed = new Image()
// paintRed.src = '/textures/paint_red.png'

// const paintOrange = new Image()
// paintOrange.src = '/textures/paint_orange.png'

// const paintYellow = new Image()
// paintYellow.src = '/textures/paint_yellow.png'

// const paintLightGreen = new Image()
// paintLightGreen.src = '/textures/paint_lightgreen.png'

// const paintGreen = new Image()
// paintGreen.src = '/textures/paint_green.png'

// const paintSkyBlue = new Image()
// paintSkyBlue.src = '/textures/paint_skyblue.png'

// const paintBlue = new Image()
// paintBlue.src = '/textures/paint_blue.png'

// const paintPurple = new Image()
// paintPurple.src = '/textures/paint_purple.png'


const textures = [
  [crayonBlack, crayonWhite, crayonPink, crayonRed, crayonOrange, crayonYellow, crayonLightGreen, crayonGreen, crayonSkyBlue, crayonBlue, crayonPurple],
  // [paintBlack, paintWhite, paintPink, paintRed, paintOrange, paintYellow, paintLightGreen, paintGreen, paintSkyBlue, paintBlue, paintPurple],
]

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
      <CanvasProvider loadedPainting={props.loadedPainting} textures={textures}>
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