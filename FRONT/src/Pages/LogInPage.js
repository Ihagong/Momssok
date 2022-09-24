import React, { useState } from 'react'
import { FindPasswordTag, SignUpTag, TextTag, ButtonTag1, InputTag1 } from '../Style/Components'
import { useNavigate } from  'react-router-dom'
import { useRecoilState } from 'recoil'
import { logInTokenState } from '../store/atoms'
import { useAuthCallback } from '../Functions/useAuthCallback'
import axios from 'axios'


function LogInPage() {
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { logInCallback } = useAuthCallback();

  const handleClickLogIn = () => {
    if (email === '') {
      console.log('이메일을 입력해주세요.')
    } else if (password === '') {
      console.log('비밀번호를 입력해주세요.')
    } else {
      logInCallback(email, password)
    }
  }

  const handleClickSignUp = () => {
    navigate('/signup')
  }

  const handleClickFindPassword = () => {
    navigate('/findpassword')
  }

  return (
    <>
      <h2>환영합니다!</h2>
      <p>소중한 우리 아이의 마음 속,</p>
      <p>오늘은 어떤 그림이 그려졌을까요?</p>
      <h4>우리 아이 마음 일기장</h4>
      <h3>맘쏙</h3>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <InputTag1 type='email' placeholder='이메일' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        <InputTag1 type='password' placeholder='비밀번호' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        <FindPasswordTag onClick={handleClickFindPassword}>비밀번호 찾기</FindPasswordTag>
        <ButtonTag1 onClick={handleClickLogIn}>로그인</ButtonTag1>
        <TextTag>아직 계정이 없으신가요? <SignUpTag onClick={handleClickSignUp}>회원가입</SignUpTag></TextTag>
      </div>
    </>
  );
}

export default LogInPage