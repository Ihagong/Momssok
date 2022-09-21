import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { loadedPaintingState } from '../store/atoms'


function LoadPaintingPage() {
  const [loadedPaintingSrc, setLoadedPaintingSrc] = useRecoilState(loadedPaintingState)

  const navigate = useNavigate();

  const handleChangeFile = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('painting', e.target.files[0])
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    
    return new Promise((resolve) => {
      reader.onload = () => {
        setLoadedPaintingSrc(reader.result)
        resolve()
        
        navigate('/painting/create')
      }
    })
  }

  return (
    <>
      <input type='file' accept='image/*' onChange={(e) => handleChangeFile(e)} />
    </>
  );
}

export default LoadPaintingPage