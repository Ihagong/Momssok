import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import "../App.css"
import { LetterStateContext } from '../App'
import LetterListComponent from '../Components/LetterListComponent'
import { LetterPageHeader, BrownText100, LightButton120 } from '../Style/Components'

const LetterPage = () => {
  const navigate = useNavigate()
  const letterList = useContext(LetterStateContext)

  const filterList = letterList.filter((it) => it.receiver === "다은이")


  return (
    <div className='LetterPageHome'>
      
      <LetterPageHeader>
        <LightButton120 onClick={() => navigate(-1)}>닫기</LightButton120>
        <LightButton120 onClick={() => navigate("/letter/create")}>새 편지</LightButton120>
        <BrownText100>편지 읽기</BrownText100>

      </LetterPageHeader>
      <LetterListComponent letterList={filterList} />
    </div>

  )
}

export default LetterPage