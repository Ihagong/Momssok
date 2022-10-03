import React, { useContext, useRef, useState, useEffect } from 'react'
import { Hands } from '@mediapipe/hands'
import * as HANDS from '@mediapipe/hands'
import * as cam from '@mediapipe/camera_utils'
import Webcam from 'react-webcam'
import { WebCamTag } from '../../Style/Components'


export function MotionDetectionComponent({ canvasWidth, canvasHeight, setOffset, setGesture, setIsCamOn, handleSelectTool }) {
  const canvasRef = useRef(null)

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
        const offsetX = Math.ceil((1-(landmarks[9].x))*(canvasWidth/2))-100
        const offsetY = Math.ceil((landmarks[9].y)*(canvasHeight/2))
        setOffset({ offsetX, offsetY })
        let gesture = 'defaultGesture'
        if (landmarks[10].y < landmarks[11].y && landmarks[14].y < landmarks[15].y && landmarks[18].y < landmarks[19].y && landmarks[7].y < landmarks[0].y) {
          if (landmarks[6].y < landmarks[7].y) {
            gesture = 'fistGesture'
          } else {
            gesture = 'indexGesture'
          }
        } else {
          gesture = 'palmGesture'
        }
        setGesture(gesture)

        console.log(offsetX, offsetY, (window.innerWidth-1100), window.innerHeight)
        if (gesture === 'indexGesture') {
          handleSelectTool(offsetX, offsetY)
        }
        // if (gesture === 'indexGesture' && offsetY >= 560 && offsetY <= 700) {
        //   if (offsetX >= 60 && offsetX <= 200) {
        //     setToolIndex(0)
        //   } else if (offsetX >= 260 && offsetX <= 400) {
        //     setToolIndex(1)
        //   }
        // }

      }
    }
    canvasCtx.restore()
  }

  useEffect(() => {

    const hands = new Hands({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    }})

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.8,
      minTrackingConfidence: 0.5
    })

    hands.onResults(onResults)

    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webcamRef.current.video })
        },
        width: 960,
        height: 780,
      })
      camera.start()
    }
  }, [])

  return (
    <>
      <WebCamTag onClick={() => setIsCamOn(false)}>
        <Webcam
          ref={webcamRef}
          mirrored={true}
          style={{
            position: 'absolute',
            left: 10,
            textAlign: 'center',
            zindex: 9,
            width: 0,
            height: 0,
          }}
        />
        <canvas
          ref={camCanvasRef}
          className='output_canvas'
          id='output_canvas'
          style={{
            textAlign: 'center',
            zindex: 9,
            width: 160,
            height: 130,
            borderRadius: '10px',
            transform: 'scaleX(-1)',
          }}
        ></canvas>
      </WebCamTag>
    </>
  )
}