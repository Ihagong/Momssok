import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { profileState, calendarEmotionObjectState } from '../store/atoms'

import { LetterButtonGo, CalendarTag, DongleLightBrown, ChildProfileTag, LetterPageHeader, BrownText100, LightButton120 } from '../Style/Components'
import { CalendarDateComponent } from '../Components/CalendarDateComponent'
import { useReportCallback } from '../Functions/useReportCallback'


function CalendarPage() {
  const navigate = useNavigate()

  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const { getMonthlyEmotionListCallback } = useReportCallback()
  const [calendarEmotionObject, setCalendarEmotionObject] = useRecoilState(calendarEmotionObjectState)

  const handleClickChildProfile = () => {
    navigate('/profile')
  }

  const date = new Date()
  const utc = date.getTime() + (date.getTimezoneOffset()*60*1000)
  const kstGap = 9*60*60*1000
  const today = new Date(utc + kstGap)

  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()+1)

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
          result.push(<CalendarDateComponent key={i} month={currentMonth-1 >= 1 ? currentMonth-1 : 12} date={i} other={true} isSunday={true} />)
        } else {
          result.push(<CalendarDateComponent key={i} month={currentMonth-1 >= 1 ? currentMonth-1 : 12} date={i} other={true} />)
        }
      }
    }
    return result
  }

  const currentMonthDates = () => {
    const result = []
    for (let i = 1; i <= nextDate; i++) {
      if ((prevDay+i)%7 === 0) {
        result.push(<CalendarDateComponent key={i} month={currentMonth} date={i} isSunday={true} emotion={calendarEmotionObject[i]} />)
      } else {
        result.push(<CalendarDateComponent key={i} month={currentMonth} date={i} emotion={calendarEmotionObject[i]} />)
      }
    }
    return result
  }

  const nextMonthDates = () => {
    const result = []
    for (let i = 1; i < 7-nextDay; i++) {
      result.push(<CalendarDateComponent key={i} month={currentMonth+1 <= 12 ? currentMonth+1 : 1} date={i} other={true} />)
    }
    return result
  }

  useEffect(() => {
    getMonthlyEmotionListCallback(currentYear+'-'+currentMonth, profileInfo.name)
  }, [currentYear, currentMonth])


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
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <LetterPageHeader>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '30px', marginLeft: '-20px' }}>
          <BrownText100 style={{ fontSize: '84px'}}>표정 달력</BrownText100>
          <DongleLightBrown style={{ fontSize: '50px', fontWeight: 'bold', textAlign: 'center'}}>{currentYear}년 {currentMonth}월</DongleLightBrown>
        </div>
        <ChildProfileTag style={{marginTop: '30px', zIndex: '1' }} onClick={handleClickChildProfile}><img src={`/images/profileImage_${profileInfo.image_num}.svg`} />{profileInfo.name}</ChildProfileTag>
      </LetterPageHeader>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-180px'}}>
        <LightButton120 style={{ width: '140px', marginRight: '50px'}} onClick={handleClickPrevMonth}>이전달</LightButton120>
        <div>
          <CalendarTag style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {Days.map((day, index) => (
              <div key={index} style={{ color: index === 0 ? '#EB2B2B' : null }}>{day}</div>
            ))}
            {prevMonthDates()} {currentMonthDates()} {nextMonthDates()}
          </CalendarTag>
        </div>
        <LightButton120 style={{ width: '140px', marginLeft: '50px'}} onClick={handleClickNextMonth}>다음달</LightButton120>
      </div>
      <div style={{ display: 'flex', justifyContent: 'end'}}>
        <LetterButtonGo style={{ width: '150px', marginTop: '-90px' }} onClick={() => navigate('/child')}>닫기</LetterButtonGo>
      </div>
    </div>
  )
}

export default CalendarPage