import React, { useState } from 'react'
import { ChildProfileComponentTag } from '../Style/Components'


export function ChildProfileComponent({ info, handleClickChildProfile }) {
  const date = new Date()
  const birthday = new Date(info.birthday ? info.birthday : null)
  const utc = date.getTime() + (date.getTimezoneOffset()*60*1000)
  const kstGap = 9*60*60*1000
  const today = new Date(utc + kstGap)
  const [age, setAge] = useState(today.getFullYear() - birthday.getFullYear() + 1)
  const birthdayInfo = birthday.getFullYear() + '.' + `${(birthday.getMonth()+1)}`.padStart(2,'0')

  return (
    <ChildProfileComponentTag onClick={() => handleClickChildProfile(info)}>
      <img style={{ height: '110px' }} src={`/images/profileImage_${info.image_num}.svg`} />
      <p>{info.name}</p>
      {birthdayInfo} | {age}세
    </ChildProfileComponentTag>
  )
}