import React from 'react'
import { DiaryComponent } from '../Components/DiaryComponent'
import { LogoTag, ChildButtonTag1, ChildButtonTag2 } from '../Style/Components'

function CreateDiaryPage() {
  const handleClickCloseButton = () => {
  }

  const handleClickCreateButton = () => {
  }
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
      <LogoTag src='/icons/logo.svg' />
      <DiaryComponent></DiaryComponent>
      <div>
        <ChildButtonTag1 onClick={handleClickCloseButton}>닫기</ChildButtonTag1>
        <ChildButtonTag2 onClick={handleClickCreateButton}>저장</ChildButtonTag2>
      </div>
    </div>
  );
}

export default CreateDiaryPage