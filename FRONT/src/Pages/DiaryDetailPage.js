import React from 'react'
import { useNavigate } from "react-router-dom"

import { DiaryComponent } from '../Components/DiaryComponent'
import { LogoTag, LetterEditorComponentBody, LetterButton, LetterButtonBack, LetterButtonGo, LetterButtonDel } from "../Style/Components"


function DiaryDetailPage() {
  const navigate = useNavigate()

  const handleClickCloseButton = () => {
    navigate(-1)
  }

  const handleClickDeleteButton = () => {
  }

  const handleClickEditButton = () => {
  }
  
  return (
    <LetterEditorComponentBody>
      <div style={{marginRight: "20px", marginTop: "20px"}}>
        <LogoTag src='/icons/logo.svg' />
      </div>
      <DiaryComponent></DiaryComponent>
      <section>
        <LetterButton>
          <LetterButtonBack onClick={handleClickCloseButton}>닫기</LetterButtonBack>
          <LetterButtonGo onClick={handleClickDeleteButton}>삭제</LetterButtonGo>
          <LetterButtonDel onClick={handleClickEditButton}>수정</LetterButtonDel>
        </LetterButton>
      </section>
    </LetterEditorComponentBody>
  );
}

export default DiaryDetailPage