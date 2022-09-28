import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { totalLetterListState, profileInfoState } from '../store/atoms'
import { useLetterCallback } from '../Functions/useLetterCallback'

import "../App.css"
import LetterListComponent from '../Components/LetterListComponent'
import { LetterPageHeader, BrownText100, LightButton120, BrownLightButton150 } from '../Style/Components'

const LetterPage = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState('')
  const [letterList, setLetterList] = useRecoilState(totalLetterListState)
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState)

  const { letterInfoCallback } = useLetterCallback()

  setProfile(profileInfo["name"])
  letterInfoCallback(profile)

  return (
    <div className='LetterPageHome'>
      
      <LetterPageHeader>
        <LightButton120 onClick={() => navigate("/child")}>닫기</LightButton120>
        <BrownLightButton150 onClick={() => navigate("/letter/create")}>새 편지</BrownLightButton150>
        <BrownText100>편지 읽기</BrownText100>

      </LetterPageHeader>
      <LetterListComponent letterList={letterList} />
    </div>

  )
}

export default LetterPage