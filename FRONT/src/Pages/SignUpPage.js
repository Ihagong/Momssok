import React, { useState } from 'react'
import { ButtonTag1, ButtonTag2, InputTag1 } from '../Style/Components'


function SignUpPage() {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const handleClickSignUp = () => {
  }

  const handleClickAuth = () => {
  }

  const handleClickAuthCheck = () => {
  }

  return (
    <>
      <h2>맘쏙 회원가입</h2>
      <p>지금 회원가입 하신 후</p>
      <p>맘쏙의 다양한 서비스를 만나보세요.</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <InputTag1 type='text' placeholder='이름' value={nickname} onChange={(e) => {setNickname(e.target.value)}}/>
        <span>
          <InputTag1 type='email' placeholder='이메일' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
          <ButtonTag2 onClick={handleClickAuth}>인증</ButtonTag2>
        </span>
        <span>
          <InputTag1 type='password' placeholder='비밀번호' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
          <ButtonTag2 onClick={handleClickAuthCheck}>확인</ButtonTag2>
        </span>
        <p>8-16자의 영문 대소문자, 숫자 또는 특수문자 조합</p>
        <InputTag1 type='password' placeholder='비밀번호 확인' value={passwordCheck} onChange={(e) => {setPasswordCheck(e.target.value)}}/>
        { password !== passwordCheck ?
          <p>비밀번호가 다릅니다.</p>
        : null }
        <ButtonTag1 onClick={handleClickSignUp}>회원가입</ButtonTag1>
      </div>
    </>
  );
}

export default SignUpPage