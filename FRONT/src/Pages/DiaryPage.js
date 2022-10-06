import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDiaryCallback } from '../Functions/useDiaryCallback'

import { useRecoilState } from 'recoil'
import { loadedPaintingInfoState, diaryDetailState, diaryTempState, profileState, totalDiaryListState, diaryItemState, diaryEditState } from '../store/atoms'

import "../App.css"
import { OrangeButton250, LightButton250, DiaryBlock, DiaryContent, ChildProfileTag, LetterPageHeader, BrownText100, LightButton120 } from '../Style/Components'
import { DiaryCardComponent } from '../Components/DiaryCardComponent'


function DiaryPage() {
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


  return (
    <div className='LetterPageHome'>
      <LetterPageHeader>
        <div style={{display: "flex", alignItems: "center", marginLeft: "10px", marginTop: "-50px" }}>
          <LightButton120 onClick={() => navigate("/child")}>닫기</LightButton120>
          <BrownText100>일기 쓰기</BrownText100>
        </div>
        <ChildProfileTag style={{marginTop: "20px", marginRight: "40px"}} onClick={handleClickChildProfile}><img src={`/images/profileImage_${profileInfo.image_num}.svg`} />{profileInfo.name}</ChildProfileTag>
      </LetterPageHeader>

      <div style={{ display: 'flex', marginTop: "-50px", marginBottom: "25px" }}>
        { sortType === "latest" ?
          <OrangeButton250 style={{marginLeft: "70px"}}>최신순</OrangeButton250>
        :
          <LightButton250 style={{marginLeft: "70px"}} onClick={latestType}>최신순</LightButton250>
        }
        { sortType === "oldest" ?
          <OrangeButton250>오래된순</OrangeButton250>
        :
          <LightButton250 onClick={oldestType}>오래된순</LightButton250>
        }
      </div>

      <DiaryContent>

        <DiaryBlock onClick={handleClickCreateDiaryButton}>
          <img style={{width: "100px", height: "100px"}} src='/icons/plus_brown.svg' />
        </DiaryBlock>

        { getProcessedPaintingList().map((info, key) => (
          <div key={key} onClick={() => handleClickLoadDiaryButton(info)}>
            <DiaryCardComponent isPointer={true} info={info} />
          </div>
        ))}

      </DiaryContent>
    </div>
  )
}

export default DiaryPage