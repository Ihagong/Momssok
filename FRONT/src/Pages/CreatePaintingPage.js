import React, { useState } from 'react'
import { CanvasComponent } from '../Components/CanvasComponent/CanvasComponent'
// import { ClearCanvasButton } from '../Components/CanvasComponent/ClearCanvasButton'
// import { ChangeStrokeStyleButton } from '../Components/CanvasComponent/ChangeStrokeStyleButton'
import { SaveCanvasButton } from '../Components/CanvasComponent/SaveCanvasButton'
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

const crayonApricot = new Image()
crayonApricot.src = '/textures/crayon_apricot.png'

const crayonBrown = new Image()
crayonBrown.src = '/textures/crayon_brown.png'

const crayonGray = new Image()
crayonGray.src = '/textures/crayon_gray.png'


// 색연필

const pencilBlack = new Image()
pencilBlack.src = '/textures/pencil_black.png'

const pencilWhite = new Image()
pencilWhite.src = '/textures/pencil_white.png'

const pencilPink = new Image()
pencilPink.src = '/textures/pencil_pink.png'

const pencilRed = new Image()
pencilRed.src = '/textures/pencil_red.png'

const pencilOrange = new Image()
pencilOrange.src = '/textures/pencil_orange.png'

const pencilYellow = new Image()
pencilYellow.src = '/textures/pencil_yellow.png'

const pencilLightGreen = new Image()
pencilLightGreen.src = '/textures/pencil_lightgreen.png'

const pencilGreen = new Image()
pencilGreen.src = '/textures/pencil_green.png'

const pencilSkyBlue = new Image()
pencilSkyBlue.src = '/textures/pencil_skyblue.png'

const pencilBlue = new Image()
pencilBlue.src = '/textures/pencil_blue.png'

const pencilPurple = new Image()
pencilPurple.src = '/textures/pencil_purple.png'

const pencilApricot = new Image()
pencilApricot.src = '/textures/pencil_apricot.png'

const pencilBrown = new Image()
pencilBrown.src = '/textures/pencil_brown.png'

const pencilGray = new Image()
pencilGray.src = '/textures/pencil_gray.png'


const textures = [
  [crayonBlack, crayonPink, crayonRed, crayonOrange, crayonYellow, crayonLightGreen, crayonGreen,
    crayonWhite, crayonGray, crayonBrown, crayonApricot, crayonPurple, crayonBlue, crayonSkyBlue],
  [pencilBlack, pencilPink, pencilRed, pencilOrange, pencilYellow, pencilLightGreen, pencilGreen,
    pencilWhite, pencilGray, pencilBrown, pencilApricot, pencilPurple, pencilBlue, pencilSkyBlue],
]

function CreatePaintingPage(props) {
  // console.log(loadedPaintingSrc)
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false)
  const [paintingToolModalOpen, setPaintingToolModalOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [strokeColorIndex, setStrokeColorIndex] = useState(0)
  const [strokeTextureIndex, setStrokeTextureIndex] = useState(0)
  const [strokeLineWidthIndex, setStrokeLineWidthIndex] = useState(0)

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

  const changeStrokeTexture = (textureIndex) => {
    setStrokeTextureIndex(textureIndex)
    console.log(textureIndex)
  }

  const changeStrokeColor = (colorIndex) => {
    setStrokeColorIndex(colorIndex)
    console.log(colorIndex)
  }

  const changeStrokeLineWidthIndex = (lineWidthIndex) => {
    setStrokeLineWidthIndex(lineWidthIndex)
    console.log(lineWidthIndex)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <CanvasProvider loadedPainting={props.loadedPainting} textures={textures}
        strokeColorIndex={strokeColorIndex} strokeTextureIndex={strokeTextureIndex} strokeLineWidthIndex={strokeLineWidthIndex}>
        <PaintingToolModalComponent modalOpen={paintingToolModalOpen} modalClose={handleClickModalClose}
          changeStrokeTexture={changeStrokeTexture} changeStrokeLineWidthIndex={changeStrokeLineWidthIndex} onClick={() => setModalOpen(false)} />
        <ColorPickerModalComponent modalOpen={colorPickerModalOpen} modalClose={handleClickModalClose}
          strokeColorIndex={strokeColorIndex} changeStrokeColor={changeStrokeColor} onClick={() => setModalOpen(false)} />
        <CanvasComponent />
        <div style={{ display: 'flex' }}>
        <SaveCanvasButton />
          {/* <ChangeStrokeStyleButton />
          <ClearCanvasButton />
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