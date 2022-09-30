import React, { useState } from 'react'
import { DiaryComponentTag, DiaryInputTag, DiaryContentInputTag, DiaryWeatherBoxTag, DiaryPaintingTag } from '../Style/Components'


export function DiaryComponent(props) {
  const [title, setTitle] = useState(props.diaryId)
  const [content, setContent] = useState(props.diaryId)
  const [weather, setWeather] = useState('맑음')
  const [date, setDate] = useState('')
  const [selectOpen, setSelectOpen] = useState(false)

  const contentGrid = () => {
    let result = []
    const radiusIndex = { 0 : '10px 0 0 0', 10: '0 10px 0 0', 33: '0 0 0 10px', 43: '0 0 10px 0' }
    for (let i = 0; i < 44; i++) {
      if (Object.keys(radiusIndex).includes(`${i}`)) {
        console.log(1)
        result.push(<div key={i} style={{ backgroundColor: 'white', zIndex: 1, borderRadius: radiusIndex[i] }}></div>)
      } else {
        result.push(<div key={i} style={{ backgroundColor: 'white', zIndex: 1 }}></div>)
      }
    }
    // result[0].style = { borderRadius: '10px' }
    return result
  }

  const handleInputContent = (input) => {
    if (input.length <= 44) {
      setContent(input)
    }
  }
  const grid = contentGrid()

  return (
    <>
      <DiaryComponentTag>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <label htmlFor='date'>날짜 :</label>
            <DiaryInputTag id='date' value={date} onInput={((e) => setDate(e.target.value))} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor='weather'>날씨 :</label>
            <DiaryWeatherBoxTag>
              <button onClick={() => setSelectOpen(!selectOpen)}><img src='/icons/cloud.svg' alt='맑음'></img></button>
              { selectOpen ?
                <ul>
                  <li onClick={() => {setSelectOpen(!selectOpen); setWeather('맑음')}}><img src='/icons/cloud.svg' alt='맑음'></img></li>
                  <li onClick={() => {setSelectOpen(!selectOpen); setWeather('흐림')}}><img src='/icons/cloud.svg' alt='흐림'></img></li>
                  <li onClick={() => {setSelectOpen(!selectOpen); setWeather('비')}}><img src='/icons/cloud.svg' alt='비'></img></li>
                  <li onClick={() => {setSelectOpen(!selectOpen); setWeather('눈')}}><img src='/icons/cloud.svg' alt='눈'></img></li>
                </ul>
              : null }
            </DiaryWeatherBoxTag>
          </div>
        </div>
        <div>
          <label htmlFor='title'>제목 :</label>
          <DiaryInputTag id='title' style={{ width: '490px' }} value={title} onInput={((e) => setTitle(e.target.value))} />
        </div>
        <DiaryPaintingTag></DiaryPaintingTag>
        <div style={{ display: 'flex' }}>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(11, 3fr)', gridTemplateRows: 'repeat(4, 1fr)', width: '600px', height: '200px',
            backgroundColor: 'var(--Beige-Stroke)', outline: '1px solid var(--Beige-Stroke)', gridGap: '1px', zIndex: 1, borderRadius: '10px'
          }}>
              <DiaryContentInputTag maxLength={44} value={content} onInput={(e) => handleInputContent(e.target.value)} />
              { grid }
          </div>
        </div>
      </DiaryComponentTag>
    </>
  )
}