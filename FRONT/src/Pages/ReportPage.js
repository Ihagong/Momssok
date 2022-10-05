import React, { useEffect, useState, PureComponent } from 'react'
import { useNavigate, useLocation } from  'react-router-dom'
import { ParentInfo, ParentTitle, ProfileBlock, JuaBrown, JuaBrownLight, LogoTag, EditProfileButtonTag, ReportSelectedTabTag, ReportTabTag, EmotionReportTag } from '../Style/Components'

import { useRecoilState } from 'recoil'
import { profileState, parentActiveState } from '../store/atoms'
import { useReportCallback } from '../Functions/useReportCallback'

import { ReportDailyComponent } from '../Components/ReportDailyComponent'
import { ReportWeeklyComponent } from '../Components/ReportWeeklyComponent'
import { ReportMonthlyComponent } from '../Components/ReportMonthlyComponent'
import { ReportWordCloudComponent } from '../Components/ReportWordCloudComponent'


function ReportPage() {
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [parentActive, setParentActive] = useRecoilState(parentActiveState)
  const { getDailyEmotionCallback, getWeeklyEmotionCallback } = useReportCallback()
  const [age, setAge] = useState(new Date().getFullYear() - new Date(profileInfo.birthday).getFullYear() + 1)
  const [selectedTab, setSelectedTab] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    getDailyEmotionCallback(profileInfo.name, '2022-10-06')
    getWeeklyEmotionCallback(profileInfo.name, '2022-10-06')
  }, [])
  
  const handleClickParentButton = () => {
  }

  const handleClickChangeTab = (index) => {
    setSelectedTab(index)
  }

  return (
    <>
      <ParentTitle style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex' }}>
          <img onClick={() => navigate('/profile/manage')} style={{ width: "130px", height: "130px", cursor: 'pointer' }} src={`/images/profileImage_${profileInfo.image_num}.svg`} />
          <ParentInfo>
            <JuaBrownLight style={{ fontSize: '32px' }}>{profileInfo.name}<span style={{ fontSize: '32px', color: 'gray'}}> | </span>{age}세</JuaBrownLight>
            <JuaBrown style={{ fontSize: '50px' }}>진단 리포트</JuaBrown>
          </ParentInfo>
        </div>
        <EditProfileButtonTag onClick={handleClickParentButton}>프로필 등록</EditProfileButtonTag>
      </ParentTitle>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{display: 'flex' }}>
          { selectedTab === 0 ? <ReportSelectedTabTag onClick={() => handleClickChangeTab(0)}>일별</ReportSelectedTabTag>
            : <ReportTabTag onClick={() => handleClickChangeTab(0)}>일별</ReportTabTag> }
          { selectedTab === 1 ? <ReportSelectedTabTag onClick={() => handleClickChangeTab(1)}>주별</ReportSelectedTabTag>
            : <ReportTabTag onClick={() => handleClickChangeTab(1)}>주별</ReportTabTag> }
          { selectedTab === 2 ? <ReportSelectedTabTag onClick={() => handleClickChangeTab(2)}>월별</ReportSelectedTabTag>
            : <ReportTabTag onClick={() => handleClickChangeTab(2)}>월별</ReportTabTag> }
          { selectedTab === 3 ? <ReportSelectedTabTag onClick={() => handleClickChangeTab(3)}>전체</ReportSelectedTabTag>
            : <ReportTabTag onClick={() => handleClickChangeTab(3)}>전체</ReportTabTag> }
        </div>
        { selectedTab === 0 ? <ReportDailyComponent /> : null }
        { selectedTab === 1 ? <ReportWeeklyComponent /> : null }
        { selectedTab === 2 ? <ReportMonthlyComponent /> : null }
        { selectedTab === 3 ? <ReportWordCloudComponent /> : null }
      </div>
    </>
  )
}

export default ReportPage