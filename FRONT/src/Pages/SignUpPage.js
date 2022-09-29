import React, { useState } from 'react'
import { ButtonTag1, ButtonTag2, InputTag1 } from '../Style/Components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthCallback } from '../Functions/useAuthCallback'
import { useRecoilState } from 'recoil'
import { signUpTokenState } from '../store/atoms'


function SignUpPage() {
  const [signUpToken, setSignUpToken] = useRecoilState(signUpTokenState)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [authNumber, setAuthNumber] = useState('')

  const { authCheckCallback, authEmailCallback, signUpCallback } = useAuthCallback()

  const navigate = useNavigate()

  const handleClickAuth = () => {
    if (email === '') {
      console.log('이메일을 입력해주세요.')
    } else {
      authEmailCallback(email)
    }
  }

  const handleClickAuthCheck = () => {
    if (authNumber === '') {
      console.log('인증 번호를 입력해주세요.')
    } else {
      authCheckCallback(email, authNumber)
    }
  }

  const handleClickSignUp = () => {
    if (username === '') {
      console.log('이름을 입력해주세요.')
    } else if (password === '' || password !== passwordCheck) {
      console.log('비밀번호를 확인해주세요.')
    } else if (signUpToken === '') {
      console.log('이메일 인증을 진행해주세요.')
    } else {
      signUpCallback(email, password, username)
    }
  }

  return (
    <div>
      <h2>맘쏙 회원가입</h2>
      <p>지금 회원가입 하신 후</p>
      <p>맘쏙의 다양한 서비스를 만나보세요.</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <InputTag1 type='text' placeholder='이름' value={username} onChange={(e) => {setUsername(e.target.value)}}/>
        <span>
          <InputTag1 type='email' placeholder='이메일' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
          <ButtonTag2 onClick={handleClickAuth}>인증</ButtonTag2>
        </span>
        <span>
          <InputTag1 type='text' placeholder='인증번호' value={authNumber} onChange={(e) => {setAuthNumber(e.target.value)}}/>
          <ButtonTag2 onClick={handleClickAuthCheck}>확인</ButtonTag2>
        </span>
        <InputTag1 type='password' placeholder='비밀번호' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        <p>8-16자의 영문 대소문자, 숫자 또는 특수문자 조합</p>
        <InputTag1 type='password' placeholder='비밀번호 확인' value={passwordCheck} onChange={(e) => {setPasswordCheck(e.target.value)}}/>
        { password !== passwordCheck ?
          <p>비밀번호가 다릅니다.</p>
        : null }
        <ButtonTag1 onClick={handleClickSignUp}>회원가입</ButtonTag1>
      </div>
    </div>
  );
}

export default SignUpPage