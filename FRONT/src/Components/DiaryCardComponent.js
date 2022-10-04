import React from 'react'
import { DiaryBlock, JuaBrown, JuaBrownLight } from '../Style/Components'


export function DiaryCardComponent({ info }) {
  return (
    <DiaryBlock style={{justifyContent: "start"}}>
      <section style={{display: "flex", marginTop: "20px"}}>
        <JuaBrown style={{fontSize: "28px", marginRight: "20px"}}>{info.date.split(' ')[0].replace('-', '년 ').replace('-', '월 ')}일</JuaBrown>
        <div><img src='/icons/happy.svg' /></div>
      </section>
      <section style={{ marginTop: "20px"}}>
        <img style={{height: "250px", width: "330px"}} src={ info.drawing_base64 } />
      </section>
      <section style={{ textAlign: "center"}}>
        <JuaBrown style={{fontSize: "30px", marginTop: "20px"}}>{info.title}</JuaBrown>
        <JuaBrownLight style={{fontSize: "26px", marginTop: "10px"}}>{info.content.slice(0, 14)}</JuaBrownLight>
      </section>
    </DiaryBlock>
  )
}