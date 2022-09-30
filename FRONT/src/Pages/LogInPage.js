import React, { useState } from 'react'
import { LoginPageBody, GugiPink, JuaBrown, JuaBrownLight, FindPasswordTag, SignUpTag, TextTag, ButtonTag1, InputTag1 } from '../Style/Components'
import { useNavigate } from  'react-router-dom'
import { useAuthCallback } from '../Functions/useAuthCallback'


function LogInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { logInCallback } = useAuthCallback()

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
    <LoginPageBody>
      <section style={{marginRight: "60px", marginTop: "60px"}}>
        <JuaBrown style={{fontSize: "80px"}}>환영합니다!</JuaBrown>
        <JuaBrownLight style={{fontSize: "36px"}}>소중한 우리 아이의 마음 속,</JuaBrownLight>
        <JuaBrownLight style={{fontSize: "36px"}}>오늘은 어떤 그림이 그려졌을까요?</JuaBrownLight>
        <img style={{marginLeft: "40px", marginTop: "80px"}} src='/icons/bear.svg' />
      </section>
      <section style={{marginLeft: "40px", marginTop: "60px"}}>
        <JuaBrown style={{fontSize: "48px"}}>우리 아이 마음 일기장</JuaBrown>
        <div style={{marginBottom: "30px"}}>
          <img src='/icons/heart.svg' />
          <GugiPink style={{fontSize: "64px", marginLeft: "10px"}}>맘쏙</GugiPink>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <InputTag1 type='email' placeholder='이메일' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
          <InputTag1 type='password' placeholder='비밀번호' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
          <FindPasswordTag onClick={handleClickFindPassword}>비밀번호 찾기</FindPasswordTag>
          <ButtonTag1 onClick={handleClickLogIn} style={{marginTop: "50px"}}>로그인</ButtonTag1>
          <TextTag style={{marginTop: "40px"}}>아직 계정이 없으신가요? <SignUpTag onClick={handleClickSignUp}>회원가입</SignUpTag></TextTag>
        </div>
      </section>
    </LoginPageBody>
  );
}

export default LogInPage