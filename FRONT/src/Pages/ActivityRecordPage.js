import React, { useEffect, useState, PureComponent } from 'react'
import { useNavigate, useLocation } from  'react-router-dom'
import { ParentInfo, ParentTitle, PaintingCardTag, JuaBrown, JuaBrownLight, OrangeButton250, LightButton250, EditProfileButtonTag, ReportSelectedTabTag, ReportTabTag, EmotionReportTag } from '../Style/Components'
import { PaintingCardComponent } from '../Components/PaintingCardComponent'

import { useRecoilState } from 'recoil'
import { profileState, parentActiveState, loadedPaintingListState, loadedPaintingInfoState, diaryEditState, drawingDetailState } from '../store/atoms'
import { useReportCallback } from '../Functions/useReportCallback'
import { usePaintingCallback } from '../Functions/usePaintingCallback'

function ActivityRecordPage() {
  const [loadedPaintingList, setLoadedPaintingList] = useRecoilState(loadedPaintingListState)
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [parentActive, setParentActive] = useRecoilState(parentActiveState)
  const { getDailyEmotionCallback, getWeeklyEmotionCallback } = useReportCallback()
  const [age, setAge] = useState(new Date().getFullYear() - new Date(profileInfo.birthday).getFullYear() + 1)
  const [selectedTab, setSelectedTab] = useState(0)

  const navigate = useNavigate()
  
  const { getAllPaintingCallback } = usePaintingCallback()
  const [loadedPaintingInfo, setLoadedPaintingInfo] = useRecoilState(loadedPaintingInfoState)
  const [diaryIsEdit, setDiaryIsEdit] = useRecoilState(diaryEditState)
  const [drawingIsDetail, setDrawingIsDetail] = useRecoilState(drawingDetailState)

  const [sortType, setSortType] = useState("latest")

  useEffect(() => {
    getAllPaintingCallback(profileInfo.name)
  }, [])
  
  const handleClickCreatePaintingButton = () => {
    setLoadedPaintingInfo({})
    navigate('/painting/create')
  }

  const handleClickLoadPaintingButton = (info) => {
    console.log(info)
    setLoadedPaintingInfo({ drawing_id: info.drawing_id, drawing_base64: info.drawing_base64 })
    if ( diaryIsEdit === true ) {
      navigate('/diary/create') 
    } else {
      setDrawingIsDetail(true)
      navigate('/painting/create')
    }
  }

  const handleClickParentButton = () => {
  }

  const handleClickChangeTab = (index) => {
    setSelectedTab(index)
  }

  const latestType = () => {
    setSortType("latest")
  }

  const oldestType = () => {
    setSortType("oldest")
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
    <>
      <ParentTitle style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex' }}>
          <img onClick={() => navigate('/profile/manage')} style={{ width: "130px", height: "130px", cursor: 'pointer' }} src={`/images/profileImage_${profileInfo.image_num}.svg`} />
          <ParentInfo>
            <JuaBrownLight style={{ fontSize: '32px' }}>{profileInfo.name}<span style={{ fontSize: '32px', color: 'gray'}}> | </span>{age}세</JuaBrownLight>
            <JuaBrown style={{ fontSize: '50px' }}>활동 내역</JuaBrown>
          </ParentInfo>
        </div>
        <EditProfileButtonTag onClick={handleClickParentButton}>프로필 등록</EditProfileButtonTag>
      </ParentTitle>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{display: 'flex' }}>
          { selectedTab === 0 ? <ReportSelectedTabTag onClick={() => handleClickChangeTab(0)}>일별</ReportSelectedTabTag>
            : <ReportTabTag onClick={() => handleClickChangeTab(0)}>일별</ReportTabTag> }
          { selectedTab === 1 ? <ReportSelectedTabTag onClick={() => handleClickChangeTab(1)}>주별</ReportSelectedTabTag>
            : <ReportTabTag onClick={() => handleClickChangeTab(1)}>주별</ReportTabTag> }
          { selectedTab === 2 ? <ReportSelectedTabTag onClick={() => handleClickChangeTab(2)}>월별</ReportSelectedTabTag>
            : <ReportTabTag onClick={() => handleClickChangeTab(2)}>월별</ReportTabTag> }
          { selectedTab === 3 ? <ReportSelectedTabTag onClick={() => handleClickChangeTab(3)}>전체</ReportSelectedTabTag>
            : <ReportTabTag onClick={() => handleClickChangeTab(3)}>전체</ReportTabTag> }
        </div>
      <div style={{ display: 'flex', marginTop: "-40px" }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 3fr)', marginLeft: "50px" }}>
        <PaintingCardTag style={{justifyContent: "center"}} onClick={handleClickCreatePaintingButton}><img src='/icons/plus_brown.svg' /></PaintingCardTag>
        {getProcessedPaintingList().map((info) => (
          <div key={info.drawing_id} onClick={() => handleClickLoadPaintingButton(info)}>
            {/* <PaintingCardComponent info={info} /> */}
          </div>
        ))}
      </div>
      </div>
    </>
  )
}

export default ActivityRecordPage