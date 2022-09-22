import React, { useState } from 'react'
import { CalendarTag, ChildButtonTag1, ChildButtonTag3, ChildProfileTag, CalendarDateTag, CalendarOtherDateTag } from '../Style/Components'


function CalendarPage() {
  const date = new Date()
  const utc = date.getTime() + (date.getTimezoneOffset()*60*1000)
  const kstGap = 9*60*60*1000
  const today = new Date(utc + kstGap)

  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()+1)

  // const currentYear = today.getFullYear()
  // const currentMonth = today.getMonth()+1

  // 이전 달 마지막 날 날짜와 요일
  const startDay = new Date(currentYear, currentMonth-1, 0)
  const prevDate = startDay.getDate()
  const prevDay = startDay.getDay()

  // 이달 마지막 날 날짜와 요일
  const endDay = new Date(currentYear, currentMonth, 0)
  const nextDate = endDay.getDate()
  const nextDay = endDay.getDay()

  const Days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

  const prevMonthDates = () => {
    const result = []
    if (prevDay !== 6) {
      for (let i = prevDate - prevDay; i <= prevDate; i++) {
        if (i === prevDate - prevDay) {
          result.push(<CalendarOtherDateTag key={i} style={{ margin: '2px', color: '#E99C9C' }}>{i}</CalendarOtherDateTag>)
        } else {
          result.push(<CalendarOtherDateTag key={i} style={{ margin: '2px' }}>{i}</CalendarOtherDateTag>)
        }
      }
    }
    return result
  }

  const currentMonthDates = () => {
    const result = []
    for (let i = 1; i <= nextDate; i++) {
      if ((prevDate+i)%7 === 0) {
        result.push(<CalendarDateTag key={i} style={{ margin: '2px', color: '#EB2B2B' }}>{i}</CalendarDateTag>)
      } else {
        result.push(<CalendarDateTag key={i} style={{ margin: '2px' }}>{i}</CalendarDateTag>)
      }

    }
    return result
  }

  const nextMonthDates = () => {
    const result = []
    for (let i = 1; i < 7-nextDay; i++) {
      if ((nextDate+i)%7 === 0) {
        result.push(<CalendarOtherDateTag key={i} style={{ margin: '2px', color: '#E99C9C' }}>{i}</CalendarOtherDateTag>)
      } else {
        result.push(<CalendarOtherDateTag key={i} style={{ margin: '2px' }}>{i}</CalendarOtherDateTag>)
      }
    }
    return result
  }
  
  const Dates = () => {
    return prevMonthDates() + currentMonthDates() + nextMonthDates()
  }

  // const templateRowsCount = () => {
  //   let result = '1fr'
  //   for (let i = 0; i < Dates().length; i++) {
  //     result += ' 1fr'
  //   }
  //   return result
  // }

  const handleClickPrevMonth = () => {
    if (currentMonth > 1) {
      setCurrentMonth(currentMonth-1)
    }
    else if (currentYear > 1) {
      setCurrentMonth(12)
      setCurrentYear(currentYear-1)
    }
  }

  const handleClickNextMonth = () => {
    if (currentMonth < 12) {
      setCurrentMonth(currentMonth+1)
    }
    else {
      setCurrentMonth(1)
      setCurrentYear(currentYear+1)
    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <ChildButtonTag1 style={{ width: '120px' }}>닫기</ChildButtonTag1>
          <h3>그림 그리기</h3>
          <ChildProfileTag ChildProfileTag><img src='/icons/boy.svg' />아이 이름</ChildProfileTag>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ChildButtonTag1 style={{ width: '150px', fontSize: '50px' }} onClick={handleClickPrevMonth}>이전달</ChildButtonTag1>
          <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <p>{currentYear}년 {currentMonth}월</p>
            </div>
            <CalendarTag style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {Days.map((day, index) => (
                <div key={index} style={{ color: index === 0 ? '#EB2B2B' : null }}>{day}</div>
              ))}
              {prevMonthDates()} {currentMonthDates()} {nextMonthDates()}
            </CalendarTag>
          </div>
          <ChildButtonTag1 style={{ width: '150px', fontSize: '50px' }} onClick={handleClickNextMonth}>다음달</ChildButtonTag1>
        </div>
        <ChildButtonTag3 style={{ width: '130px', height: '130px', padding: '10px 0 0 0'}}>
          {'일기'}{<br />}{'쓰기'}
        </ChildButtonTag3>
      </div>
    </>
  );
}

export default CalendarPage