import React, { useEffect, useState, PureComponent } from 'react'
import { useNavigate, useLocation } from  'react-router-dom'
import { ParentInfo, ParentTitle, ProfileBlock, JuaBrown, JuaBrownLight, LogoTag, EditProfileButtonTag, ReportSelectedTabTag, ReportTabTag, EmotionReportTag } from '../Style/Components'

import { useRecoilState } from 'recoil'
import { profileState, parentActiveState, dailyEmotionObjectState } from '../store/atoms'
import { useReportCallback } from '../Functions/useReportCallback'

import { ReportDailyComponent } from '../Components/ReportDailyComponent'
import { ReportWeeklyComponent } from '../Components/ReportWeeklyComponent'
import { ReportMonthlyComponent } from '../Components/ReportMonthlyComponent'
import { ReportWordCloudComponent } from '../Components/ReportWordCloudComponent'


function ReportPage() {
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [parentActive, setParentActive] = useRecoilState(parentActiveState)
  const [dailyEmotionObject, setDailyEmotionObject] = useRecoilState(dailyEmotionObjectState)
  const { getDailyEmotionCallback, getWeeklyEmotionCallback, getMonthlyEmotionCallback } = useReportCallback()
  const [age, setAge] = useState(new Date().getFullYear() - new Date(profileInfo.birthday).getFullYear() + 1)
  const [selectedTab, setSelectedTab] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    getDailyEmotionCallback(profileInfo.name, '2022-10-06')
    getWeeklyEmotionCallback(profileInfo.name, '2022-10-06')
    getMonthlyEmotionCallback(profileInfo.name, '2022-10-06')
  }, [])
  
  const handleClickParentButton = () => {
    navigate('/profile/manage')
  }

  const handleClickChangeTab = (index) => {
    setSelectedTab(index)
  }

  const emotionColor = (emotion) => {
    let result = '#FDFDFD'
    if (emotion === '행복') {
      result = '#FFE27D'
    } else if (emotion === '슬픔') {
      result = '#7DC1FF'
    } else if (emotion === '놀람') {
      result = '#A6EFCC'
    } else if (emotion === '불안') {
      result = '#C6A6EF'
    } else if (emotion === '분노') {
      result = '#F8899D'
    }
    return result
  }

  const emotionName = (emotion) => {
    let result = ''
    if (emotion === '행복') {
      result = 'happy'
    } else if (emotion === '슬픔') {
      result = 'sad'
    } else if (emotion === '놀람') {
      result = 'surprised'
    } else if (emotion === '불안') {
      result = 'anxious'
    } else if (emotion === '분노') {
      result = 'angry'
    }
    return result
  }

  return (
    <>
      <ParentTitle style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex' }}>
          <img onClick={() => navigate('/parent')} style={{ width: "130px", height: "130px", cursor: 'pointer' }} src={`/images/profileImage_${profileInfo.image_num}.svg`} />
          <ParentInfo>
            <JuaBrownLight style={{ fontSize: '32px' }}>{profileInfo.name}<span style={{ fontSize: '32px', color: 'gray'}}> | </span>{age}세</JuaBrownLight>
            <JuaBrown style={{ fontSize: '50px' }}>진단 리포트</JuaBrown>
          </ParentInfo>
        </div>
        <EditProfileButtonTag onClick={handleClickParentButton}>프로필 변경</EditProfileButtonTag>
      </ParentTitle>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{display: 'flex' }}>
          { selectedTab === 0 ? <ReportSelectedTabTag onClick={() => handleClickChangeTab(0)}>오늘</ReportSelectedTabTag>
            : <ReportTabTag onClick={() => handleClickChangeTab(0)}>오늘</ReportTabTag> }
          { selectedTab === 1 ? <ReportSelectedTabTag onClick={() => handleClickChangeTab(1)}>이번 주</ReportSelectedTabTag>
            : <ReportTabTag onClick={() => handleClickChangeTab(1)}>이번 주</ReportTabTag> }
          { selectedTab === 2 ? <ReportSelectedTabTag onClick={() => handleClickChangeTab(2)}>이번 달</ReportSelectedTabTag>
            : <ReportTabTag onClick={() => handleClickChangeTab(2)}>이번 달</ReportTabTag> }
          { selectedTab === 3 ? <ReportSelectedTabTag onClick={() => handleClickChangeTab(3)}>태그</ReportSelectedTabTag>
            : <ReportTabTag onClick={() => handleClickChangeTab(3)}>태그</ReportTabTag> }
        </div>
        { dailyEmotionObject ? 
          <>
            { selectedTab === 0 ? <ReportDailyComponent emotionColor={emotionColor} emotionName={emotionName} /> : null }
            { selectedTab === 1 ? <ReportWeeklyComponent emotionColor={emotionColor} emotionName={emotionName} /> : null }
            { selectedTab === 2 ? <ReportMonthlyComponent emotionColor={emotionColor} emotionName={emotionName} /> : null }
            { selectedTab === 3 ? <ReportWordCloudComponent emotionColor={emotionColor} emotionName={emotionName} /> : null }
          </>
        : <EmotionReportTag style={{ justifyContent: 'center' }}>아직 데이터가 없습니다.</EmotionReportTag> }
      </div>
    </>
  )
}

export default ReportPage