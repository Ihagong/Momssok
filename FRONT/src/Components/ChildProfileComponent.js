import React from 'react'
import { ChildProfileComponentTag } from '../Style/Components'


export function ChildProfileComponent({ info }) {
  return (
    <ChildProfileComponentTag>
      <p>{info.name}</p>
      <p>{info.birth}</p>
      <p>{info.age}세</p>
    </ChildProfileComponentTag>
  )
}