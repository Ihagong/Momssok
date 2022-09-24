import React from 'react'
import { CalendarDateTag } from '../Style/Components'


export function CalendarDateComponent({ date, emotion, other, isSunday }) {
  const emotionColor = () => {
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
    if (other) {
      result += '99'
    }
    return result
  }

  const emotionFontColor = () => {
    if (emotion === '') {
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

  return (
    <>
      <CalendarDateTag style={{ backgroundColor: emotionColor() }}>
        <div style={{ width: '100%', display: 'flex', alignItems: 'start', color: emotionFontColor() }}>
          <p>{ date }</p>
        </div>
        { emotion !== '' ? <img src={`icons/${emotion}.svg`} /> : null }
      </CalendarDateTag>
    </>
  )
}