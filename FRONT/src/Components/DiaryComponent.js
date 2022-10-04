import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from  'react-router-dom'

import { useDiaryCallback } from '../Functions/useDiaryCallback'

import { useRecoilState } from 'recoil'
import { diaryDetailState, diaryEditState, diaryTempState, loadedPaintingInfoState, profileState } from '../store/atoms'


import { LetterButton, LetterButtonDel,LetterButtonBack, LetterButtonGo, LetterEditorComponentBody, DiarySectionButtonTag, LogoTag, DiaryComponentTag, DiaryInputTag, DiaryContentInputTag, DiaryWeatherBoxTag, DiaryPaintingTag } from '../Style/Components'


export function DiaryComponent() {
  const navigate = useNavigate()


  const { saveDiaryCallback } = useDiaryCallback()

  const titleRef = useRef()
  const contentRef = useRef()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [weatherIndex, setWeatherIndex] = useState(0)
  const [date, setDate] = useState(new Date().toLocaleDateString().replace('. ', '-').replace('. ', '-').replace('.', ''))
  const [selectOpen, setSelectOpen] = useState(false)

  const [loadedPaintingInfo, setLoadedPaintingInfo] = useRecoilState(loadedPaintingInfoState)
  const [diaryTemp, setDiaryTemp ] = useRecoilState(diaryTempState)
  const [diaryIsEdit, setDiaryIsEdit] = useRecoilState(diaryEditState)
  const [diaryIsDetail, setDiaryIsDetail ] = useRecoilState(diaryDetailState)
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)


  // // CREATE
  // const onCreate = (name, drawing_id, title, content, weather, date) => {
  //   // saveDiaryCallback(drawing_id, title, content, weather, date)
  // }

  const handleInputContent = (input) => {
    if (input.length <= 44) {
      setContent(input)
    }
  }

  const handleClickCreatePaintingButton = () => {
    setDiaryIsEdit(true)
    navigate('/painting/create')
  }

  const handleClickLoadPaintingButton = () => {
    setDiaryIsEdit(true)
    navigate('/painting/load')
  }

  const handleClickWeatherBox = (index) => {
    setSelectOpen(false)
    setWeatherIndex(index)
  }

  const handleClickCloseButton = () => {
    setDiaryIsEdit(false)
    setDiaryIsDetail(false)
    navigate('/diary')
  }

  const handleClickCreateButton = () => {
    if (title.length < 1) {
      titleRef.current.focus()
      return
    } 
    if (content.length < 1) {
      contentRef.current.focus()
      return
    } 
    setDiaryIsEdit(false)
    console.log(profileInfo.name, loadedPaintingInfo.id, title, content, weatherList[weatherIndex], date)
    saveDiaryCallback({
      'name': profileInfo.name, 
      'drawing_id': loadedPaintingInfo.id, 
      'title': title, 
      'content': content, 
      'weather': weatherList[weatherIndex], 
      'date': date
      })
  }

  const weatherList = ['sun', 'cloud', 'cloudy', 'rain', 'snow']

  const contentGrid = () => {
    let result = []
    const radiusIndex = { 0 : '10px 0 0 0', 10: '0 10px 0 0', 33: '0 0 0 10px', 43: '0 0 10px 0' }
    for (let i = 0; i < 44; i++) {
      if (Object.keys(radiusIndex).includes(`${i}`)) {
        result.push(<div key={i} style={{ backgroundColor: 'white', zIndex: 1, borderRadius: radiusIndex[i] }}></div>)
      } else {
        result.push(<div key={i} style={{ backgroundColor: 'white', zIndex: 1 }}></div>)
      }
    }
    return result
  }

  const grid = contentGrid()

  const dateString = () => {
    const dateList = date.split('-')
    return `${dateList[0]}년 ${Number(dateList[1])}월 ${Number(dateList[2])}일`
  }

  return (
    <LetterEditorComponentBody>
      <div style={{marginRight: "20px", marginTop: "20px"}}>
        <LogoTag src='/icons/logo.svg' />
      </div>

      <DiaryComponentTag>
        <div style={{ display: 'flex', alignItems: 'center', height: '60px' }}>
          <p style={{ position: 'absolute', top: '40px', margin: '0 0 0 110px', color: 'var(--Brown-LightText)', fontSize: '40px', fontWeight: '500' }}>{ dateString() }</p>
          <div style={{ marginRight: '20px' }}>
            <label htmlFor='date'>날짜 : </label>
            <DiaryInputTag style={{  }} type='date' id='date' value={date} onInput={((e) => setDate(e.target.value))} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor='weather'>날씨 : </label>
            <DiaryWeatherBoxTag>
              <button onClick={() => setSelectOpen(!selectOpen)}><img src={`/icons/${weatherList[weatherIndex]}icon.svg`} alt='맑음'></img></button>
              { selectOpen ?
                <ul>
                  <li onClick={() => handleClickWeatherBox(0)}><img src='/icons/sunicon.svg' alt='맑음'></img></li>
                  <li onClick={() => handleClickWeatherBox(1)}><img src='/icons/cloudicon.svg' alt='구름많음'></img></li>
                  <li onClick={() => handleClickWeatherBox(2)}><img src='/icons/cloudyicon.svg' alt='흐림'></img></li>
                  <li onClick={() => handleClickWeatherBox(3)}><img src='/icons/rainicon.svg' alt='비'></img></li>
                  <li onClick={() => handleClickWeatherBox(4)}><img src='/icons/snowicon.svg' alt='눈'></img></li>
                </ul>
              : null }
            </DiaryWeatherBoxTag>
          </div>
        </div>
        <div>
          <label htmlFor='title'>제목 : </label>
          <DiaryInputTag id='title' ref={titleRef} style={{ width: '480px' }} value={title} onInput={((e) => setTitle(e.target.value))} />
        </div>
        { diaryIsEdit ? 
          <DiaryPaintingTag>
            <img src={loadedPaintingInfo} />
          </DiaryPaintingTag>
          : 
          <DiaryPaintingTag>
            <DiarySectionButtonTag onClick={handleClickLoadPaintingButton}>
              <LogoTag src='/icons/addicon.svg' />
              불러오기
            </DiarySectionButtonTag>
            <DiarySectionButtonTag onClick={handleClickCreatePaintingButton}>
              <LogoTag src='/icons/paintingicon.svg' />
              <div style={{ marginBottom: "-20px", marginTop: "5px" }}>
                새로 그리기
              </div>
            </DiarySectionButtonTag>
          </DiaryPaintingTag>
        }

        <div style={{ display: 'flex', margin: '0 0 20px 0' }}>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(11, 3fr)', gridTemplateRows: 'repeat(4, 1fr)', width: '600px', height: '200px',
            backgroundColor: 'var(--Beige-Stroke)', outline: '1px solid var(--Beige-Stroke)', gridGap: '1px', zIndex: 1, borderRadius: '10px'
          }}>
              <DiaryContentInputTag maxLength={44} ref={contentRef} value={content} onInput={(e) => handleInputContent(e.target.value)} />
              { grid }
          </div>
        </div>
      </DiaryComponentTag>

      <section>
        <LetterButton>
          <LetterButtonBack onClick={handleClickCloseButton}>닫기</LetterButtonBack>
          <LetterButtonGo onClick={handleClickCreateButton}>저장</LetterButtonGo>
        </LetterButton>
      </section>      

    </LetterEditorComponentBody>

  )
}

export default DiaryComponent