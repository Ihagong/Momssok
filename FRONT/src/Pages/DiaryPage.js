import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { profileState } from '../store/atoms'

import "../App.css"
import { DiaryBlock, DiaryContent, ChildProfileTag, LetterPageHeader, BrownText100, LightButton120 } from '../Style/Components'


function DiaryPage() {
  const navigate = useNavigate()
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)


  const handleClickChildProfile = () => {
    navigate('/profile')
  }


  return (
    <div className='LetterPageHome'>
      <LetterPageHeader>
        <div style={{display: "flex", alignItems: "center", marginLeft: "10px" }}>
          <LightButton120 onClick={() => navigate("/child")}>닫기</LightButton120>
          <BrownText100>일기 쓰기</BrownText100>
        </div>
        <ChildProfileTag style={{marginTop: "30px", marginRight: "40px"}} onClick={handleClickChildProfile}><img src={`/images/profileImage_${profileInfo.image_num}.svg`} />{profileInfo.name}</ChildProfileTag>
      </LetterPageHeader>
      <DiaryContent>
        <DiaryBlock onClick={() => navigate("/diary/create")}>
          <img style={{width: "100px", height: "100px"}} src='/icons/plus_brown.svg' />
        </DiaryBlock>
      </DiaryContent>
    </div>
  )
}

export default DiaryPage