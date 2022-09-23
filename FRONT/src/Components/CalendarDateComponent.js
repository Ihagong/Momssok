import React from 'react'
import { PromiseModalComponentTag } from '../Style/Components'
import { CalendarDateTag, CalendarOtherDateTag } from '../Style/Components'
import { useRecoilState } from 'recoil'
import { totalTodoListState } from '../store/atoms'


export function CalendarDateComponent({ date, emotion, other, isSunday }) {
  // const [totalTodoList, setTotalTodoList] = useRecoilState(totalTodoListState)

  const handleClickTodoItem = () => {
    // const newList = { ...totalTodoList }
    // newList[promiseId] = totalTodoList[promiseId].map((listItem) => 
    //     listItem.id === todoItem.id
    //     ? { ...listItem, done: !listItem.done }
    //     : listItem
    //   )
    // setTotalTodoList(newList)
  }

  const emotionColor = () => {
    if (emotion === 'happy') {
      return '#FFE27D'
    } else if (emotion === 'sad') {
      return '#7DC1FF'
    } else if (emotion === 'surprised') {
      return '#A6EFCC'
    } else if (emotion === 'angry') {
      return '#F8899D'
    } else if (emotion === 'worry') {
      return '#C6A6EF'
    } else {
      return null
    }
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
      { other ?
        <CalendarOtherDateTag onClick={handleClickTodoItem} style={{ backgroundColor: emotionColor()+'99' }}>
          <div style={{ width: '100%', display: 'flex', alignItems: 'start', color: emotionFontColor() }}>
            <p>{ date }</p>
          </div>
          { emotion !== '' ? <img src={`icons/${emotion}.svg`} /> : null }
        </CalendarOtherDateTag>
      :
        <CalendarDateTag onClick={handleClickTodoItem} style={{ backgroundColor: emotionColor() }}>
          <div style={{ width: '100%', display: 'flex', alignItems: 'start', color: emotionFontColor() }}>
            <p>{ date }</p>
          </div>
          { emotion !== '' ? <img src={`icons/${emotion}.svg`} /> : null }
        </CalendarDateTag>
      }
    </>
  )
}