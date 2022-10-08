import React, { useState } from 'react'
import { CanvasComponent } from '../Components/CanvasComponent/CanvasComponent'
import { ClearCanvasButton } from '../Components/CanvasComponent/ClearCanvasButton'
// import { ChangeStrokeStyleButton } from '../Components/CanvasComponent/ChangeStrokeStyleButton'
import { SaveCanvasButton } from '../Components/CanvasComponent/SaveCanvasButton'
// import { AddObjectButton } from '../Components/CanvasComponent/addObjectButton'
// import { ChangeLineWidthBar } from '../Components/CanvasComponent/ChangeLineWidthBar'
import { CanvasProvider } from '../Components/CanvasComponent/CanvasContext'
import { PaintingToolModalComponent } from '../Components/CanvasComponent/PaintingToolModalComponent'
import { ColorPickerModalComponent } from '../Components/CanvasComponent/ColorPickerModalComponent'
import { PaintingToolTag, LetterButtonBack, LetterButtonGo, PointerTag, PaintingGuideTag, PaintingCanvasTag } from '../Style/Components'
import { MotionDetectionComponent } from '../Components/CanvasComponent/MotionDetectionComponent'
import { useParams, useLocation, useNavigate } from  'react-router-dom'

import { useRecoilState } from 'recoil'
import { dictionaryPaintingState, animalDictionaryState } from '../store/atoms'

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
  const [dictionaryPaintingList, setDictionaryPaintingList] = useRecoilState(dictionaryPaintingState)
  const [dictionaryAnimalList, setDictionaryAnimalList] = useRecoilState(animalDictionaryState)
  console.log(dictionaryPaintingList)
  const [paintingToolModalOpen, setPaintingToolModalOpen] = useState(false)
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [strokeColorIndex, setStrokeColorIndex] = useState(0)
  const [strokeTextureIndex, setStrokeTextureIndex] = useState(0)
  const [strokeLineWidthIndex, setStrokeLineWidthIndex] = useState(0)
  const [isCamOn, setIsCamOn] = useState(false)
  const [offset, setOffset] = useState({offsetX: 0, offsetY: 0})
  const [gesture, setGesture] = useState('defaultGesture')
  const [partIndex, setPartIndex] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const { detailId } = useParams()
  const [animal, setAnimal] = useState(dictionaryAnimalList[detailId-1])
  const navigate = useNavigate()
  
  console.log(animal.name)
  const { state } = useLocation()

  const handleClickCloseButton = () => {
    navigate('/dictionary')
  }

  const handleClickNextButton = () => {
    if (partIndex <= animal.parts.length) {
      setPartIndex(partIndex+1)

      if (partIndex == animal.parts.length-1) {
        soundPlay(animal.name)
        setIsDone(true)
      }
    }
    if (partIndex >= animal.parts.length) {
      navigate('/dictionary')
    }
  }

  const soundPlay = (animal) => {
    let sound = new Audio(`/sounds/sound_${animal}.mp3`)
    sound.play()
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
  }

  const changeStrokeColor = (colorIndex) => {
    setStrokeColorIndex(colorIndex)
  }

  const changeStrokeLineWidthIndex = (lineWidthIndex) => {
    setStrokeLineWidthIndex(lineWidthIndex)
  }

  const handleSelectTool = (offsetX, offsetY) => {
    console.log(offsetX, offsetY)
    
    if (offsetY >= 550 && offsetY <= 700) {
      if (offsetX >= 30 && offsetX < 160) {
        setModalOpen(false)
        setPaintingToolModalOpen(true)
      } else if (offsetX >= 240 && offsetX <= 360) {
        setModalOpen(false)
        setColorPickerModalOpen(true)
      }
    }
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: "15px" }}>
      { gesture !== 'defaultGesture' ? <PointerTag style={{ left: offset.offsetX+420, top: offset.offsetY+15 }}
        src= { gesture === 'indexGesture' ? '/icons/pointer.png' : gesture === 'palmGesture' ? '/icons/backhand.png' : `/icons/paintingTool_${strokeTextureIndex}.png` } /> : null}
      <CanvasProvider loadedPainting={props.loadedPainting} textures={textures} isCamOn={isCamOn} offset={offset} gesture={gesture}
        strokeColorIndex={strokeColorIndex} strokeTextureIndex={strokeTextureIndex} strokeLineWidthIndex={strokeLineWidthIndex} width={500} height={550} partIndex={partIndex} animal={animal} isDone={isDone}>
        <PaintingToolModalComponent modalOpen={paintingToolModalOpen} setPaintingToolModalOpen={setPaintingToolModalOpen} motionTextureIndex={strokeTextureIndex} offset={offset} gesture={gesture}
          changeStrokeTexture={changeStrokeTexture} changeStrokeLineWidthIndex={changeStrokeLineWidthIndex} onClick={() => setModalOpen(false)} />
        <ColorPickerModalComponent modalOpen={colorPickerModalOpen} setColorPickerModalOpen={setColorPickerModalOpen} offset={offset} gesture={gesture}
          strokeColorIndex={strokeColorIndex} changeStrokeColor={changeStrokeColor} onClick={() => setModalOpen(false)} />
        <div style={{ display: 'flex' }}>
          <>
            <div style={{ position: 'absolute' }}>
              {dictionaryPaintingList.map((paintingInfo, index) => {
                console.log(animal.name+'-'+paintingInfo.part)
                return <img key={index}
                className={ isDone ? animal.name+'-'+paintingInfo.part : null }
                  style={{ position: 'absolute', width: '500px', pointerEvents: 'none', zIndex: -2 }} src={paintingInfo.url}></img>
              })}
            </div>
            <CanvasComponent style={{ zIndex: '5'}} width={500} /> 
            { partIndex < animal.parts.length ?
              <img style={{ position: 'absolute', opacity: '0.1', pointerEvents: 'none', width: '500px' }} src={`/images/${animal.name}/${animal.name}_${animal.parts[partIndex]?.name}.svg`}></img>
              : null }
          </>
          <PaintingGuideTag>
          { partIndex < animal.parts.length ? <>{animal.parts[partIndex]?.name_ko} 그려주세요</> : <> 짜잔, 완성했어요!</>}
          </PaintingGuideTag>
        </div>
        <div style={{ display: 'flex' }}>
        {/* <SaveCanvasButton /> */}
          {/* <ChangeStrokeStyleButton />
          <ClearCanvasButton />
          <AddObjectButton />
          <ChangeLineWidthBar /> */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '1060px', marginTop: "10px" }}>
            <PaintingToolTag onClick={handleClickPaintingToolButton}><img style={{width: "130px", height: "130px"}} src='/icons/paintingTools.png'></img></PaintingToolTag>
            <PaintingToolTag onClick={handleClickColorPickerButton}><img style={{width: "130px", height: "130px"}} src='/icons/colorPicker.png'></img></PaintingToolTag>
            <ClearCanvasButton />
            { isCamOn ? <MotionDetectionComponent setIsCamOn={setIsCamOn} canvasWidth={(1100+200)*2} canvasHeight={(550+200)*2} setOffset={setOffset} setGesture={setGesture} handleSelectTool={handleSelectTool} />
              : <PaintingToolTag onClick={() => setIsCamOn(true)}><img src='/icons/videoicon.svg'></img></PaintingToolTag> }
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <LetterButtonBack style={{ marginTop: "0px", marginLeft: "0px", height: "60px", fontSize: '55px' }} onClick={handleClickCloseButton}>닫기</LetterButtonBack>
              <LetterButtonGo style={{ marginTop: "10px", marginLeft: "0px", height: "60px", fontSize: '55px' }} onClick={handleClickNextButton}>{ partIndex < animal.parts.length ? '다음' : '완료' }</LetterButtonGo>
            </div>
          </div>
        </div>
      </CanvasProvider>
    </div>
  );
}

export default CreatePaintingPage