import React from 'react'
import { PaintingCardTag, PaintingCardDateStyleTag, PaintingCardTagStyleTag } from '../Style/Components'


export function PaintingCardComponent({ info }) {
  console.log("info :", info)

  return (
    <PaintingCardTag>
      <PaintingCardDateStyleTag>
        {info.modified_date.split(' ')[0].replace('-', '년 ').replace('-', '월 ')}일
      </PaintingCardDateStyleTag>
      <img src={ info.drawing_base64 } />
      <div style={{ display: 'flex', marginTop: "10px"}}>
        {info.tag}
      {/* {info.tags.map((tag, index) => (
        <PaintingCardTagStyleTag key={index}>#{tag}</PaintingCardTagStyleTag>
      ))} */}
      </div>
    </PaintingCardTag>
  )
}