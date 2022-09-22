import React, { useState } from 'react'

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
        result.push(<div key={i} style={{ margin: '2px' }}>{i}</div>)
      }
    }
    return result
  }

  const currentMonthDates = () => {
    const result = []
    for (let i = 1; i <= nextDate; i++) {
      result.push(<div key={i} style={{ margin: '2px' }}>{i}</div>)
    }
    return result
  }

  const nextMonthDates = () => {
    const result = []
    for (let i = 1; i < 7-nextDay; i++) {
      result.push(<div key={i} style={{ margin: '2px' }}>{i}</div>)
    }
    return result
  }
  
  const Dates = () => {
    return prevMonthDates() + currentMonthDates() + nextMonthDates()
  }

  const templateRowsCount = () => {
    let result = '1fr'
    for (let i = 0; i < Dates().length; i++) {
      result += ' 1fr'
    }
    return result
  }

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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleClickPrevMonth}>이전달</button>
        <div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p>{currentYear}년 {currentMonth}월</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
            gridTemplateRows: {templateRowsCount} }}>
            {Days.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
            {prevMonthDates()} {currentMonthDates()} {nextMonthDates()}
          </div>
        </div>
        <button onClick={handleClickNextMonth}>다음달</button>
      </div>
    </>
  );
}

export default CalendarPage