import React from 'react'
import { DiaryBlock, JuaBrown, JuaBrownLight } from '../Style/Components'


export function DiaryCardComponent({ info }) {

  const emotionColor = () => {
    let result = ''
    if (info.emotion === '행복') {
      result = '#FFE27D'
    } else if (info.emotion === '슬픔') {
      result = '#7DC1FF'
    } else if (info.emotion === '놀람') {
      result = '#A6EFCC'
    } else if (info.emotion === '불안') {
      result = '#C6A6EF'
    } else if (info.emotion === '분노') {
      result = '#F8899D'
    }
    return result
  }

  const emotionName = () => {
    let result = ''
    if (info.emotion === '행복') {
      result = 'happy'
    } else if (info.emotion === '슬픔') {
      result = 'sad'
    } else if (info.emotion === '놀람') {
      result = 'surprised'
    } else if (info.emotion === '불안') {
      result = 'anxious'
    } else if (info.emotion === '분노') {
      result = 'angry'
    }
    return result
  }

  const emotionColor = (emotion) => {
    let result = ''
    if (emotion === 'happy') {
      result = '#FFE27D'
    } else if (emotion === 'sad') {
      result = '#7DC1FF'
    } else if (emotion === 'surprised') {
      result = '#A6EFCC'
    } else if (emotion === 'angry') {
      result = '#F8899D'
    } else if (emotion === 'worry') {
      result = '#C6A6EF'
    } else {
      return null
    }
    return result
  }
  console.log(info.emotion)
  return (
    <DiaryBlock style={{justifyContent: 'start', justifyContent: 'space-between' }}>
      <section style={{display: 'flex', marginTop: '20px', alignItems: 'end' }}>
        <JuaBrown style={{fontSize: '28px', marginRight: '10px'}}>{info.date.split(' ')[0].replace('-', '년 ').replace('-', '월 ')}일</JuaBrown>
        <div style={{ width: '50px', height: '40px', borderRadius: '10px', backgroundColor: emotionColor('happy'), display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img style={{ width: '30px' }} src={`/icons/emotion_${emotionName()}.svg`} />
        </div>
        {/* <div><img src={`/icons/emotionImage_${ emotionList.indexOf(info.emotion) }.svg`} /></div> */}
      </section>
        <section style={{ marginTop: '10px'}}>
          <img style={{height: '150px', width: '300px' }} src={ info.drawing_base64 } />
        </section>
        <section style={{ textAlign: 'center', marginBottom: '10px' }}>
          <JuaBrown style={{ fontSize: '30px', marginTop: '10px' }}>{info.title.slice(0, 11)}{info.title.length > 11 ? '...' : null}</JuaBrown>
          <JuaBrownLight style={{ fontSize: '26px', marginTop: '10px', marginBottom: '10px' }}>{info.content.slice(0, 14)}{info.content.length > 14 ? '...' : null}</JuaBrownLight>
        </section>
    </DiaryBlock>
  )
}