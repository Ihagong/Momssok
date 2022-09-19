import React, { useState } from 'react'
import { LogoTag, ChildMenuTag, ChildMenuTabTag, ChildMenuSelectedTabTag, ChildSubMenuTag, ChildSubMenuButtonTag } from '../Style/Components'


function ChildMainPage() {
  const [selectedTab, setSelctedTab] = useState(0)

  return (
    <>
      <ChildMenuTag>
        <LogoTag src='icons/logo.svg'></LogoTag>
        {selectedTab === 0 ? <ChildMenuSelectedTabTag><img src='icons/Dinosaur.svg' alt='그림' />그림</ChildMenuSelectedTabTag>
          : <ChildMenuTabTag onClick={() => setSelctedTab(0)}><img src='icons/Dinosaur.svg' alt='그림' />그림</ChildMenuTabTag>}
        {selectedTab === 1 ? <ChildMenuSelectedTabTag><img src='icons/Dinosaur.svg' alt='약속' />약속</ChildMenuSelectedTabTag>
          : <ChildMenuTabTag onClick={() => setSelctedTab(1)}><img src='icons/Dinosaur.svg' alt='약속' />약속</ChildMenuTabTag>}
        {selectedTab === 2 ? <ChildMenuSelectedTabTag><img src='icons/Dinosaur.svg' alt='편지' />편지</ChildMenuSelectedTabTag>
          : <ChildMenuTabTag onClick={() => setSelctedTab(2)}><img src='icons/Dinosaur.svg' alt='편지' />편지</ChildMenuTabTag>}
        {selectedTab === 3 ? <ChildMenuSelectedTabTag><img src='icons/Dinosaur.svg' alt='놀이' />놀이</ChildMenuSelectedTabTag>
          : <ChildMenuTabTag onClick={() => setSelctedTab(3)}><img src='icons/Dinosaur.svg' alt='놀이' />놀이</ChildMenuTabTag>}
      </ChildMenuTag>
      <ChildSubMenuTag>
        {selectedTab === 0 ?
          <>
            <ChildSubMenuButtonTag>
              <LogoTag src='icons/draw.svg' />
              그림 그리기
            </ChildSubMenuButtonTag>
            <ChildSubMenuButtonTag>
              <LogoTag src='icons/draw.svg' />
              일기 쓰기
            </ChildSubMenuButtonTag>
          </>
          : null }
        {selectedTab === 2 ?
          <>
            <ChildSubMenuButtonTag>
              <LogoTag src='icons/draw.svg' />
              편지 쓰기
            </ChildSubMenuButtonTag>
            <ChildSubMenuButtonTag>
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