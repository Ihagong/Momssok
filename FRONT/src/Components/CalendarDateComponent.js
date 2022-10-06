import React from 'react'
import { CalendarDateTag } from '../Style/Components'


export function CalendarDateComponent({ date, emotion, other, isSunday }) {
  const emotionColor = () => {
    let result = ''
    if (emotion === '행복') {
      result = '#FFE27D'
    } else if (emotion === '슬픔') {
      result = '#7DC1FF'
    } else if (emotion === '놀람') {
      result = '#A6EFCC'
    } else if (emotion === '분노') {
      result = '#F8899D'
    } else if (emotion === '불안') {
      result = '#C6A6EF'
    } else {
      return null
    }
    if (other) {
      result += '99'
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
  
  const emotionFontColor = () => {
    if (!emotion) {
      if (isSunday) {
        if (other) {
          return '#E99C9C'
        } else {
          return '#EB2B2B'
        }
      } else {
        if (other) {
          return 'var(--Brown-Stroke)'
        } else {
          return 'var(--Brown-Text)'
        }
      }
    } else {
      return 'white'
    }
  }
  console.log(emotion)

  return (
    <>
      <CalendarDateTag style={{ backgroundColor: emotionColor() }}>
        <div style={{ width: '100%', display: 'flex', alignItems: 'start', color: emotionFontColor() }}>
          <p>{ date }</p>
        </div>
        { emotion && emotion !== '' ? <img src={`/icons/emotion_${emotionName(emotion)}.svg`} /> : null }
      </CalendarDateTag>
    </>
  )
}