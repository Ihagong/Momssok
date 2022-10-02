import React from 'react'
import { DictionaryCardComponentTag, DictionaryOpenedCardComponentTag } from '../Style/Components'


export function DictionaryCardComponent({ info, handleClickDictionaryCardComponent, openDescription }) {
  if (openDescription) {
    return null
  } else {
    return (
      <DictionaryCardComponentTag onClick={() => handleClickDictionaryCardComponent(info)}>
        <img src={`/images/${info.name}/${info.name}.svg`}></img>
        {info.name_ko}
      </DictionaryCardComponentTag>
    )
  }
}