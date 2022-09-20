import React, { useState } from 'react'
import { DiaryComponentTag, DiaryInputTag, DiaryContentInputTag, DiaryWeatherBoxTag, DiaryPaintingTag } from '../Style/Components'


export function DiaryComponent(props) {
  const [title, setTitle] = useState(props.diaryId)
  const [content, setContent] = useState(props.diaryId)
  const [weather, setWeather] = useState('맑음')
  const [date, setDate] = useState('')
  const [selectOpen, setSelectOpen] = useState(false)

  return (
    <>
      <DiaryComponentTag>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <label for='date'>날짜 :</label>
            <DiaryInputTag id='date' value={date} onInput={((e) => setDate(e.target.value))} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label for='weather'>날씨 :</label>
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
          <label for='title'>제목 :</label>
          <DiaryInputTag id='title' style={{ width: '490px' }} value={title} onInput={((e) => setTitle(e.target.value))} />
        </div>
        <DiaryPaintingTag></DiaryPaintingTag>
        <DiaryContentInputTag style={{ width: '600px', height: '200px' }} value={content} onInput={((e) => setContent(e.target.value))} />
      </DiaryComponentTag>
    </>
  )
}