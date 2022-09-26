import React, { useContext, useRef, useState, useEffect } from 'react'
import { Hands } from '@mediapipe/hands'
import * as HANDS from '@mediapipe/hands'
import * as cam from '@mediapipe/camera_utils'
import Webcam from 'react-webcam'


export function MotionDetectionComponent({ canvasWidth, canvasHeight, setOffset, setGesture }) {
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
        
        if (landmarks[8].y < landmarks[7].y) {
          setGesture('upGesture')
          setOffset({ offsetX: Math.ceil((1-landmarks[8].x)*(canvasWidth/2)), offsetY: Math.ceil(landmarks[8].y*(canvasHeight/2)) })
        }
        else {
          setGesture('downGesture')
        }
      }
    }
    canvasCtx.restore()
  }

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
      typeof webcamRef.current !== 'undefined' &&
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

  return (
    <>
      <Webcam
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
      />{' '}
      <canvas
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
      ></canvas>
    </>
  )
}