import React from 'react'

function CalendarPage() {
  const date = new Date()
  const utc = date.getTime() + (date.getTimezoneOffset()*60*1000)
  const kstGap = 9*60*60*1000
  const today = new Date(utc + kstGap)

  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()+1

  // 이전 달 마지막 날 날짜와 요일
  const startDay = new Date(currentYear, currentMonth-1, 0)
  const prevDate = startDay.getDate()
  const prevDay = startDay.getDay()

  // 이달 마지막 날 날짜와 요일
  const endDay = new Date(currentYear, currentMonth, 0)
  const nextDate = endDay.getDate()
  const nextDay = endDay.getDay()

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
    let result = ''
    for (let i = 0; i < Dates().length; i++) {
      result += '1fr '
    }
    return result
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <p>{currentMonth}월</p>
      </div>
      <div style={{ display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateRows: {templateRowsCount} }}>
          {prevMonthDates()} {currentMonthDates()} {nextMonthDates()}
      </div>
    </>
  );
}

export default CalendarPage