import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from  'react-router-dom'

import { ParentInfo, ParentTitle, ProfileBlock, JuaBrown, JuaBrownLight, LogoTag, EditProfileButtonTag, ParentMenuButtonTag } from '../Style/Components'

import { useRecoilState } from 'recoil'
import { parentActiveState, userInfoState, profileListState, profileState } from '../store/atoms'

function ParentMainPage() {
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [profileList, setProfileList] = useRecoilState(profileListState)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [parentActive, setParentActive] = useRecoilState(parentActiveState)


  const navigate = useNavigate()
  // const { state } = useLocation()

  // const [name, useName] = useState(state.name)
  // const [imageNum, setImageNum] = useState(parseInt(state.image_num))
  const [age, setAge] = useState(new Date().getFullYear() - new Date(profileInfo.birthday).getFullYear() + 1)
  

  // useEffect(() => {
  //   const info = profileList.filter((it) => it.is_parent === true )
  //   setParentInfo(info[0])
  // }, [profileList])

  const handleClickReportButton = () => {
    navigate('/report')
  }

  const handleClickActivityRecordButton = () => {
    navigate('/activity')
  }

  const handleClickPromiseButton = () => {
    navigate('/promise')
  }

  const handleClickLetterButton = () => {
    setParentActive(true)
    navigate('/letter')
  }

  const handleClickParentButton = () => {
    navigate('/profile/manage')
  }

  return (
    <div>
      <ParentTitle>
        <img onClick={() => navigate('/profile/manage')} style={{ width: "130px", height: "130px", cursor: 'pointer' }} src={`/images/profileImage_${profileInfo.image_num}.svg`} />
        <ParentInfo>
          <JuaBrown style={{ fontSize: "50px" }}>{profileInfo.name}
            <span style={{ fontSize: "50px", color: "gray"}}> | </span>
            {age}세
          </JuaBrown>
          <JuaBrownLight style={{ fontSize: "22px" }}>다른 프로필로 변경하거나 신규 프로필을 수정하고 신규로 등록할 수 있어요!</JuaBrownLight>
        </ParentInfo>
        <EditProfileButtonTag onClick={handleClickParentButton}>프로필 등록/변경</EditProfileButtonTag>
      </ParentTitle>
      <hr />
      <ProfileBlock>
        <ParentMenuButtonTag onClick={handleClickReportButton}>
          <h4>진단 리포트</h4>
          <p>아이의 감정 분석 결과가</p>
          <p>궁금하다면?</p>
          <LogoTag src='icons/report.svg' />
        </ParentMenuButtonTag>
        <ParentMenuButtonTag onClick={handleClickActivityRecordButton}>
          <h4>활동 내역</h4>
          <p>아이의 활동 내역이</p>
          <p>궁금하다면?</p>
          <LogoTag src='icons/drawicon.svg' />
        </ParentMenuButtonTag>
        <ParentMenuButtonTag onClick={handleClickPromiseButton}>
          <h4>약속 관리</h4>
          <p>아이와의 약속을</p>
          <p>관리하세요!</p>
          <LogoTag src='icons/promise.svg' />
        </ParentMenuButtonTag>
        <ParentMenuButtonTag onClick={handleClickLetterButton}>
          <h4>편지함</h4>
          <p>아이와 주고받는 편지를</p>
          <p>관리하세요!</p>
          <LogoTag src='icons/mailbox.svg' />
        </ParentMenuButtonTag>
      </ProfileBlock>
    </div>
  );
}

export default ParentMainPage