import React, { useRef, useState, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'

import { LetterButtonGo, LetterButtonDel } from '../Style/Components'



export function VideoCaptureComponent({ setVideoFile }) {
  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const [capturing, setCapturing] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])
  const [videoURL, setVideoURL] = useState('')
  

  useEffect(() => {
    handlePreviewVideoOpen()
  }, [recordedChunks])


  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true)
    setRecordedChunks([])
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm'
    })
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    )
    mediaRecorderRef.current.start()
  }, [webcamRef, setCapturing, mediaRecorderRef])

  const handleDataAvailable = useCallback(({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data))
    }
  }, [setRecordedChunks])

  const handleStopCaptureClick = useCallback(() => {
    setCapturing(false)
    mediaRecorderRef.current.stop()
  }, [mediaRecorderRef, webcamRef, setCapturing])

  const handlePreviewVideoOpen = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      setVideoURL(url)
      setVideoFile(blob)
    }
  }, [recordedChunks])

  return (
    <>
      { recordedChunks.length > 0 ? 
        <video style={{ width: 450 }} src={videoURL} type='video/webm' controls={true} /> 
      : <Webcam audio={true} ref={webcamRef} style={{ width: 450, transform: 'scaleX(-1)' }} /> 
      }
      { capturing ?
        <LetterButtonGo style={{margin: "0"}} onClick={handleStopCaptureClick}>중지</LetterButtonGo>
        : 
        <LetterButtonDel style={{margin: "0"}} onClick={handleStartCaptureClick}>녹화</LetterButtonDel> 
      }
    </>
  )
}