import React from 'react'
import { useRecoilState } from 'recoil'
import { dictionaryPaintingState } from '../store/atoms'


export function DictionaryCreateImageComponent() {
  const [dictionaryPaintingList, setDictionaryPaintingList] = useRecoilState(dictionaryPaintingState)

  const sound = new Audio('/sounds/sound_dog.mp3') 
  
  const soundPlay = () => {
    // sound.play()
  }
  console.log(dictionaryPaintingList, '!')


  return (
    <div>
      { dictionaryPaintingList.map((paintingInfo, index) => {
        return <p key={index}>{paintingInfo.part}a</p>
      })}
    </div>
  )
}