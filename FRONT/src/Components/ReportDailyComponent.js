import React, { useState, useEffect } from 'react'
import { EmotionReportTag } from '../Style/Components'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { useRecoilState } from 'recoil'
import { dailyEmotionListState } from '../store/atoms'

const data = [
  {
    subject: '행복',
    average: 42,
    date: 67,
  },
  {
    subject: '슬픔',
    average: 23,
    date: 16,
  },
  {
    subject: '놀람',
    average: 30,
    date: 42,
  },
  {
    subject: '불안',
    average: 24,
    date: 17,
  },
  {
    subject: '분노',
    average: 21,
    date: 12,
  },
]

export function ReportDailyComponent({ emotionColor, emotionName }) {

  const [dailyEmotionList, setDailyEmotionList] = useRecoilState(dailyEmotionListState)
  
  const dailyEmotionData = () => {
    return (
      [
        {
          subject: '행복',
          average: 42,
          date: dailyEmotionList[2][1] ? dailyEmotionList[2][1] : 0,
        },
        {
          subject: '슬픔',
          average: 23,
          date: dailyEmotionList[3][1] ? dailyEmotionList[3][1] : 0,
        },
        {
          subject: '놀람',
          average: 30,
          date: dailyEmotionList[5][1] ? dailyEmotionList[5][1] : 0,
        },
        {
          subject: '불안',
          average: 24,
          date: dailyEmotionList[1][1] ? dailyEmotionList[1][1] : 0,
        },
        {
          subject: '분노',
          average: 21,
          date: dailyEmotionList[4][1] ? dailyEmotionList[4][1] : 0,
        },
      ]
    )
  }

  return (
    <EmotionReportTag>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 0 20px 50px' }}>
        <RadarChart cx={200} cy={200} outerRadius={150} width={400} height={350} data={dailyEmotionData()} style={{ display: 'flex', justifyContent: 'center', margin: '0 0 0 30px' }} >
          <PolarGrid stroke='var(--Brown-Stroke)' />
          <PolarAngleAxis stroke='var(--Brown-Text)' dataKey='subject' />
          <PolarRadiusAxis style={{ fontSize: '24px' }} stroke='var(--Brown-Stroke)' />
          <Radar name='평균' dataKey='average' stroke='#82ca9d' fill='#82ca9d' fillOpacity={0.3} />
          <Radar name='오늘' dataKey='date' stroke='#8884d8' fill='#8884d8' fillOpacity={0.3} />
        </RadarChart>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ margin: '0 0 0 30px', width: '20px', height: '20px', backgroundColor: '#82ca9d99', border: '1px solid #82ca9d' }}></div>
          <div style={{ margin: '0 16px 0 6px', fontSize: '24px', color: '#82ca9d' }}>평균</div>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#8884d899', border: '1px solid #8884d8' }}></div>
          <div style={{ margin: '0 0 0 6px', fontSize: '24px', color: '#8884d8' }}>오늘</div>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'end', margin: '30px 30px 30px 0', fontSize: '26px' }}>2022.10.05</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 80px 0 0px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: emotionColor(dailyEmotionList[0]), width: '120px', height: '120px', borderRadius: '40px', margin: '0 0 30px 0' }}>
            <img style={{ width: '80px' }} src={`/icons/emotion_${emotionName(dailyEmotionList[0])}.svg`}/>
          </div>
          <div>오늘 아이의 가장 높은 감정은</div><br/>
          <div style={{ fontSize: '40px' }}>"{dailyEmotionList[0]}"입니다.</div><br/>
          <div style={{ fontSize: '26px', color: 'var(--Brown-LightText', margin: '0 0 50px 0' }}>아이에게 고마움을 전해보세요.</div>
        </div>
      </div>
    </EmotionReportTag>
  )
}