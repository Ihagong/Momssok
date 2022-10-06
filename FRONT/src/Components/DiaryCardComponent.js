import React from 'react'
import { DiaryBlock, JuaBrown, JuaBrownLight } from '../Style/Components'


export function DiaryCardComponent({ info, isPointer }) {
  return (
    <DiaryBlock style={{justifyContent: 'start', justifyContent: 'space-between', cursor: isPointer ? 'pointer' : 'default' }}>
      <section style={{display: 'flex', marginTop: '20px', alignItems: 'center' }}>
        <JuaBrown style={{fontSize: '28px', marginRight: '10px'}}>{info.date.split(' ')[0].replace('-', '년 ').replace('-', '월 ')}일</JuaBrown>
        <div><img src={`/icons/${info.weather}icon.svg`} /></div>
      </section>
        <section style={{ marginTop: '10px'}}>
          <img style={{height: '150px', width: '300px' }} src={ info.drawing_base64 } />
        </section>
        <section style={{ textAlign: 'center', marginBottom: '10px' }}>
          <JuaBrown style={{ fontSize: '30px', marginTop: '10px' }}>{info.title.slice(0, 11)}{info.title.length > 11 ? '...' : null}</JuaBrown>
          <JuaBrownLight style={{ fontSize: '26px', marginTop: '10px', marginBottom: '10px' }}>{info.content.slice(0, 14)}{info.content.length > 14 ? '...' : null}</JuaBrownLight>
        </section>
    </DiaryBlock>
  )
}