import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDiaryCallback } from '../Functions/useDiaryCallback'

import { useRecoilState } from 'recoil'
import { loadedPaintingInfoState, diaryDetailState, diaryTempState, profileState, totalDiaryListState, diaryItemState, diaryEditState } from '../store/atoms'

import { OrangeButton250, LightButton250, DiaryBlock, DiaryContent, ChildProfileTag, LetterPageHeader, BrownText100, LightButton120 } from '../Style/Components'
import { DiaryCardComponent } from '../Components/DiaryCardComponent'


export function ActivityDiaryComponent({ info }) {
  const navigate = useNavigate()
  const { getAllDiaryCallback } = useDiaryCallback()

  const [sortType, setSortType] = useState("latest")

  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [diaryList, setDiaryList] = useRecoilState(totalDiaryListState)
  const [diaryItem, setDiaryItem] = useRecoilState(diaryItemState)
  const [diaryIsEdit, setDiaryIsEdit] = useRecoilState(diaryEditState)
  const [diaryIsDetail, setDiaryIsDetail ] = useRecoilState(diaryDetailState)
  const [diaryTemp, setDiaryTemp ] = useRecoilState(diaryTempState)
  const [loadedPaintingInfo, setLoadedPaintingInfo] = useRecoilState(loadedPaintingInfoState)


  const latestType = () => {
    setSortType("latest")
  }

  const oldestType = () => {
    setSortType("oldest")
  }

  useEffect(() => {
    getAllDiaryCallback(profileInfo.name)
  }, [])


  const handleClickChildProfile = () => {
    navigate('/profile')
  }

  const handleClickCreateDiaryButton = () => {
    setDiaryIsEdit(false)
    const dt = new Date()
    setDiaryTemp({
      'date': dt.getFullYear()+ '-' + (dt.getMonth()+1).toString().padStart(2,'0') + '-' + dt.getDate().toString().padStart(2,'0'),
      'weatherIndex': 0,
      'title': "",
      'content': ""
    })
    navigate('/diary/create')
  }

  const handleClickLoadDiaryButton = (info) => {
    setLoadedPaintingInfo({ drawing_id: info.drawing_id, drawing_base64: info.drawing_base64 })
    setDiaryItem(info)
    setDiaryIsDetail(true)
    navigate(`/diary/${info.id}`)
  }

  const getProcessedPaintingList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(new Date(b.date).getTime()) - parseInt(new Date(a.date).getTime())
      } else {
        return parseInt(new Date(a.date).getTime()) - parseInt(new Date(b.date).getTime());
      }
    }
    const copyList = JSON.parse(JSON.stringify(diaryList))
    const sortedList = copyList.sort(compare)
    return sortedList
  }

  const emotionColor = (emotion) => {
    let result = ''
    if (emotion === '행복') {
      result = '#FFE27D'
    } else if (emotion === '슬픔') {
      result = '#7DC1FF'
    } else if (emotion === '놀람') {
      result = '#A6EFCC'
    } else if (emotion === '불안') {
      result = '#C6A6EF'
    } else if (emotion === '분노') {
      result = '#F8899D'
    }
    return result
  }

  const emotionName = (emotion) => {
    let result = ''
    if (emotion === '행복') {
      result = 'happy'
    } else if (emotion === '슬픔') {
      result = 'sad'
    } else if (emotion === '놀람') {
      result = 'surprised'
    } else if (emotion === '불안') {
      result = 'anxious'
    } else if (emotion === '분노') {
      result = 'angry'
    }
    return result
  }
  
  return (
    <div className='LetterPageHome'>
      <DiaryContent>
        { getProcessedPaintingList().map((info, key) => (
          <div key={key} onClick={() => handleClickLoadDiaryButton(info)}>
            <DiaryCardComponent key={key} isPointer={false} info={info} />
          </div>
        ))}
      </DiaryContent>
    </div>
  )
}