import React, { useState } from 'react'

import { useNavigate } from  'react-router-dom'

import { useRecoilState } from 'recoil'
import { profileState } from '../store/atoms'

import { ParentInfo, ParentTitle, ProfileEditFooter, ProfileChildren, ProfileFooter, ProfileBlock, ProfileTitle, JuaOrange, JuaBrown, JuaBrownLight, AddProfileButtonTag, AddProfileTextTag, ButtonTag3, LogoTag, EditProfileButtonTag, ParentMenuButtonTag } from '../Style/Components'


function ParentMainPage() {
  const navigate = useNavigate()
  const [profileName, setProfileName] = useRecoilState(profileState)
  const childInfo = { id: 0, name: '찬석이', birth: '2017.12', age: 6 } // 아이 정보
  const [age, setAge] = useState(new Date().getFullYear() - new Date(profileName.birthday).getFullYear() + 1)


  const handleClickReportButton = () => {
  }

  const handleClickRecordButton = () => {
  }

  const handleClickPromiseButton = () => {
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
        <img style={{ width: "130px", height: "130px" }} src={`/images/profileImage_${profileName.image_num}.svg`} />
        <ParentInfo>
          <JuaBrown style={{ fontSize: "50px" }}>{profileName.name}
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