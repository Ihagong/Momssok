import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"


import { LetterDispatchContext } from "../App"
import { LogoTag } from "../Style/Components"
import { getStringDate } from "../util/date"

const LetterEditorComponent = ({ isDetail, originData }) => {
  const navigate = useNavigate()

  const receiverRef = useRef()
  const titleRef = useRef()
  const contentRef = useRef()

  const { onCreate, onRemove } = useContext(LetterDispatchContext)

  const [receiver, setReceiver] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")


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
    <div className="LetterEditorComponent">
      <div style={{marginRight: "20px", marginTop: "20px"}}>
        <LogoTag src='/icons/logo.svg' />
      </div>

      <div className="EditorBody">
        <section className="LetterTitleBody">
          <div>{isDetail ? "시간 : " : "누가 : "}</div>
          <div className="LetterTitle">{isDetail ? date : "다은이"}</div>
        </section>

        <section className="LetterTitleBody">
          <div>누구 : </div>
          {isDetail ? <div className="LetterTitle">{receiver}</div> : <input className="LetterTitle" ref={receiverRef} value={receiver} onChange={(e) => setReceiver(e.target.value)} />}
        </section>

        <section className="LetterTitleBody">
          <div>제목 : </div>
          {isDetail ? <div className="LetterTitle">{title}</div> : <input className="LetterTitle" ref={titleRef} value={title} onChange={(e) => setTitle(e.target.value)} />}
        </section>

        <section className="LetterContentBody">
          {isDetail ? <div className="LetterContent">{content}</div> :
            <textarea className="LetterContent"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          }
        </section>
      </div>
      
      <section>
        <div className="LetterButton">
          <button className="LetterButtonBack" onClick={() => navigate(-1)}>닫기</button>
          <button className="LetterButtonGo" onClick={handleSubmit}>{isDetail ? "답장하기" : "보내기"}</button>
          {isDetail && <button className="LetterButtonDel" onClick={handleRemove}>삭제하기</button>}
        </div>
      </section>

    </div>

  )
}

export default LetterEditorComponent
