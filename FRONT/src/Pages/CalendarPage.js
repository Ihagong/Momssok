import React from 'react'

function CalendarPage() {
  const date = new Date()
  const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000)
  const kstGap = 9 * 60 * 60 * 1000
  const today = new Date(utc + kstGap)

  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1

  console.log(currentYear, currentMonth)

  // 이전 달 마지막 날 날짜와 요일
  const startDay = new Date(currentYear, currentMonth-1, 0)
  const prevDate = startDay.getDate()
  const prevDay = startDay.getDay()
  console.log(startDay, prevDate, prevDay)

  // 이달 마지막 날 날짜와 요일
  const endDay = new Date(currentYear, currentMonth, 0)
  const nextDate = endDay.getDate()
  const nextDay = endDay.getDay()
  console.log(endDay, nextDate, nextDay)

  console.log(prevDate, prevDay)

  const prevMonthDates = () => {
    const result = []
    for (let i = prevDate - prevDay; i <= prevDate; i++) {
      result.push(<div style={{ margin: '2px' }}>{i}</div>)
    }
    return result
  }

  const currentMonthDates = () => {
    const result = []
    for (let i = 1; i <= nextDate; i++) {
      result.push(<div style={{ margin: '2px' }}>{i}</div>)
    }
    return result
  }

  const nextMonthDates = () => {
    const result = []
    for (let i = 1; i < (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
      result.push(<div style={{ margin: '2px' }}>{i}</div>)
    }
    return result
  }

  return (
    <>
      <div style={{ display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
          {prevMonthDates()} {currentMonthDates()} {nextMonthDates()}
      </div>
    </>
  );
}

export default CalendarPage