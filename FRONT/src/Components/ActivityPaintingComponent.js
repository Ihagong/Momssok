import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDiaryCallback } from '../Functions/useDiaryCallback'

import { useRecoilState } from 'recoil'
import { drawingDetailState, loadedPaintingInfoState, diaryDetailState, diaryTempState, profileState, totalDiaryListState, diaryItemState, diaryEditState, loadedPaintingListState } from '../store/atoms'

import { PaintingCardTag, LightButton250, DiaryBlock, DiaryContent, ChildProfileTag, LetterPageHeader, BrownText100, LightButton120 } from '../Style/Components'
import { PaintingCardComponent } from '../Components/PaintingCardComponent'


export function ActivityPaintingComponent({ info }) {
  const navigate = useNavigate()
  const { getAllDiaryCallback } = useDiaryCallback()

  const [sortType, setSortType] = useState("latest")

  const [loadedPaintingList, setLoadedPaintingList] = useRecoilState(loadedPaintingListState)
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [diaryList, setDiaryList] = useRecoilState(totalDiaryListState)
  const [diaryItem, setDiaryItem] = useRecoilState(diaryItemState)
  const [diaryIsEdit, setDiaryIsEdit] = useRecoilState(diaryEditState)
  const [diaryIsDetail, setDiaryIsDetail ] = useRecoilState(diaryDetailState)
  const [diaryTemp, setDiaryTemp ] = useRecoilState(diaryTempState)
  const [loadedPaintingInfo, setLoadedPaintingInfo] = useRecoilState(loadedPaintingInfoState)
  const [drawingIsDetail, setDrawingIsDetail] = useRecoilState(drawingDetailState)



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

  const handleClickLoadPaintingButton = (info) => {
    console.log(info)
    setLoadedPaintingInfo({ drawing_id: info.drawing_id, drawing_base64: info.drawing_base64 })
    setDrawingIsDetail(true)
    navigate('/painting/create')
  }

  const getProcessedPaintingList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(new Date(b.modified_date).getTime()) - parseInt(new Date(a.modified_date).getTime());
      } else {
        return parseInt(new Date(a.modified_date).getTime()) - parseInt(new Date(b.modified_date).getTime());
      }
    }

    const copyList = JSON.parse(JSON.stringify(loadedPaintingList))
    const sortedList = copyList.sort(compare)
    return sortedList
  }
  
  return (
    <div className='LetterPageHome'>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 3fr)', marginLeft: "50px" }}>
        {getProcessedPaintingList().map((info, key) => (
          <div key={info.drawing_id} onClick={() => handleClickLoadPaintingButton(info)}> 
            <PaintingCardComponent isPointer={false} key={key} info={info} />
          </div>
        ))}
      </div>
    </div>
  )
}