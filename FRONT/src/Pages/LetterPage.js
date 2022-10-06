import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { totalLetterListState, profileState, parentActiveState, userInfoState } from '../store/atoms'
import { useLetterCallback } from '../Functions/useLetterCallback'

import "../App.css"
import LetterListComponent from '../Components/LetterListComponent'
import { ChildProfileTag, LetterPageHeader, BrownText100, LightButton120, BrownLightButton150 } from '../Style/Components'


const LetterPage = () => {
  const navigate = useNavigate()
  const [letterList, setLetterList] = useRecoilState(totalLetterListState)
  const [parentActive, setParentActive] = useRecoilState(parentActiveState)
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const { letterInfoCallback } = useLetterCallback()

  const handleClickChildProfile = () => {
    if (parentActive) {
      navigate('/profile/manage')
    } else {
      navigate('/profile')
    }
  }

  useEffect(() => {
    letterInfoCallback(parentActive ? userInfo.username : profileInfo.name)
  }, [])


  const handleClickCloseButton = () => {
    if (parentActive) {
      navigate('/parent')
    } else {
      navigate('/child')
    }
  }

  return (
    <div className='LetterPageHome'>
      
      <LetterPageHeader>
        <div style={{display: "flex", alignItems: "center", marginLeft: "10px" }}>
          <LightButton120 onClick={handleClickCloseButton}>닫기</LightButton120>
          <BrownLightButton150 onClick={() => navigate("/letter/create")}>새 편지</BrownLightButton150>
          <BrownText100>편지 읽기</BrownText100>
        </div>
        { parentActive ? 
          <ChildProfileTag style={{marginTop: "30px", marginRight: "40px"}} onClick={handleClickChildProfile}><img src={`/images/parenticon.svg`} />{userInfo.username}</ChildProfileTag>
        : <ChildProfileTag style={{marginTop: "30px", marginRight: "40px"}} onClick={handleClickChildProfile}><img src={`/images/profileImage_${profileInfo.image_num}.svg`} />{profileInfo.name}</ChildProfileTag>
        }
      </LetterPageHeader>
      <LetterListComponent letterList={letterList} />
    </div>

  )
}

export default LetterPage