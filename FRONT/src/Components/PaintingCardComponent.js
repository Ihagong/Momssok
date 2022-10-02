import React from 'react'
import { PaintingCardTag, PaintingCardDateStyleTag, PaintingCardTagStyleTag } from '../Style/Components'


export function PaintingCardComponent({ info }) {
  return (
    <PaintingCardTag>
      <PaintingCardDateStyleTag>{info.date}</PaintingCardDateStyleTag>
      {info.created_date.split(' ')[0].replace('-', '.').replace('-', '.')}
      <img src='/images/MyPainting.png' />
      <div style={{ display: 'flex' }}>
        {info.tag}
      {/* {info.tags.map((tag, index) => (
        <PaintingCardTagStyleTag key={index}>#{tag}</PaintingCardTagStyleTag>
      ))} */}
      </div>
    </PaintingCardTag>
  )
}