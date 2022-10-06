import React from 'react'
import { PaintingCardTag, PaintingCardDateStyleTag, PaintingCardTagStyleTag } from '../Style/Components'


export function PaintingCardComponent({ info, isPointer }) {
  console.log(isPointer)
  let tagList = info?.tag?.split(' ')
  tagList?.splice(-1, 1)
  
  return (
    <PaintingCardTag style={{ cursor: isPointer ? 'pointer' : 'default' }}>
      <PaintingCardDateStyleTag>
        {info.modified_date.split(' ')[0].replace('-', '년 ').replace('-', '월 ')}일
      </PaintingCardDateStyleTag>
      <img src={ info.drawing_base64 } />
      <div style={{ display: 'flex', marginTop: "10px", marginBottom: "30px"}}>
      { info.tag ? tagList.map((tag, index) => (
        <PaintingCardTagStyleTag key={index}>#{tag}</PaintingCardTagStyleTag>
      )) : '' }
      </div>
    </PaintingCardTag>
  )
}