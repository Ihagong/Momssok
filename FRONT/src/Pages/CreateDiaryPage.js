import React from 'react'
import { useNavigate } from "react-router-dom"

import { DiaryComponent } from '../Components/DiaryComponent'
import { LogoTag, ChildButtonTag1, ChildButtonTag2, EditorBody, LetterTitleBody, LetterTitleDiv, LetterTitleInput, LetterContentBody, LetterContentDiv, LetterContentTextArea, LetterEditorComponentBody, LetterButton, LetterButtonBack, LetterButtonGo, LetterButtonDel } from "../Style/Components"


function CreateDiaryPage() {
  const navigate = useNavigate()

  const handleClickCloseButton = () => {
    navigate(-1)
  }

  const handleClickCreateButton = () => {
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
          <LetterButtonGo onClick={handleClickCreateButton}>저장</LetterButtonGo>
        </LetterButton>
      </section>
    </LetterEditorComponentBody>
  );
}

export default CreateDiaryPage