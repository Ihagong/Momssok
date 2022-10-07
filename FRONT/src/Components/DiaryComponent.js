import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from  'react-router-dom'

import { useDiaryCallback } from '../Functions/useDiaryCallback'

import { useRecoilState } from 'recoil'
import { diaryItemState, diaryDetailState, diaryEditState, diaryTempState, loadedPaintingInfoState, profileState } from '../store/atoms'


import { LetterButton, LetterButtonDel, LetterButtonBack, LetterButtonGo, LetterEditorComponentBody, DiarySectionButtonTag, LogoTag, DiaryComponentTag, DiaryInputTag, DiaryContentInputTag, DiaryWeatherBoxTag, DiaryPaintingTag } from '../Style/Components'


export function DiaryComponent() {
  const navigate = useNavigate()


  const { saveDiaryCallback, updateDiaryCallback, diaryRemoveCallback } = useDiaryCallback()

  const titleRef = useRef()
  const contentRef = useRef()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [weatherIndex, setWeatherIndex] = useState(0)
  const dt = new Date()
  const [date, setDate] = useState(dt.getFullYear()+ '-' + (dt.getMonth()+1).toString().padStart(2,'0') + '-' + dt.getDate().toString().padStart(2,'0'))
  const [selectOpen, setSelectOpen] = useState(false)

  const [loadedPaintingInfo, setLoadedPaintingInfo] = useRecoilState(loadedPaintingInfoState)
  const [diaryItem, setDiaryItem] = useRecoilState(diaryItemState)
  const [diaryTemp, setDiaryTemp ] = useRecoilState(diaryTempState)
  const [diaryIsEdit, setDiaryIsEdit] = useRecoilState(diaryEditState)
  const [diaryIsDetail, setDiaryIsDetail ] = useRecoilState(diaryDetailState)
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)

  useEffect(() => {
    
    if (diaryIsDetail === true) {

      setTitle(diaryItem.title)
      setContent(diaryItem.content)
      setWeatherIndex(weatherList.indexOf(diaryItem.weather))
      setDate(diaryItem.date.slice(0, 10)) 
      return
    }

    setTitle(diaryTemp.title)
    setContent(diaryTemp.content)
    setWeatherIndex(diaryTemp.weatherIndex)
    setDate(diaryTemp.date)
    
  }, [diaryIsEdit, diaryIsDetail])

  const handleInputContent = (input) => {
    if (input.length <= 44) {
      setContent(input)
    }
  }

  const handleClickCreatePaintingButton = () => {
    setLoadedPaintingInfo({})
    setDiaryIsEdit(true)
    setDiaryTemp({
      'date': date,
      'weatherIndex': weatherIndex,
      'title': title,
      'content': content
    })
    navigate('/painting/create')
  }

  const handleClickLoadPaintingButton = () => {
    setDiaryIsEdit(true)
    setDiaryTemp({
      'date': date,
      'weatherIndex': weatherIndex,
      'title': title,
      'content': content
    })
    navigate('/painting/load')
  }

  const handleClickWeatherBox = (index) => {
    setSelectOpen(false)
    setWeatherIndex(index)
  }

  const handleClickCloseButton = () => {
    setDiaryIsEdit(false)
    setDiaryIsDetail(false)
    setDiaryTemp({
      'date': dt.getFullYear()+ '-' + (dt.getMonth()+1).toString().padStart(2,'0') + '-' + dt.getDate().toString().padStart(2,'0'),
      'weatherIndex': 0,
      'title': "",
      'content': ""
    })
    navigate(-1)
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
    setDiaryTemp({
      'date': dt.getFullYear()+ '-' + (dt.getMonth()+1).toString().padStart(2,'0') + '-' + dt.getDate().toString().padStart(2,'0'),
      'weatherIndex': 0,
      'title': "",
      'content': ""
    })
    saveDiaryCallback({
      'name': profileInfo.name, 
      'drawing_id': loadedPaintingInfo.drawing_id, 
      'title': title, 
      'content': content, 
      'weather': weatherList[weatherIndex], 
      'date': date
      })
  }

  const handleClickEditButton = () => {
    setDiaryIsEdit(false)
    setDiaryIsDetail(false)
    updateDiaryCallback({
      'id': diaryItem.id, 
      'name': profileInfo.name,
      'drawing_id': diaryItem.drawing_id,
      'date': date,
      'title': title, 
      'content': content, 
      'weather': weatherList[weatherIndex] 
    })
    navigate('/diary')
  }

  const handleClickRemoveButton = () => {
    setDiaryIsEdit(false)
    setDiaryIsDetail(false)

    if (window.confirm("정말 삭제하시겠습니까?")) {
      diaryRemoveCallback({
        'id': diaryItem.id, 
        'name': profileInfo.name
      })
      navigate('/diary')
    }
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
    return `${dateList[0]}년 ${dateList[1]}월 ${dateList[2]}일`
  }

  return (
    <LetterEditorComponentBody>
      <div onClick={() => navigate('/diary')} style={{marginRight: "20px", marginTop: "20px"}}>
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
              <button onClick={() => setSelectOpen(!selectOpen)}><img src={`/icons/${weatherList[weatherIndex]}icon.svg`}></img></button>           
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
        { (diaryIsEdit || diaryIsDetail) ? 
          <DiaryPaintingTag>
            <img style={{ width: "550px", height: "280px" }} src={ loadedPaintingInfo.drawing_base64 } />
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
          { diaryIsDetail ?
            <LetterButtonGo onClick={handleClickEditButton}>수정</LetterButtonGo>
          : <LetterButtonGo onClick={handleClickCreateButton}>저장</LetterButtonGo>
          }
          {diaryIsDetail && <LetterButtonDel onClick={handleClickRemoveButton}>삭제하기</LetterButtonDel>}
        </LetterButton>
      </section>      

    </LetterEditorComponentBody>

  )
}

export default DiaryComponent