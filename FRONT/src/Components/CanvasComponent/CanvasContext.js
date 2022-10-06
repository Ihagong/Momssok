import React, { useContext, useRef, useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { drawingDetailState, profileState, dictionaryPaintingState, loadedPaintingInfoState } from '../../store/atoms'
import { usePaintingCallback } from '../../Functions/usePaintingCallback'


const CanvasContext = React.createContext()

export const CanvasProvider = ({ children, textures, offset, gesture, strokeColorIndex, strokeTextureIndex, strokeLineWidthIndex, isCamOn, width, height, partIndex, animal, isDone }) => {
  const { savePaintingCallback, updatePaintingCallback } = usePaintingCallback()

  const [dictionaryPaintingList, setDictionaryPaintingList] = useRecoilState(dictionaryPaintingState)
  const [loadedPaintingInfo, setLoadedPaintingInfo] = useRecoilState(loadedPaintingInfoState)
  const [drawingIsDetail, setDrawingIsDetail] = useRecoilState(drawingDetailState)
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)

  const [isDrawing, setIsDrawing] = useState(false)
  const [isMotionDrawing, setIsMotionDrawing] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [imgSrcs, setImgSrcs] = useState([])
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  
  let loadedPainting = new Image()
  loadedPainting.src = loadedPaintingInfo.drawing_base64

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.strokeStyle = strokeTextureIndex === 3 ? strokeColor[strokeColorIndex]+'06' : strokeColor[strokeColorIndex]
  }, [strokeColorIndex, strokeTextureIndex])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.lineWidth = strokeLineWidth[strokeLineWidthIndex]
  }, [strokeLineWidthIndex])

  useEffect(() => {
    const offsetX = offset.offsetX
    const offsetY = offset.offsetY
    if (gesture === 'indexGesture') {
      if (offsetY >= 600 && offsetY <= 670 && offsetX >= 480 && offsetX < 550) {
        clearCanvas()
      }
    }
  }, [offset, gesture])
  
  useEffect(() => {
    if (gesture === 'fistGesture') {
      startMotionDrawing()
    }
    else {
      finishMotionDrawing()
    }
  }, [gesture])

  useEffect(() => {
    if (gesture === 'fistGesture') {
      motionDraw()
    }
  }, [offset])

  useEffect(() => {
    setDictionaryPaintingList([])
  }, [])

  useEffect(() => {
    if (partIndex) {
      addPart()
    }
  }, [partIndex, isDone])
  
  const strokeColor = [
    '#121212', '#F88484', '#EB2C37', '#EB8C35', '#FEED01', '#94C120', '#0C8E36',
    '#F6F6F6', '#747474', '#7E4319', '#F6C4A8', '#882BA8', '#0665C4', '#74BBEE'
  ]

  const strokeLineWidth = [5, 10, 15, 20, 30]

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = width * 2
    canvas.height = height * 2
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const context = canvas.getContext('2d')
    context.scale(2, 2)
    context.lineCap = 'round'
    context.strokeStyle = strokeColor[strokeColorIndex]
    context.lineWidth = strokeLineWidth[strokeLineWidthIndex]
    contextRef.current = context
    
    if (animal) {
      setLoadedPaintingInfo({})
    } else if (loadedPainting) {
      context.drawImage(loadedPainting, 0, 0, 2200, 1100, 0, 0, 1100, 550)
    }
  }

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }
  
  const startMotionDrawing = () => {
    const { offsetX, offsetY } = offset
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsMotionDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const finishMotionDrawing = () => {
    contextRef.current.closePath()
    setIsMotionDrawing(false)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || isDone) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    const lineWidth = contextRef.current.lineWidth
    if (strokeTextureIndex === 1 || strokeTextureIndex === 2) {
      // x시작 좌표, y 시작 좌표, 가로 크기, 세로 크기, 그림 x 위치, 그림 y 위치, 그림 가로 크기, 그림 세로 크기
      contextRef.current.drawImage(textures[strokeTextureIndex-1][strokeColorIndex], 0, 0, 1100, 550, offsetX-(lineWidth/4)-10, offsetY-(lineWidth/4)-15, lineWidth*6, lineWidth*3)
    } else if (strokeTextureIndex === 4) {
      contextRef.current.clearRect(offsetX-(lineWidth/4), offsetY-(lineWidth/4), lineWidth, lineWidth)
    } else {
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.stroke()
    }
  }

  const motionDraw = () => {
    if (!isMotionDrawing || isDone) {
      return
    }
    const { offsetX, offsetY } = offset
    const lineWidth = contextRef.current.lineWidth
    if (strokeTextureIndex === 1 || strokeTextureIndex === 2) {
      // x시작 좌표, y 시작 좌표, 가로 크기, 세로 크기, 그림 x 위치, 그림 y 위치, 그림 가로 크기, 그림 세로 크기
      contextRef.current.drawImage(textures[strokeTextureIndex-1][strokeColorIndex], 0, 0, 1100, 550, offsetX-(lineWidth/4)-10, offsetY-(lineWidth/4)-15, lineWidth*6, lineWidth*3)
    } else if (strokeTextureIndex === 4) {
      contextRef.current.clearRect(offsetX-(lineWidth/4), offsetY-(lineWidth/4), lineWidth, lineWidth)
    } else {
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.stroke()
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    if (loadedPaintingInfo?.drawing_id) {
      context.drawImage(loadedPainting, 0, 0, 2200, 1100, 0, 0, 1100, 550)
    }
  }

  const changeLineWidth = (lineWidth) => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.lineWidth = lineWidth
  }
  
  const saveCanvas = () => {
    const canvas = canvasRef.current
    const image = canvas.toDataURL()
    const link = document.createElement('a')
    link.href = image
    link.download = 'MyPainting'
    link.click()
  }
  
  const savePainting = () => {
    const canvas = canvasRef.current
    const imageURL = canvas.toDataURL()

    if (drawingIsDetail === true) {
      setDrawingIsDetail(false)
      updatePaintingCallback(loadedPaintingInfo?.drawing_id, profileInfo.name, imageURL)
    } else {
      savePaintingCallback(imageURL, profileInfo.name)
    }
    setLoadedPaintingInfo({})
    loadedPainting = new Image()
  }

  const addObject = () => {
    const canvas = canvasRef.current
    const image = new Image()
    image.src = canvas.toDataURL()
    
    const saveCanvas = document.getElementById('save_canvas')
    const saveCanvasCtx = saveCanvas.getContext('2d')
    saveCanvas.width = 100
    saveCanvas.height = 100
    saveCanvasCtx.drawImage(image, 0, 0, 100, 100, 0, 0, 100, 100)  // x시작 좌표, y 시작 좌표, 가로 크기, 세로 크기, 그림 x 위치, 그림 y 위치, 그림 가로 크기, 그림 세로 크기
    
    const imgSrc = saveCanvas.toDataURL()
    setImgSrcs(prev => [...prev, imgSrc])
  }

  const addPart = () => {
    const canvas = canvasRef.current
    const image = new Image()
    image.src = canvas.toDataURL()
    const part = animal.parts[imageIndex].name
    setImageIndex(imageIndex+1)
    const imageInfo = {
      image,
      part,
      url: canvas.toDataURL(),
    }
    setDictionaryPaintingList(prev => [...prev, imageInfo])
    clearCanvas()
    console.log('add', animal.parts[imageIndex].name)
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        saveCanvas,
        savePainting,
        addObject,
        changeLineWidth,
        draw,
        imgSrcs,
      }}
    >
      {children}
    {/* <canvas
      id='save_canvas'
      style={{
        visibility: 'hidden',
      }}
    ></canvas> */}
    </CanvasContext.Provider>
  )
}

export const useCanvas = () => useContext(CanvasContext)