import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from  'react-router-dom'
import { ParentInfo, ParentTitle, ProfileBlock, JuaBrown, JuaBrownLight, LogoTag, EditProfileButtonTag, LightButton250, OrangeButton250 } from '../Style/Components'

import { useRecoilState } from 'recoil'
import { profileState, parentActiveState } from '../store/atoms'
import { useReportCallback } from '../Functions/useReportCallback'


function ReportPage() {
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [parentActive, setParentActive] = useRecoilState(parentActiveState)
  const { getDailyEmotionCallback } = useReportCallback()
  const [age, setAge] = useState(new Date().getFullYear() - new Date(profileInfo.birthday).getFullYear() + 1)
  const [selectedTab, setSelectedTab] = useState(0)

  useEffect(() => {
    getDailyEmotionCallback(profileInfo.name, '2022-10-04')
  }, [])
  
  const handleClickParentButton = () => {
  }

  const handleClickChangeTab = (index) => {
    setSelectedTab(index)
  }

  return (
    <>
      <ParentTitle style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <img style={{ width: "130px", height: "130px" }} src={`/images/profileImage_${profileInfo.image_num}.svg`} />
          <ParentInfo>
            <JuaBrownLight style={{ fontSize: "32px" }}>{profileInfo.name}<span style={{ fontSize: "32px", color: "gray"}}> | </span>{age}세</JuaBrownLight>
            <JuaBrown style={{ fontSize: "50px" }}>진단 리포트</JuaBrown>
          </ParentInfo>
        </div>
        <EditProfileButtonTag onClick={handleClickParentButton}>프로필 등록</EditProfileButtonTag>
      </ParentTitle>
      <div style={{display: "flex" }}>
        { selectedTab === 0 ? <OrangeButton250 onClick={() => handleClickChangeTab(0)}>일별</OrangeButton250>
          : <LightButton250 onClick={() => handleClickChangeTab(0)}>일별</LightButton250> }
        { selectedTab === 1 ? <OrangeButton250 onClick={() => handleClickChangeTab(1)}>주별</OrangeButton250>
          : <LightButton250 onClick={() => handleClickChangeTab(1)}>주별</LightButton250> }
        { selectedTab === 2 ? <OrangeButton250 onClick={() => handleClickChangeTab(2)}>월별</OrangeButton250>
          : <LightButton250 onClick={() => handleClickChangeTab(2)}>월별</LightButton250> }
        { selectedTab === 3 ? <OrangeButton250 onClick={() => handleClickChangeTab(3)}>전체</OrangeButton250>
          : <LightButton250 onClick={() => handleClickChangeTab(3)}>전체</LightButton250> }
      </div>
      <></>
    </>
  )
}

export default ReportPage