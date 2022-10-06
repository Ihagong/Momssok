import React from 'react'
import { EmotionReportTag } from '../Style/Components'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { useRecoilState } from 'recoil'
import { dailyEmotionObjectState } from '../store/atoms'


export function ReportDailyComponent({ emotionColor, emotionName }) {

  const [dailyEmotionObject, setDailyEmotionObject] = useRecoilState(dailyEmotionObjectState)

  const dailyEmotionData = () => {
    if (dailyEmotionObject) {

    }
    return (
      [
        {
          subject: '행복',
          average: dailyEmotionObject.average?.['행복'],
          today: dailyEmotionObject.today?.['행복']
        },
        {
          subject: '슬픔',
          average: dailyEmotionObject.average?.['슬픔'],
          today: dailyEmotionObject.today?.['슬픔']
        },
        {
          subject: '놀람',
          average: dailyEmotionObject.average?.['놀람'],
          today: dailyEmotionObject.today?.['놀람']
        },
        {
          subject: '불안',
          average: dailyEmotionObject.average?.['불안'],
          today: dailyEmotionObject.today?.['불안']
        },
        {
          subject: '분노',
          average: dailyEmotionObject.average?.['분노'],
          today: dailyEmotionObject.today?.['분노']
        },
      ]
    )
  }
  console.log("오늘 일기" , dailyEmotionObject.emotion)

  return (
    <div>
      {/* { dailyEmotionObject.emotion === undefined ?
          <EmotionReportTag>
            <div style={{fontSize: "60px", marginLeft: "100px"}}>아이가 일기를 작성하지 않았습니다. </div>
          </EmotionReportTag>
        :
          <EmotionReportTag>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 0 20px 50px' }}>
            <RadarChart cx={200} cy={200} outerRadius={150} width={400} height={350} data={dailyEmotionData()} style={{ display: 'flex', justifyContent: 'center', margin: '0 0 0 30px' }} >
              <PolarGrid stroke='var(--Brown-Stroke)' />
              <PolarAngleAxis stroke='var(--Brown-Text)' dataKey='subject' />
              <PolarRadiusAxis style={{ fontSize: '24px' }} stroke='var(--Brown-Stroke)' />
              <Radar name='평균' dataKey='average' stroke='#82ca9d' fill='#82ca9d' fillOpacity={0.3} />
              <Radar name='오늘' dataKey='today' stroke='#8884d8' fill='#8884d8' fillOpacity={0.3} />
            </RadarChart>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ margin: '0 0 0 30px', width: '20px', height: '20px', backgroundColor: '#82ca9d99', border: '1px solid #82ca9d' }}></div>
              <div style={{ margin: '0 16px 0 6px', fontSize: '24px', color: '#82ca9d' }}>평균</div>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#8884d899', border: '1px solid #8884d8' }}></div>
              <div style={{ margin: '0 0 0 6px', fontSize: '24px', color: '#8884d8' }}>오늘</div>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'end', margin: '30px 30px 30px 0', fontSize: '26px' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 80px 0 0px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: emotionColor(dailyEmotionObject.emotion), width: '120px', height: '120px', borderRadius: '40px', margin: '0 0 30px 0' }}>
                { emotionName(dailyEmotionObject.emotion) !== '' ? <img style={{ width: '80px' }} src={`/icons/emotion_${emotionName(dailyEmotionObject.emotion)}.svg`}/> : null }
              </div>
              <div>오늘 아이의 가장 높은 감정은</div><br/>
              <div style={{ fontSize: '40px' }}>"{dailyEmotionObject.emotion}"입니다.</div><br/>
              <div style={{ fontSize: '26px', color: 'var(--Brown-LightText', margin: '0 0 50px 0' }}>아이와 하루를 공유해보세요.</div>
            </div>
          </div>
        </EmotionReportTag>
      }       */}
      <EmotionReportTag>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 0 20px 50px' }}>
          <RadarChart cx={200} cy={200} outerRadius={150} width={400} height={350} data={dailyEmotionData()} style={{ display: 'flex', justifyContent: 'center', margin: '0 0 0 30px' }} >
            <PolarGrid stroke='var(--Brown-Stroke)' />
            <PolarAngleAxis stroke='var(--Brown-Text)' dataKey='subject' />
            <PolarRadiusAxis style={{ fontSize: '24px' }} stroke='var(--Brown-Stroke)' />
            <Radar name='평균' dataKey='average' stroke='#82ca9d' fill='#82ca9d' fillOpacity={0.3} />
            <Radar name='오늘' dataKey='today' stroke='#8884d8' fill='#8884d8' fillOpacity={0.3} />
          </RadarChart>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ margin: '0 0 0 30px', width: '20px', height: '20px', backgroundColor: '#82ca9d99', border: '1px solid #82ca9d' }}></div>
            <div style={{ margin: '0 16px 0 6px', fontSize: '24px', color: '#82ca9d' }}>평균</div>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#8884d899', border: '1px solid #8884d8' }}></div>
            <div style={{ margin: '0 0 0 6px', fontSize: '24px', color: '#8884d8' }}>오늘</div>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'end', margin: '30px 30px 30px 0', fontSize: '26px' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 80px 0 0px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: emotionColor(dailyEmotionObject.emotion), width: '120px', height: '120px', borderRadius: '40px', margin: '0 0 30px 0' }}>
              { emotionName(dailyEmotionObject.emotion) !== '' ? <img style={{ width: '80px' }} src={`/icons/emotion_${emotionName(dailyEmotionObject.emotion)}.svg`}/> : null }
            </div>
            <div>오늘 아이의 가장 높은 감정은</div><br/>
            <div style={{ fontSize: '40px' }}>"{dailyEmotionObject.emotion}"입니다.</div><br/>
            <div style={{ fontSize: '26px', color: 'var(--Brown-LightText', margin: '0 0 50px 0' }}>아이와 하루를 공유해보세요.</div>
          </div>
        </div>
      </EmotionReportTag>
    </div>
  )
}