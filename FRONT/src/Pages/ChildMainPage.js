import React, { useState } from 'react'
import { LogoTag, ChildMenuTag, ChildMenuTabTag, ChildMenuSelectedTabTag, ChildSubMenuTag, ChildSubMenuButtonTag, ChildProfileTag } from '../Style/Components'
import { useNavigate } from  'react-router-dom'


function ChildMainPage() {
  const [selectedTab, setSelctedTab] = useState(0)

  const navigate = useNavigate()

  const handleClickChildProfile = () => {
    navigate('/profile')
  }

  const handleClickCreatePaintingButton = () => {
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

  return (
    <>
      <ChildMenuTag>
        <LogoTag src='icons/logo.svg' />
        {selectedTab === 0 ? <ChildMenuSelectedTabTag><img src='icons/Dinosaur.svg' alt='그림' />그림</ChildMenuSelectedTabTag>
          : <ChildMenuTabTag onClick={() => setSelctedTab(0)}><img src='icons/Dinosaur.svg' alt='그림' />그림</ChildMenuTabTag>}
        {selectedTab === 1 ? <ChildMenuSelectedTabTag><img src='icons/Dinosaur.svg' alt='약속' />약속</ChildMenuSelectedTabTag>
          : <ChildMenuTabTag onClick={() => setSelctedTab(1)}><img src='icons/Dinosaur.svg' alt='약속' />약속</ChildMenuTabTag>}
        {selectedTab === 2 ? <ChildMenuSelectedTabTag><img src='icons/Dinosaur.svg' alt='편지' />편지</ChildMenuSelectedTabTag>
          : <ChildMenuTabTag onClick={() => setSelctedTab(2)}><img src='icons/Dinosaur.svg' alt='편지' />편지</ChildMenuTabTag>}
        {selectedTab === 3 ? <ChildMenuSelectedTabTag><img src='icons/Dinosaur.svg' alt='놀이' />놀이</ChildMenuSelectedTabTag>
          : <ChildMenuTabTag onClick={() => setSelctedTab(3)}><img src='icons/Dinosaur.svg' alt='놀이' />놀이</ChildMenuTabTag>}
        <ChildProfileTag onClick={handleClickChildProfile}><img src='icons/boy.svg' />아이 이름</ChildProfileTag>
        
      </ChildMenuTag>
      <ChildSubMenuTag>
        {selectedTab === 0 ?
          <>
            <ChildSubMenuButtonTag onClick={handleClickCreatePaintingButton}>
              <LogoTag src='icons/draw.svg' />
              그림 그리기
            </ChildSubMenuButtonTag>
            <ChildSubMenuButtonTag onClick={handleClickDiaryButton}>
              <LogoTag src='icons/draw.svg' />
              일기 쓰기
            </ChildSubMenuButtonTag>
          </>
          : null }
        {selectedTab === 2 ?
          <>
            <ChildSubMenuButtonTag onClick={handleClickCreateLetterButton}>
              <LogoTag src='icons/draw.svg' />
              편지 쓰기
            </ChildSubMenuButtonTag>
            <ChildSubMenuButtonTag onClick={handleClickLetterButton}>
              <LogoTag src='icons/draw.svg' />
              편지 읽기
            </ChildSubMenuButtonTag>
          </>
          : null }
      </ChildSubMenuTag>
    </>
  );
}

export default ChildMainPage