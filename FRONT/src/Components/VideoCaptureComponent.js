import React, { useRef, useState, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'


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
    mediaRecorderRef.current.stop()
    setCapturing(false)
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
      <Webcam audio={false} ref={webcamRef} style={{ width: 200, transform: 'scaleX(-1)' }} />
      { capturing ?
        <button onClick={handleStopCaptureClick}>녹화 중지</button>
        : <button onClick={handleStartCaptureClick}>녹화 시작</button> }
      { recordedChunks.length > 0 ? <video style={{ width: 200 }}src={videoURL} type='video/webm' controls={true} /> : null }
    </>
  )
}