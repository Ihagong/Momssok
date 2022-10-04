import React, { useEffect, useState, PureComponent } from 'react'
import { useNavigate, useLocation } from  'react-router-dom'
import { ParentInfo, ParentTitle, ProfileBlock, JuaBrown, JuaBrownLight, LogoTag, EditProfileButtonTag, ReportSelectedTabTag, ReportTabTag, EmotionReportTag } from '../Style/Components'

import { useRecoilState } from 'recoil'
import { profileState, parentActiveState } from '../store/atoms'
import { useReportCallback } from '../Functions/useReportCallback'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';



const data = [
  {
    subject: '행복',
    A: 67,
    B: 42,
    fullMark: 100,
  },
  {
    subject: '슬픔',
    A: 16,
    B: 23,
    fullMark: 100,
  },
  {
    subject: '놀람',
    A: 42,
    B: 30,
    fullMark: 100,
  },
  {
    subject: '불안',
    A: 17,
    B: 24,
    fullMark: 100,
  },
  {
    subject: '분노',
    A: 12,
    B: 21,
    fullMark: 100,
  },
]

function ReportPage() {
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [parentActive, setParentActive] = useRecoilState(parentActiveState)
  const { getDailyEmotionCallback } = useReportCallback()
  const [age, setAge] = useState(new Date().getFullYear() - new Date(profileInfo.birthday).getFullYear() + 1)
  const [selectedTab, setSelectedTab] = useState(0)

  useEffect(() => {
    getDailyEmotionCallback(profileInfo.name, '2022-10-05')
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
          <img style={{ width: '130px', height: '130px' }} src={`/images/profileImage_${profileInfo.image_num}.svg`} />
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
        <EmotionReportTag>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 0 20px 50px' }}>
            <RadarChart cx={200} cy={200} outerRadius={150} width={400} height={350} data={data} style={{ display: 'flex', justifyContent: 'center', margin: '0 0 0 30px' }} >
              <PolarGrid stroke='var(--Brown-Stroke)' />
              <PolarAngleAxis stroke='var(--Brown-Text)' dataKey='subject' />
              <PolarRadiusAxis style={{ fontSize: '24px' }} stroke='var(--Brown-Stroke)' />
              <Radar name='average' dataKey='B' stroke='#82ca9d' fill='#82ca9d' fillOpacity={0.3} />
              <Radar name='date' dataKey='A' stroke='#8884d8' fill='#8884d8' fillOpacity={0.3} />
            </RadarChart>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ margin: '0 0 0 30px', width: '30px', height: '30px', backgroundColor: '#82ca9d99', border: '1px solid #82ca9d' }}></div>
              <div style={{ margin: '0 16px 0 6px', fontSize: '24px' }}>평균</div>
              <div style={{ width: '30px', height: '30px', backgroundColor: '#8884d899', border: '1px solid #8884d8' }}></div>
              <div style={{ margin: '0 0 0 6px', fontSize: '24px' }}>오늘</div>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'end', margin: '30px 30px 30px 0', fontSize: '26px' }}>2020.10.05</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 80px 0 0px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFE27D', width: '120px', height: '120px', borderRadius: '40px', margin: '0 0 30px 0' }}>
                <img style={{ width: '80px' }} src={`icons/happy.svg`}/>
              </div>
              <div>오늘 아이의 가장 높은 감정은</div><br/>
              <div style={{ fontSize: '40px' }}>"행복"입니다.</div><br/>
              <div style={{ fontSize: '26px', color: 'var(--Brown-LightText', margin: '0 0 50px 0' }}>아이에게 고마움을 전해보세요.</div>
            </div>
          </div>
        </EmotionReportTag>
      </div>
    </>
  )
}

export default ReportPage