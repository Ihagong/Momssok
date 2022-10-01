import React, { useState } from 'react'

import { useNavigate } from  'react-router-dom'

import { useRecoilState } from 'recoil'
import { profileListState, profileState } from '../store/atoms'

import { ParentInfo, ParentTitle, ProfileEditFooter, ProfileChildren, ProfileFooter, ProfileBlock, ProfileTitle, JuaOrange, JuaBrown, JuaBrownLight, AddProfileButtonTag, AddProfileTextTag, ButtonTag3, LogoTag, EditProfileButtonTag, ParentMenuButtonTag } from '../Style/Components'


function ParentMainPage() {
  const navigate = useNavigate()
  const [profileList, setProfileList] = useRecoilState(profileListState)
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [age, setAge] = useState(new Date().getFullYear() - new Date(profileInfo.birthday).getFullYear() + 1)
  console.log(profileList)

  const handleClickReportButton = () => {
  }

  const handleClickRecordButton = () => {
  }

  const handleClickPromiseButton = () => {
    navigate('/promise')
  }

  const handleClickLetterButton = () => {
    navigate('/letter')
  }

  const handleClickParentButton = () => {
    navigate('/profile/manage')
  }

  return (
    <div>
      <ParentTitle>
        <img style={{ width: "130px", height: "130px" }} src={`/images/profileImage_${profileInfo.image_num}.svg`} />
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
        <ParentMenuButtonTag onClick={handleClickRecordButton}>
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