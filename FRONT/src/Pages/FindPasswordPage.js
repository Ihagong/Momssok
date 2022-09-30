import React, { useState } from 'react'
import { ButtonTag1, InputTag1 } from '../Style/Components'
import { useAuthCallback } from '../Functions/useAuthCallback'

function FindPasswordPage() {
  const [email, setEmail] = useState('')

  const { findPasswordCallback } = useAuthCallback()

  const handleClickFindPasswordButton = () => {
    if (email === '') {
      console.log('이메일을 입력해주세요.')
    } else {
      findPasswordCallback(email)
    }
  }

  return (
    <>
    <h2>맘쏙 비밀번호 찾기</h2>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <InputTag1 type='email' placeholder='이메일' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
      <ButtonTag1 onClick={handleClickFindPasswordButton}>비밀번호 찾기</ButtonTag1>
    </div>
    </>
  );
}

export default FindPasswordPage