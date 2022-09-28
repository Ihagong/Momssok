import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { totalLetterListState } from '../store/atoms'

import "../App.css"
import LetterListComponent from '../Components/LetterListComponent'
import { LetterPageHeader, BrownText100, LightButton120, BrownLightButton150 } from '../Style/Components'

const LetterPage = () => {
  const navigate = useNavigate()
  const [letterList, setLetterList] = useRecoilState(totalLetterListState)

  const filterList = letterList.filter((it) => it.receiver === "찬석이")


  return (
    <div className='LetterPageHome'>
      
      <LetterPageHeader>
        <LightButton120 onClick={() => navigate("/child")}>닫기</LightButton120>
        <BrownLightButton150 onClick={() => navigate("/letter/create")}>새 편지</BrownLightButton150>
        <BrownText100>편지 읽기</BrownText100>

      </LetterPageHeader>
      <LetterListComponent letterList={filterList} />
    </div>

  )
}

export default LetterPage