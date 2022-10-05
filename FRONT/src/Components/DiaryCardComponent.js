import React from 'react'
import { DiaryBlock, JuaBrown, JuaBrownLight } from '../Style/Components'


export function DiaryCardComponent({ info }) {

  const emotionList = ['기쁨', '놀람', '슬픔', '걱정']

  return (
    <DiaryBlock style={{justifyContent: "start"}}>
      <section style={{display: "flex", marginTop: "20px", alignItems: "center" }}>
        <JuaBrown style={{fontSize: "28px", marginRight: "10px"}}>{info.date.split(' ')[0].replace('-', '년 ').replace('-', '월 ')}일</JuaBrown>
        <div><img style={{ width: "70px" }} src={`/icons/emotionImage_1.svg`} /></div>
        {/* <div><img src={`/icons/emotionImage_${ emotionList.indexOf(info.emotion) }.svg`} /></div> */}
      </section>
      <section style={{ marginTop: "10px"}}>
        <img style={{height: "250px", width: "300px" }} src={ info.drawing_base64 } />
      </section>
      <section style={{ textAlign: "center"}}>
        <JuaBrown style={{fontSize: "30px", marginTop: "10px"}}>{info.title}</JuaBrown>
        <JuaBrownLight style={{fontSize: "26px", marginTop: "10px"}}>{info.content.slice(0, 14)}</JuaBrownLight>
      </section>
    </DiaryBlock>
  )
}