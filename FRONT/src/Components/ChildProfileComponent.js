import React, { useState } from 'react'
import { ChildProfileComponentTag } from '../Style/Components'


export function ChildProfileComponent({ info }) {
  const date = new Date()
  const birthday = new Date(info.birthday)
  const utc = date.getTime() + (date.getTimezoneOffset()*60*1000)
  const kstGap = 9*60*60*1000
  const today = new Date(utc + kstGap)


  const [age, setAge] = useState(today.getFullYear() - birthday.getFullYear())

  return (
    <ChildProfileComponentTag>
      <p>{info.name}</p>
      <p>{info.birthday}</p>
      <p>{age}세</p>
    </ChildProfileComponentTag>
  )
}