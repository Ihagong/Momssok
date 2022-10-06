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

  const changeSong3Button = () => {
    setSelctedTab(3)
    setVideoUrl("https://youtu.be/O9UO6z-7A0U")
  }

  const changeSong4Button = () => {
    setSelctedTab(4)
    setVideoUrl("https://youtu.be/Bl_PylYAMts")
  }

  const changeSong5Button = () => {
    setSelctedTab(5)
    setVideoUrl("https://youtu.be/rN_IOscJ1ic")
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
      <section style={{display: "flex", alignItems: "center", justifyContent: "space-around", marginTop: "30px"}}>
        <section>
          {selectedTab === 0 ? <OrangeButton230>경찰차</OrangeButton230>
          : <LightButton230 onClick={changeSong0Button}>경찰차</LightButton230>}
          {selectedTab === 1 ? <OrangeButton230>아기상어</OrangeButton230>
          : <LightButton230 onClick={changeSong1Button}>아기상어</LightButton230>}
          {selectedTab === 2 ? <OrangeButton230>나는야 공룡 요리사</OrangeButton230>
          : <LightButton230 onClick={changeSong2Button}>나는야 공룡 요리사</LightButton230>}
          {selectedTab === 3 ? <OrangeButton230>바나나차차</OrangeButton230>
          : <LightButton230 onClick={changeSong3Button}>바나나차차</LightButton230>}
          {selectedTab === 4 ? <OrangeButton230>정글 붐붐</OrangeButton230>
          : <LightButton230 onClick={changeSong4Button}>정글 붐붐</LightButton230>}
          {selectedTab === 5 ? <OrangeButton230>바닷속에는</OrangeButton230>
          : <LightButton230 onClick={changeSong5Button}>바닷속에는</LightButton230>}   
        </section>
        <KidsSongVidoBackground style={{ marginTop: "-10px" }}>
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