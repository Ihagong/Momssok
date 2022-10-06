import React from 'react'
import { EmotionReportTag } from '../Style/Components'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { useRecoilState } from 'recoil'
import { weeklyEmotionObjectState } from '../store/atoms'


const data = [
  {
    subject: '행복',
    '평균': 3,
    '이번 주': 2,
  },
  {
    subject: '슬픔',
    '평균': 1.3,
    '이번 주': 1,
  },
  {
    subject: '놀람',
    '평균': 1.5,
    '이번 주': 2,
  },
  {
    subject: '불안',
    '평균': 0.5,
    '이번 주': 1,
  },
  {
    subject: '분노',
    '평균': 0.7,
    '이번 주': 1,
  },
]

export function ReportWeeklyComponent({ emotionColor, emotionName }) {

  const [weeklyEmotionObject, setWeeklyEmotionObject] = useRecoilState(weeklyEmotionObjectState)
  
  const weeklyEmotionData = () => {
    return (
      [
        {
          subject: '행복',
          '평균': weeklyEmotionObject.average?.['행복'],
          '이번 주': weeklyEmotionObject.thisWeek?.['행복'] ? weeklyEmotionObject.thisWeek?.['행복'] : 0,
        },
        {
          subject: '슬픔',
          '평균': weeklyEmotionObject.average?.['슬픔'],
          '이번 주': weeklyEmotionObject.thisWeek?.['슬픔'] ? weeklyEmotionObject.thisWeek?.['슬픔'] : 0,
        },
        {
          subject: '놀람',
          '평균': weeklyEmotionObject.average?.['놀람'],
          '이번 주': weeklyEmotionObject.thisWeek?.['놀람'] ? weeklyEmotionObject.thisWeek?.['놀람'] : 0,
        },
        {
          subject: '불안',
          '평균': weeklyEmotionObject.average?.['불안'],
          '이번 주': weeklyEmotionObject.thisWeek?.['불안'] ? weeklyEmotionObject.thisWeek?.['불안'] : 0,
        },
        {
          subject: '분노',
          '평균': weeklyEmotionObject.average?.['분노'],
          '이번 주': weeklyEmotionObject.thisWeek?.['분노'] ? weeklyEmotionObject.thisWeek['분노'] : 0,
        },
      ]
    )
  }

  const mostFrequentEmotion = (obj) => {
    return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b)
  }


  const emotionIcon = ({ index, x, y }) => {
    if (index === 0) {
      return (
        <svg x={x-26} y={y+16} width="53" height="30" viewBox="0 0 53 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5 21.5C18.5 32 34 29.5 40.5 21.5" stroke="#4B2920" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="16" cy="3" r="2.5" fill="#4B2920" stroke="#4B2920"/>
          <circle cx="36" cy="3" r="2.5" fill="#4B2920" stroke="#4B2920"/>
          <path d="M7.00477 9.11578C3.50477 9.11578 0.156947 8.27679 0.00476995 11.1158C-0.121084 13.4637 2.26599 14.3972 4.50477 15.1158C7.85649 16.1916 13.9452 15.508 13.0048 12.1158C12.3049 9.59128 10.5048 9.11578 7.00477 9.11578Z" fill="#F99090" fillOpacity="0.7"/>
          <path d="M44.5878 9.07479C41.697 9.33759 39.9109 9.40551 39.0926 12.1906C38.0881 15.6093 45.5878 15.0748 45.5878 15.0748C47.5878 15.0748 52.5878 13.6906 52.5878 12.1906C52.5878 10.6906 50.0878 8.57479 44.5878 9.07479Z" fill="#F99090" fillOpacity="0.7"/>
        </svg>
      )
    } else if (index === 1) {
      return (
        <svg x={x-23} y={y+10} width="47" height="36" viewBox="0 0 47 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 34.5C20 30 26 29 33 34.5" stroke="#4B2920" strokeWidth="3" strokeLinecap="round"/>
          <path d="M31 3C35.5 5.5 37.5 6 43.5 5.5" stroke="#4B2920" strokeWidth="3" strokeLinecap="round"/>
          <path d="M7.5 6.5C12.5 6 14 5.5 18.5 2" stroke="#4B2920" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="14" cy="12.5" r="2.5" fill="#4B2920" stroke="#4B2920"/>
          <circle cx="34" cy="12.5" r="2.5" fill="#4B2920" stroke="#4B2920"/>
          <path d="M41.1216 18.993C38.1264 18.1087 35.1216 18.2728 34.1216 20.6571C33.2122 22.8253 37.6216 23.1571 40.1216 23.6571C42.9587 24.2245 46.6216 24.6571 46.6216 21.6571C46.6216 19.0373 44.1168 19.8772 41.1216 18.993Z" fill="#F99090" fillOpacity="0.7"/>
          <path d="M6.20783 19.3863C4.20782 20.2706 2.70782 20.2706 1.20783 23.2706C-0.292161 26.2706 4.5 24.5 6.50002 24C8.50004 23.5 13.2078 22.2706 12.7078 20.2706C12.2078 18.2706 9.45811 17.9494 6.20783 19.3863Z" fill="#F99090" fillOpacity="0.7"/>
        </svg>
      )
    } else if (index === 2) {
      return (
        <svg x={x-23} y={y+10} width="46" height="40" viewBox="0 0 46 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.4435 35.543C18.4435 31.043 19.0081 27.5759 22.4435 27.043C25.879 26.51 29.0288 31.043 27.9435 34.6112C26.8583 38.1794 20.4435 40.043 19.4435 35.543Z" stroke="#4B2920" strokeWidth="3" strokeLinecap="round"/>
          <path d="M30 6C33 0.5 38 0.999999 40 7" stroke="#4B2920" strokeWidth="3" strokeLinecap="round"/>
          <path d="M6.5 8.5C6.5 6.67572e-06 14.5 1.00001 16.5 6" stroke="#4B2920" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="13" cy="14.5" r="2.5" fill="#4B2920" stroke="#4B2920"/>
          <circle cx="33" cy="14.5" r="2.5" fill="#4B2920" stroke="#4B2920"/>
          <path d="M40 19.5C37.5 18.762 33.1216 19.5 33.1216 22.6571C33.1216 25.0083 36.5 23 39 23.5C41.5 24 45.5 24.8429 45.5 23C45.5 21.4707 42.5 20.238 40 19.5Z" fill="#F99090" fillOpacity="0.7"/>
          <path d="M6 21C3.85572 21.4289 0.499994 23.5411 0.999997 25.2706C1.5 27 4.13011 25.9199 6.5 25.2706C8 24.8595 12.5 25.5 12 23.5C11.5 21.5 8.5 20.5 6 21Z" fill="#F99090" fillOpacity="0.7"/>
        </svg>
      )
    } else if (index === 3) {
      return (
        <svg x={x-20} y={y+10} width="41" height="35" viewBox="0 0 41 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27 2C29 6.5 33.5 6.00001 36.5 4.5" stroke="#4B2920" strokeWidth="3" strokeLinecap="round"/>
          <path d="M4 6C10 6.5 12 6.5 14 2" stroke="#4B2920" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="11" cy="12.5" r="2.5" fill="#4B2920" stroke="#4B2920"/>
          <circle cx="31" cy="12.5" r="2.5" fill="#4B2920" stroke="#4B2920"/>
          <path d="M36 19C34.3063 18.5 30.5 18 30.5 20C30.5 21.5 33 22 35.5 22.5L35.5 22.5C38 23 41 22.3429 41 20.5C41 18.9707 37.6937 19.5 36 19Z" fill="#F99090" fillOpacity="0.7"/>
          <path d="M5.49999 19.5C3.35571 19.9289 4.64916e-06 20.2706 0.500008 22C1.00001 23.7295 4.1301 23.6494 6.49999 23C7.99999 22.589 10.6667 21.5 10 19.5C9.33331 17.5 6.99998 19.2 5.49999 19.5Z" fill="#F99090" fillOpacity="0.7"/>
          <path d="M13.1541 31.6341C13.1541 28.7682 15.5 26.698 20 26C24.5 25.3019 29.5 25.9999 30 30C30.5 34 24 30.1341 20.5 31C17 31.8659 13.1541 34.5 13.1541 31.6341Z" stroke="#4B2920" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      )
    } else if (index === 4) {
      return (
        <svg x={x-23} y={y+10} width="46" height="37" viewBox="0 0 46 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 35.5C17.5 28.5 30 28.5 33 35.5" stroke="#4B2920" strokeWidth="3" strokeLinecap="round"/>
          <path d="M31.9635 2C28.4635 10 34 3.5 43 5.5" stroke="#4B2920" strokeWidth="3" strokeLinecap="round"/>
          <path d="M6 4C12.5 2.5 17.5 10.5 18 2" stroke="#4B2920" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="14" cy="13.5" r="2.5" fill="#4B2920" stroke="#4B2920"/>
          <circle cx="34" cy="13.5" r="2.5" fill="#4B2920" stroke="#4B2920"/>
          <path d="M39.5 18.5C36.5 19.5 33.5 19.5 33.5 22.5C33.5 24.8513 38.5 23.5 40.5 23C43 22.375 45.5 23 45.5 21C45.5 19 42.5 17.5 39.5 18.5Z" fill="#E73F3F" fillOpacity="0.7"/>
          <path d="M7 20C4.81325 20 0.792184 21.2294 0.500001 23.5C0.207818 25.7706 4 24.5 6.5 24.5C9 24.5 13 25.5 13.5 23.5C14 21.5 10 20 7 20Z" fill="#E73F3F" fillOpacity="0.7"/>
        </svg>
      )
    }
  }

  return (
    <EmotionReportTag>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 0 20px 50px' }}>
      
        <BarChart width={550} height={300} data={weeklyEmotionData()} margin={{ top: 20, right: 30, left: 20, bottom: 30, }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke='var(--Brown-Stroke)' tick={emotionIcon} />
          <YAxis style={{ fontSize: '24px' }} stroke='var(--Brown-Stroke)' />
          <Tooltip />
          <Bar dataKey="평균" fill="#82ca9dDD" />
          <Bar dataKey="이번 주" fill="#8884d8DD" />
        </BarChart>
        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0 0 0' }}>
          <div style={{ margin: '0 0 0 30px', width: '20px', height: '20px', backgroundColor: '#82ca9d99', border: '1px solid #82ca9d' }}></div>
          <div style={{ margin: '0 16px 0 6px', fontSize: '24px', color: '#82ca9d' }}>평균</div>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#8884d899', border: '1px solid #8884d8' }}></div>
          <div style={{ margin: '0 0 0 6px', fontSize: '24px', color: '#8884d8' }}>이번 주</div>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'end', margin: '30px 30px 30px 0', fontSize: '26px' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 80px 0 0px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: mostFrequentEmotion(weeklyEmotionObject.thisWeek) ? emotionColor(mostFrequentEmotion(weeklyEmotionObject.thisWeek)) : '#F5F5F5', width: '120px', height: '120px', borderRadius: '40px', margin: '0 0 30px 0' }}>
            { mostFrequentEmotion(weeklyEmotionObject.thisWeek) ? <img style={{ width: '80px' }} src={`/icons/emotion_${emotionName(mostFrequentEmotion(weeklyEmotionObject.thisWeek))}.svg`}/> : null }
          </div>
          <div>이번 주 아이는 평소보다</div><br/>
          <div style={{ fontSize: '40px' }}>"{mostFrequentEmotion(weeklyEmotionObject.thisWeek)}"을 느꼈어요.</div><br/>
          <div style={{ fontSize: '26px', color: 'var(--Brown-LightText', margin: '0 0 50px 0' }}>아이에게 무슨 일이 있었을까요?</div>
        </div>
      </div>
    </EmotionReportTag>
  )
}