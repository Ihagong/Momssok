import React, { useContext, useRef, useState, useEffect } from 'react'
import { Hands } from '@mediapipe/hands'
import * as HANDS from '@mediapipe/hands'
import * as cam from '@mediapipe/camera_utils'
import Webcam from 'react-webcam'


const CanvasContext = React.createContext()

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [gesture, setGesture] = useState('defaultGesture')
  const [offset, setOffset] = useState({offsetX: 0, offsetY: 0})
  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    const context = canvas.getContext('2d')
    context.scale(2, 2)
    context.lineCap = 'round'
    context.strokeStyle = '#000000'
    context.lineWidth = 3
    contextRef.current = context
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
    contextRef.current.stroke()
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
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  const changeStrokeStyle = (color) => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.strokeStyle = color
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
    const canvasCtx = canvasElement.getContext("2d")
    
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
  // }

  // setInterval(())
  useEffect(() => {

    const hands = new Hands({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    }})

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    })

    hands.onResults(onResults)

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webcamRef.current.video })
        },
        width: 640,
        height: 480,
      })
      camera.start()
    }
  }, [])

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

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        changeStrokeStyle,
        clearCanvas,
        saveCanvas,
        changeLineWidth,
        draw,
      }}
    >
    <Webcam
      ref={webcamRef}
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 9,
        width: 128,
        height: 96,
      }}
    />{" "}
    <canvas
      ref={camCanvasRef}
      className="output_canvas"
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 9,
        width: 128,
        height: 96,
      }}
    ></canvas>
      {children}
      <p>fasdf{children.gesture}</p>
    </CanvasContext.Provider>
  )
}

export const useCanvas = () => useContext(CanvasContext)