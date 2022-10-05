import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactPlayer from "react-player";

import "../App.css"
import { DongleBrown, LightButton120, LightButton230, OrangeButton230, KidsSongVidoBackground } from '../Style/Components'

const KidsSongPage = () => {
  const navigate = useNavigate()
  const [selectedTab, setSelctedTab] = useState(0)
  const [videoUrl, setVideoUrl ] = useState("https://youtu.be/pOiX3U0Vp-s")

  const handleClickCloseButton = () => {
    navigate('/child')
  }

  const changeSong0Button = () => {
    setSelctedTab(0)
    setVideoUrl("https://youtu.be/pOiX3U0Vp-s")
  }

  const changeSong1Button = () => {
    setSelctedTab(1)
    setVideoUrl("https://youtu.be/761ae_KDg_Q")
  }

  const changeSong2Button = () => {
    setSelctedTab(2)
    setVideoUrl("https://youtu.be/DZF06J5Ahzw")
  }
  
  return (
    <div className='LetterPageHome'>
      <section style={{display: "flex", alignItems: "center", marginLeft: "20px"}}>
        <LightButton120 onClick={handleClickCloseButton}>닫기</LightButton120>
        <DongleBrown style={{ marginLeft: "20px", fontSize: "100px", fontWeight: "bold"}}>동요 나라</DongleBrown>
        <div style={{ marginLeft:"140px", marginRight:"140px", marginBottom: "-60px" }}>
          <img src={`/icons/boypromiseicon.svg`} />
          <img src={`/icons/girlpromiseicon.svg`} />
          <img src={`/icons/boy2promiseicon.svg`} />
        </div>
      </section>
      <section style={{display: "flex", alignItems: "center", justifyContent: "space-around", marginTop: "50px"}}>
        <section>
          {selectedTab === 0 ? <OrangeButton230>경찰차</OrangeButton230>
          : <LightButton230 onClick={changeSong0Button}>경찰차</LightButton230>}
          {selectedTab === 1 ? <OrangeButton230>아기상어</OrangeButton230>
          : <LightButton230 onClick={changeSong1Button}>아기상어</LightButton230>}
          {selectedTab === 2 ? <OrangeButton230>나는야 공룡 요리사</OrangeButton230>
          : <LightButton230 onClick={changeSong2Button}>나는야 공룡 요리사</LightButton230>}        
        </section>
        <KidsSongVidoBackground>
          <ReactPlayer 
            className="player"
            url={videoUrl}
            controls={false}
            playing={true}
            width="854px"
            height="480px"
          />
        </KidsSongVidoBackground>
      </section>
    </div>
  )
}

export default KidsSongPage