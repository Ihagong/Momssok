import React from 'react'
import { PaintingCardTag, PaintingCardDateStyleTag, PaintingCardTagStyleTag } from '../Style/Components'


export function PaintingCardComponent({ info }) {
  let tagList = info.tag?.split(' ')
  tagList?.splice(-1, 1)
  
  return (
    <PaintingCardTag>
      <PaintingCardDateStyleTag>
        {info.modified_date.split(' ')[0].replace('-', '년 ').replace('-', '월 ')}일
      </PaintingCardDateStyleTag>
      <img src={ 'data'+info.drawing_base64.substring(4) } />
      <div style={{ display: 'flex', marginTop: "10px", marginBottom: "30px"}}>
      { info.tag ? tagList.map((tag, index) => (
        <PaintingCardTagStyleTag key={index}>#{tag}</PaintingCardTagStyleTag>
      )) : '' }
      </div>
    </PaintingCardTag>
  )
}