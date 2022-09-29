import React, { useContext, useRef, useState, useEffect } from 'react'
// import { Hands } from '@mediapipe/hands'
import * as HANDS from '@mediapipe/hands'
// import * as cam from '@mediapipe/camera_utils'
// import Webcam from 'react-webcam'


const CanvasContext = React.createContext()

export const CanvasProvider = ({ children, loadedPainting, textures, strokeColorIndex, strokeTextureIndex, strokeLineWidthIndex }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [gesture, setGesture] = useState('defaultGesture')
  const [offset, setOffset] = useState({offsetX: 0, offsetY: 0})
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
    contextRef.current.lineTo(offsetX, offsetY)
    if (strokeTextureIndex === 1 || strokeTextureIndex === 2) {
      const lineWidth = contextRef.current.lineWidth
      // x시작 좌표, y 시작 좌표, 가로 크기, 세로 크기, 그림 x 위치, 그림 y 위치, 그림 가로 크기, 그림 세로 크기
      contextRef.current.drawImage(textures[strokeTextureIndex-1][strokeColorIndex], 0, 0, 1100, 550, offsetX-(lineWidth/4), offsetY-(lineWidth/4), lineWidth*6, lineWidth*3)
    } else {
      contextRef.current.stroke()
    }
  }

  const motionDraw = () => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = offset
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
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

  const webcamRef = useRef(null)
  const camCanvasRef = useRef(null)
  const connect = window.drawConnectors
  const drawLandmarks = window.drawLandmarks
  var camera = null
  function onResults(results) {
    // const video = webcamRef.current.video
    const videoWidth = webcamRef.current.video.videoWidth
    const videoHeight = webcamRef.current.video.videoHeight

    // Set canvas width
    camCanvasRef.current.width = videoWidth
    camCanvasRef.current.height = videoHeight

    const canvasElement = camCanvasRef.current
    const canvasCtx = canvasElement.getContext('2d')
    
    canvasCtx.save()
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height)

    const canvas = canvasRef.current

    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        connect(canvasCtx, landmarks, HANDS.HAND_CONNECTIONS,
                      {color: '#00FF00', lineWidth: 5})
        drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2})
        
        if (landmarks[8].y < landmarks[7].y) {
          setGesture('upGesture')
          setOffset({offsetX: Math.ceil((1-landmarks[8].x)*(canvas.width/2)), offsetY: Math.ceil(landmarks[8].y*(canvas.height/2))})
        }
        else {
          setGesture('downGesture')
        }
      }
    }
    canvasCtx.restore()
  }

  // useEffect(() => {

  //   const hands = new Hands({locateFile: (file) => {
  //     return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
  //   }})

  //   hands.setOptions({
  //     maxNumHands: 2,
  //     modelComplexity: 1,
  //     minDetectionConfidence: 0.5,
  //     minTrackingConfidence: 0.5
  //   })

  //   hands.onResults(onResults)

  //   if (
  //     typeof webcamRef.current !== 'undefined' &&
  //     webcamRef.current !== null
  //   ) {
  //     camera = new cam.Camera(webcamRef.current.video, {
  //       onFrame: async () => {
  //         await hands.send({ image: webcamRef.current.video })
  //       },
  //       width: 640,
  //       height: 480,
  //     })
  //     camera.start()
  //   }
  // }, [])

  // const handleClickPainting = () => {

  //   const canvas = canvasRef.current
  //   const context = canvas.getContext('2d')
  //   context.drawImage(drawCanvasImage, 0, 0, 2200, 1100, 0, 0, 1100, 550)
  // }

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
    {/* <button onClick={handleClickPainting}>불러오기</button> */}
    {/* <Webcam
      ref={webcamRef}
      style={{
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: 'center',
        zindex: 9,
        width: 128,
        height: 96,
      }}
    />{' '} */}
    {/* <canvas
      ref={camCanvasRef}
      className='output_canvas'
      id='output_canvas'
      style={{
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: 'center',
        zindex: 9,
        width: 128,
        height: 96,
      }}
    ></canvas> */}
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