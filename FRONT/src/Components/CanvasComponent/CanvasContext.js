import React, { useContext, useRef, useState, useEffect } from 'react'


const CanvasContext = React.createContext()

export const CanvasProvider = ({ children, loadedPainting, textures, offset, gesture, strokeColorIndex, strokeTextureIndex, strokeLineWidthIndex, isCamOn }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [imgSrcs, setImgSrcs] = useState([])
  const canvasRef = useRef(null)
  const contextRef = useRef(null)

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
    console.log(offset)
  }, [offset])

  useEffect(() => {
    if (gesture === 'upGesture') {
      startMotionDrawing()
    }
    else {
      finishMotionDrawing()
    }
  }, [gesture])

  useEffect(() => {
    motionDraw()
  }, [offset])
  
  const strokeColor = [
    '#121212', '#F88484', '#EB2C37', '#EB8C35', '#FEED01', '#94C120', '#0C8E36',
    '#F6F6F6', '#74BBEE', '#7E4319', '#F6C4A8', '#882BA8', '#0665C4', '#74BBEE'
  ]

  const strokeLineWidth = [5, 10, 20, 30]

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = 1100 * 2
    canvas.height = 550 * 2
    canvas.style.width = '1100px'
    canvas.style.height = '550px'

    const context = canvas.getContext('2d')
    context.scale(2, 2)
    context.lineCap = 'round'
    context.strokeStyle = strokeColor[strokeColorIndex]
    context.lineWidth = strokeLineWidth[strokeLineWidthIndex]
    contextRef.current = context
    
    context.drawImage(loadedPainting, 0, 0, 2200, 1100, 0, 0, 1100, 550)
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
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const finishMotionDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    if (strokeTextureIndex === 1 || strokeTextureIndex === 2) {
      const lineWidth = contextRef.current.lineWidth
      // x시작 좌표, y 시작 좌표, 가로 크기, 세로 크기, 그림 x 위치, 그림 y 위치, 그림 가로 크기, 그림 세로 크기
      contextRef.current.drawImage(textures[strokeTextureIndex-1][strokeColorIndex], 0, 0, 1100, 550, offsetX-(lineWidth/4), offsetY-(lineWidth/4), lineWidth*6, lineWidth*3)
    } else {
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.stroke()
    }
  }

  const motionDraw = () => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = offset
    if (strokeTextureIndex === 1 || strokeTextureIndex === 2) {
      const lineWidth = contextRef.current.lineWidth
      // x시작 좌표, y 시작 좌표, 가로 크기, 세로 크기, 그림 x 위치, 그림 y 위치, 그림 가로 크기, 그림 세로 크기
      contextRef.current.drawImage(textures[strokeTextureIndex-1][strokeColorIndex], 0, 0, 1100, 550, offsetX-(lineWidth/4), offsetY-(lineWidth/4), lineWidth*6, lineWidth*3)
    } else {
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.stroke()
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
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