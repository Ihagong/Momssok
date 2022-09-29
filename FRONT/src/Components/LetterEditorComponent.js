import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useRecoilState } from 'recoil'
import { profileState, profileInfoState } from '../store/atoms'
import { useLetterCallback } from '../Functions/useLetterCallback'

import { LogoTag, EditorBody, LetterTitleBody, LetterTitleDiv, LetterTitleInput, LetterContentBody, LetterContentDiv, LetterContentTextArea, LetterEditorComponentBody, LetterButton, LetterButtonBack, LetterButtonGo, LetterButtonDel } from "../Style/Components"
import { getStringDate } from "../util/date"

const LetterEditorComponent = ({ isDetail, letterItem }) => {
  const navigate = useNavigate()

  const [profileName, setProfileName] = useRecoilState(profileState)
  const [profileList, setProfileList] = useRecoilState(profileInfoState)

  const { letterSendCallback, letterRemoveCallback } = useLetterCallback()

  const titleRef = useRef()
  const contentRef = useRef()

  const [author, setAuthor] = useState("")
  const [receiver, setReceiver] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")


  // CREATE
  const onCreate = (receiver, title, content) => {
    letterSendCallback(profileName, receiver, title, content)
  }
  // REMOVE
  const onRemove = (targetId) => {
    letterRemoveCallback(targetId)
  }


  const handleSubmit = () => {
    if (title.length < 1) {
      titleRef.current.focus()
      return
    } 
    if (content.length < 1) {
      contentRef.current.focus()
      return
    } {
      if (!isDetail) {
        onCreate(receiver, title, content)
      } else {
        navigate("/letter/create", { replace: true })
        return
      }
    }
    navigate("/letter", { replace: true })
  }

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(letterItem.letter_id)
      navigate("/letter", { replace: true })
    }
  }

  const handleClickRadioButton = (e) => {
    setReceiver(e.target.value)
  }

  useEffect(() => {

    if (isDetail) {
      setAuthor(letterItem.author)
      setReceiver(letterItem.receiver);
      setTitle(letterItem.title);
      setContent(letterItem.content);
      setDate(getStringDate(new Date(letterItem.date)))
    }
  }, [isDetail, letterItem]);
  
  return (
    <LetterEditorComponentBody>
      <div style={{marginRight: "20px", marginTop: "20px"}}>
        <LogoTag src='/icons/logo.svg' />
      </div>

      <EditorBody>
        <LetterTitleBody>
          <div>{isDetail ? "시간 : " : "누가 : "}</div>
          <LetterTitleDiv>{isDetail ? date : profileName}</LetterTitleDiv>
        </LetterTitleBody>

        <LetterTitleBody>
          <div>{isDetail ? "누가 : " : "누구 : "}</div>
          {isDetail ? <LetterTitleDiv>{author}</LetterTitleDiv> : 
          <LetterTitleDiv>
            {profileList.filter((it) => it.name !== profileName).map((it, idx) => (
              <label key={idx} style={{marginRight: "10px"}}>
                <input
                  type="radio"
                  value={it.name}
                  checked={receiver === `${it.name}`}
                  onChange= {handleClickRadioButton} />
                <span> {it.name}</span>
              </label>
            ))}
          </LetterTitleDiv>
          }
        </LetterTitleBody>

        <LetterTitleBody>
          <div>제목 : </div>
          {isDetail ? <LetterTitleDiv>{title}</LetterTitleDiv> : <LetterTitleInput ref={titleRef} value={title} onChange={(e) => setTitle(e.target.value)} />}
        </LetterTitleBody>

        <LetterContentBody>
          {isDetail ? <LetterContentDiv>{content}</LetterContentDiv> :
            <LetterContentTextArea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          }
        </LetterContentBody>
      </EditorBody>
      
      <section>
        <LetterButton>
          <LetterButtonBack onClick={() => navigate(-1)}>닫기</LetterButtonBack>
          <LetterButtonGo onClick={handleSubmit}>{isDetail ? "답장하기" : "보내기"}</LetterButtonGo>
          {isDetail && <LetterButtonDel onClick={handleRemove}>삭제하기</LetterButtonDel>}
        </LetterButton>
      </section>

    </LetterEditorComponentBody>

  )
}

export default LetterEditorComponent
