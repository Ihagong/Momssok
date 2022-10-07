import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { profileState, profileListState, letterVideoURLState, parentActiveState, userInfoState } from '../store/atoms'
import { useLetterCallback } from '../Functions/useLetterCallback'
import { VideoCaptureComponent } from '../Components/VideoCaptureComponent'

import { LogoTag, EditorBody, LetterTitleBody, LetterTitleDiv, LetterTitleInput, LetterContentBody, LetterContentDiv, LetterContentTextArea, LetterEditorComponentBody, LetterButton, LetterButtonBack, LetterButtonGo, LetterButtonDel } from '../Style/Components'
import { getStringDate } from '../util/date'


const LetterEditorComponent = ({ isDetail, letterItem }) => {
  const navigate = useNavigate()

  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [profileList, setProfileList] = useRecoilState(profileListState)
  const [letterVideoURL, setLetterVideoURL] = useRecoilState(letterVideoURLState)
  const [parentActive, setParentActive] = useRecoilState(parentActiveState)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  
  const { letterSendCallback, letterRemoveCallback, getLetterVideoFileCallback } = useLetterCallback()

  const titleRef = useRef()
  const contentRef = useRef()

  const [author, setAuthor] = useState('')
  const [receiver, setReceiver] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')

  const [videoFile, setVideoFile] = useState(null)
  const [videoButton, setVideoButton] = useState(0)

  useEffect(() => {
  }, [videoFile])

  // CREATE
  const onCreate = (receiver, title, content) => {
    letterSendCallback(videoFile, profileInfo.name, receiver, title, content)
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
        navigate('/letter/create', { replace: true })
        return
      }
    }
    navigate('/letter', { replace: true })
  }

  const handleRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onRemove(letterItem.letter_id)
      navigate('/letter', { replace: true })
    }
  }

  const handleClickRadioButton = (e) => {
    setReceiver(e.target.value)
  }

  const videoButtonClick = () => {
    if (videoButton === 0) {
      setVideoButton(1)
    } else {
      setVideoButton(0)
    }
  }

  useEffect(() => {

    if (isDetail) {
      setAuthor(letterItem.author)
      setReceiver(letterItem.receiver)
      setTitle(letterItem.title)
      setContent(letterItem.content)
      setDate(getStringDate(new Date(letterItem.date)))
    }
  }, [isDetail, letterItem])

  useEffect(() => {
    if (letterItem?.letter_id) {
      getLetterVideoFileCallback(letterItem?.letter_id)
    }
  }, [])
  
  return (
    <LetterEditorComponentBody>
      <div onClick={() => navigate('/child')} style={{marginRight: '20px', marginTop: '20px'}}>
        <LogoTag src='/icons/logo.svg' />
      </div>

      <EditorBody>
        <LetterTitleBody>
          <div>{isDetail ? '시간 : ' : '누가 : '}</div>
          <LetterTitleDiv>{ isDetail ? date : (parentActive ? userInfo.username : profileInfo.name) }</LetterTitleDiv>
        </LetterTitleBody>

        <LetterTitleBody>
          <div>{isDetail ? '누가 : ' : '누구 : '}</div>
          {isDetail ? <LetterTitleDiv>{author}</LetterTitleDiv> : 
          <LetterTitleDiv>
            { parentActive ?
              profileList.filter((it) => {return !it.is_parent}).map((it, idx) => (
                <label key={idx} style={{marginRight: '10px'}}>
                  <input type='radio' value={it.name} checked={receiver === `${it.name}`} onChange= {handleClickRadioButton} />
                  <span> {it.name}</span>
                </label>
              ))
              : profileList.filter((it) => {return it.name !== profileInfo.name}).map((it, idx) => (
                <label key={idx} style={{marginRight: '10px'}}>
                  <input type='radio' value={it.name} checked={receiver === `${it.name}`} onChange= {handleClickRadioButton} />
                  <span> {it.name}</span>
                </label>
              ))
            }
          </LetterTitleDiv>
          }
        </LetterTitleBody>

        <LetterTitleBody>
          <div>제목 : </div>
          { isDetail ? <LetterTitleDiv>{title}</LetterTitleDiv> : <LetterTitleInput ref={titleRef} value={title} onChange={(e) => setTitle(e.target.value)} /> }
        </LetterTitleBody>

        { videoButton === 0 ?
          <LetterContentBody>
            {isDetail ? <LetterContentDiv>{content}</LetterContentDiv> :
              <LetterContentTextArea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              >
              </LetterContentTextArea>
            }
          </LetterContentBody>
          :
          <LetterContentBody>
            <LetterContentDiv>
              { isDetail ? <video style={{ width: '450' }} src={letterVideoURL} type='video/webm' controls={true} />
              : <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', justifyContent: 'center' }}>
              <VideoCaptureComponent setVideoFile={setVideoFile} />
              </div> }
            </LetterContentDiv>
          </LetterContentBody>
        }

      </EditorBody>
      
      <section>
        <LetterButton>
          <LetterButtonBack onClick={() => navigate(-1)}>닫기</LetterButtonBack>
          <LetterButtonGo onClick={handleSubmit}>{isDetail ? '답장하기' : '보내기'}</LetterButtonGo>
          {isDetail && <LetterButtonDel onClick={handleRemove}>삭제하기</LetterButtonDel>}
          <div onClick={videoButtonClick}>
            { videoButton === 1 ? 
              <img style={{ width: '180px', marginLeft: '50px', marginTop: '20px'}} src="/icons/iconletter.svg" />
            : <img style={{ width: '180px', marginLeft: '40px', marginTop: '20px'}} src="/icons/videoicon.svg" />
            }
          </div>
        </LetterButton>
      </section>

    </LetterEditorComponentBody>

  )
}

export default LetterEditorComponent
