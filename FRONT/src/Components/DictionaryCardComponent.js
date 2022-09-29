import React from 'react'
import { DictionaryCardComponentTag } from '../Style/Components'


export function DictionaryCardComponent({ info, handleClickDictionaryCardComponent }) {
  return (
    <DictionaryCardComponentTag onClick={() => handleClickDictionaryCardComponent(info)}>
      <img src={`/images/${info.name}/${info.name}.svg`}></img>
      {info.name_ko}
    </DictionaryCardComponentTag>
  )
}