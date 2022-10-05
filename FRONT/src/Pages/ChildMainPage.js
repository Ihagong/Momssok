import React, { useState } from 'react'
import { LogoTag, ChildMenuTag, ChildMenuTabTag, ChildMenuSelectedTabTag, ChildSubMenuTag, ChildSubMenuButtonTag, ChildProfileTag } from '../Style/Components'
import { useNavigate } from  'react-router-dom'

import { useRecoilState } from 'recoil'
import { diaryEditState, profileState } from '../store/atoms'
import { useDictionaryCallback } from '../Functions/useDictionaryCallback'


function ChildMainPage() {
  const [selectedTab, setSelctedTab] = useState(0)
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [diaryIsEdit, setDiaryIsEdit] = useRecoilState(diaryEditState)
  const { getAllDictionaryCallback } = useDictionaryCallback()


  const navigate = useNavigate()

  const handleClickChildProfile = () => {
    navigate('/profile')
  }

  const handleClickCreatePaintingButton = () => {
    setDiaryIsEdit(false)
    navigate('/painting/load')
  }

  const handleClickDiaryButton = () => {
    navigate('/diary')
  }

  const handleClickCreateLetterButton = () => {
    navigate('/letter/create')
  }

  const handleClickLetterButton = () => {
    navigate('/letter')
  }

  const handleClickPromiseButton = () => {
    navigate('/promise')
  }

  const handleClickKidsSongButton = () => {
    navigate('/song')
  }

  const handleClickCalendarButton = () => {
    navigate('/calendar')
  }

  const handleClickAnimalDictionaryButton = () => {
    getAllDictionaryCallback(profileInfo.name)
    console.log(profileInfo.name)
  }

  return (
    <>
      <ChildMenuTag>
        <LogoTag style={{marginRight: "20px"}} onClick={handleClickChildProfile} src='icons/logo.svg' />
        {selectedTab === 0 ? <ChildMenuSelectedTabTag><img src='icons/Dinosaur.svg' alt='그림' />그림</ChildMenuSelectedTabTag>
          : <ChildMenuTabTag onClick={() => setSelctedTab(0)}><img src='icons/Dinosaur.svg' alt='그림' />그림</ChildMenuTabTag>}
        {selectedTab === 1 ? <ChildMenuSelectedTabTag><img src='icons/dogicon.svg' alt='활동' />활동</ChildMenuSelectedTabTag>
          : <ChildMenuTabTag onClick={() => setSelctedTab(1)}><img src='icons/dogicon.svg' alt='활동' />활동</ChildMenuTabTag>}
        {selectedTab === 2 ? <ChildMenuSelectedTabTag><img src='icons/bearicon.svg' alt='편지' />편지</ChildMenuSelectedTabTag>
          : <ChildMenuTabTag onClick={() => setSelctedTab(2)}><img src='icons/bearicon.svg' alt='편지' />편지</ChildMenuTabTag>}
        {selectedTab === 3 ? <ChildMenuSelectedTabTag><img src='icons/playicon.svg' alt='놀이' />놀이</ChildMenuSelectedTabTag>
          : <ChildMenuTabTag onClick={() => setSelctedTab(3)}><img src='icons/playicon.svg' alt='놀이' />놀이</ChildMenuTabTag>}
        <ChildProfileTag style={{marginLeft: "30px"}} onClick={handleClickChildProfile}><img src={`/images/profileImage_${profileInfo.image_num}.svg`} />{profileInfo.name}</ChildProfileTag>
        
      </ChildMenuTag>
      <ChildSubMenuTag>
        {selectedTab === 0 ?
          <>
            <ChildSubMenuButtonTag onClick={handleClickCreatePaintingButton}>
              <LogoTag src='/icons/draw.svg' />
              그림 그리기
            </ChildSubMenuButtonTag>
            <ChildSubMenuButtonTag onClick={handleClickDiaryButton}>
              <LogoTag style={{marginBottom: '-10px'}} src='/icons/diary.svg' />
              일기 쓰기
            </ChildSubMenuButtonTag>
          </>
          : null }

        {selectedTab === 1 ?
          <>
          <ChildSubMenuButtonTag onClick={handleClickPromiseButton}>
            <LogoTag src='/icons/stampicon.svg' />
            칭찬 도장
          </ChildSubMenuButtonTag>
          <ChildSubMenuButtonTag onClick={handleClickCalendarButton}>
            <LogoTag src='/icons/calendaricon.svg' />
            표정 달력
          </ChildSubMenuButtonTag>
        </>
          : null }
        {selectedTab === 2 ?
          <>
            <ChildSubMenuButtonTag onClick={handleClickCreateLetterButton}>
              <LogoTag src='/icons/lettericon.svg' />
              편지 쓰기
            </ChildSubMenuButtonTag>
            <ChildSubMenuButtonTag onClick={handleClickLetterButton}>
              <LogoTag src='/icons/airplane.svg' />
              편지 읽기
            </ChildSubMenuButtonTag>
          </>
          : null }

        {selectedTab === 3 ?
          <>
            <ChildSubMenuButtonTag onClick={handleClickAnimalDictionaryButton}>
              <LogoTag src='/icons/bookicon.svg' />
              동물 도감
            </ChildSubMenuButtonTag>
            <ChildSubMenuButtonTag onClick={handleClickKidsSongButton}>
              <LogoTag src='/icons/songicon.svg' />
              동요 나라
            </ChildSubMenuButtonTag>
          </>
          : null }
      </ChildSubMenuTag>
    </>
  );
}

export default ChildMainPage