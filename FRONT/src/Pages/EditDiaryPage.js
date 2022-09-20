import React from 'react'
import { DiaryComponent } from '../Components/DiaryComponent'
import { LogoTag, ChildButtonTag1, ChildButtonTag2, ChildButtonTag3 } from '../Style/Components'
import { useParams } from  'react-router-dom'


function EditDiaryPage() {
  const { diaryId } = useParams()

  const handleClickCloseButton = () => {
  }

  const handleClickDeleteButton = () => {
  }
  
  const handleClickEditButton = () => {
  }
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
      <LogoTag src='/icons/logo.svg' />
      <DiaryComponent diaryId={diaryId}></DiaryComponent>
      <div>
        <ChildButtonTag1 onClick={handleClickCloseButton}>닫기</ChildButtonTag1>
        <ChildButtonTag3 onClick={handleClickDeleteButton}>삭제</ChildButtonTag3>
        <ChildButtonTag2 onClick={handleClickEditButton}>수정</ChildButtonTag2>
      </div>
    </div>
  );
}

export default EditDiaryPage