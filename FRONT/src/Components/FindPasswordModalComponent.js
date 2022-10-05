import React, { useState } from 'react'

import { useAuthCallback } from '../Functions/useAuthCallback'
import { JuaBrown, JuaBrownLight, InputTag1, ButtonTag1, ButtonTag3, PromiseModalComponentTag, ModalBackgroundTag } from '../Style/Components'

export function FindPasswordModalComponent({setModalOpen}) {
  const { findPasswordCallback } = useAuthCallback()

  const [email, setEmail] = useState('')

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false)
    }
  }
  
  const handleClickFindPasswordButton = () => {
    if (email === '') {
      console.log('이메일을 입력해주세요.')
    } else {
      findPasswordCallback(email)
    }
  }
  
  return (
    <ModalBackgroundTag style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onCloseModal}>
      <PromiseModalComponentTag>
        <JuaBrown style={{ fontSize: '42px', marginBottom: '10px'}}>맘쏙 비밀번호 찾기</JuaBrown>
        <JuaBrownLight style={{ fontSize: '24px', marginBottom: '60px'}}>가입 시 등록한 이메일을 입력해 주세요.</JuaBrownLight>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <InputTag1 style={{ width: '350px', marginBottom: '50px' }} type='email' placeholder='이메일' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
          <ButtonTag1 style={{ width: '410px', marginBottom: '10px', fontSize: "36px" }} onClick={handleClickFindPasswordButton}>임시 비밀번호 전송</ButtonTag1>
          <ButtonTag3 style={{ width: '410px', backgroundColor: 'var(--Beige-Stroke)', fontSize: "36px"}} onClick={() => setModalOpen(false)}>닫기</ButtonTag3>
        </div>
      </PromiseModalComponentTag>
    </ModalBackgroundTag>
  )
}