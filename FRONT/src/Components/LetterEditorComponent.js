import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useRecoilState } from 'recoil'
import { totalLetterListState, LetterIdState } from '../store/atoms'


import { LogoTag, EditorBody, LetterTitleBody, LetterTitleDiv, LetterTitleInput, LetterContentBody, LetterContentDiv, LetterContentTextArea, LetterEditorComponentBody, LetterButton, LetterButtonBack, LetterButtonGo, LetterButtonDel } from "../Style/Components"
import { getStringDate } from "../util/date"

const LetterEditorComponent = ({ isDetail, originData }) => {
  const navigate = useNavigate()

  const [letterList, setLetterList] = useRecoilState(totalLetterListState)
  const [letterId, setLetterId] = useRecoilState(LetterIdState)

  const receiverRef = useRef()
  const titleRef = useRef()
  const contentRef = useRef()


  const [receiver, setReceiver] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")

  // CREATE
  const onCreate = (receiver, title, content) => {
    setLetterList([
      {
        letterId: letterId,
        date: new Date().getTime(),
        author: "다은이",
        receiver,
        title,
        content,
      }, ...letterList
    ])
    setLetterId(letterId + 1)

  }
  // REMOVE
  const onRemove = (targetId) => {
    setLetterList(letterList.filter((it) => it.letterId !== targetId))
  }


  const handleSubmit = () => {
    if (receiver.length < 1) {
      receiverRef.current.focus()
      return
    } 
    if (title.length < 1) {
      titleRef.current.focus()
      return
    } 
    if (content.length < 1) {
      contentRef.current.focus()
      return
    } {
      if (!isDetail) {
        setLetterId(letterId + 1)
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
      onRemove(originData.letterId)
      navigate("/letter", { replace: true })
    }
  }

  useEffect(() => {
    if (isDetail) {
      setReceiver(originData.receiver);
      setTitle(originData.title);
      setContent(originData.content);
      setDate(getStringDate(new Date(parseInt(originData.date))))
    }
  }, [isDetail, originData]);
  
  return (
    <LetterEditorComponentBody>
      <div style={{marginRight: "20px", marginTop: "20px"}}>
        <LogoTag src='/icons/logo.svg' />
      </div>

      <EditorBody>
        <LetterTitleBody>
          <div>{isDetail ? "시간 : " : "누가 : "}</div>
          <LetterTitleDiv>{isDetail ? date : "다은이"}</LetterTitleDiv>
        </LetterTitleBody>

        <LetterTitleBody>
          <div>누구 : </div>
          {isDetail ? <LetterTitleDiv>{receiver}</LetterTitleDiv> : <LetterTitleInput ref={receiverRef} value={receiver} onChange={(e) => setReceiver(e.target.value)} />}
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
