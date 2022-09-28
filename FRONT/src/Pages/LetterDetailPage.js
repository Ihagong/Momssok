import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { totalLetterListState } from '../store/atoms'
import LetterEditorComponent from '../Components/LetterEditorComponent'



function LetterDetailPage() {
  const navigate = useNavigate()
  const [originData, setOriginData] = useState()
  const { letterId } = useParams()
  
  const [letterList, setLetterList] = useRecoilState(totalLetterListState)

  useEffect(() => {
    if (letterList.length >= 1) {
      const targetLetter = letterList.find(
        (it) => parseInt(it.letterId) === parseInt(letterId)
      )
      if (targetLetter) {
        setOriginData(targetLetter)
      } else {
        alert("존재하지 않은 편지 입니다.")
        navigate("/letter", { replace: true })
      }
    } 
  }, [letterId, letterList])
  return (
    <div>
      {originData && <LetterEditorComponent isDetail={true} originData={originData} />}
    </div>
  )
}

export default LetterDetailPage