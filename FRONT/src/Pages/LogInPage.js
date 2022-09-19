import React, { useState } from 'react'
import { FindPasswordTag, SignUpTag, TextTag, ButtonTag1, InputTag1 } from '../Style/Components'
import { useNavigate } from  'react-router-dom'


function LogInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleClickLogin = () => {
    navigate('/')
  }

  return (
    <>
      <h2>환영합니다!</h2>
      <p>소중한 우리 아이의 마음 속,</p>
      <p>오늘은 어떤 그림이 그려졌을까요?</p>
      <h4>우리 아이 마음 일기장</h4>
      <h3>맘쏙</h3>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <InputTag1 type="email" id="email" placeholder="이메일" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        <InputTag1 type="password" id="password" placeholder="비밀번호" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        <FindPasswordTag href='#'>비밀번호 찾기</FindPasswordTag>
        <ButtonTag1 onClick={handleClickLogin}>로그인</ButtonTag1>
        <TextTag>아직 계정이 없으신가요? <SignUpTag href='#'>회원가입</SignUpTag></TextTag>
      </div>
    </>
  );
}

export default LogInPage