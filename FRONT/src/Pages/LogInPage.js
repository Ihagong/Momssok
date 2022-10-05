import React, { useState } from 'react'
import { LoginPageBody, GugiPink, JuaBrown, JuaBrownLight, FindPasswordTag, SignUpTag, TextTag, ButtonTag1, InputTag1 } from '../Style/Components'
import { useNavigate } from  'react-router-dom'
import { useAuthCallback } from '../Functions/useAuthCallback'
import { AlertModalComponent } from '../Components/AlertModalComponent'

import { FindPasswordModalComponent } from '../Components/FindPasswordModalComponent'


function LogInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')

  const navigate = useNavigate()

  const { logInCallback } = useAuthCallback()

  const handleClickLogIn = () => {
    if (email === '') {
      setModalContent('이메일을 입력해주세요.')
      setModalOpen(true)
    } else if (password === '') {
      setModalContent('비밀번호를 입력해주세요.')
      setModalOpen(true)
    } else {
      logInCallback(email, password, setModalContent, setModalOpen)
    }
  }

  const handleClickSignUp = () => {
    navigate('/signup')
  }

  const handleClickFindPassword = () => {
    setModalOpen(true)
  }

  return (
    <>
      { modalOpen ? <AlertModalComponent setModalOpen={setModalOpen} modalContent={modalContent} /> : null }
      <LoginPageBody>
        <section style={{marginRight: '60px', marginTop: '40px'}}>
          <JuaBrown style={{fontSize: '80px', marginBottom: '10px'}}>환영합니다!</JuaBrown>
          <JuaBrownLight style={{fontSize: '36px'}}>소중한 우리 아이의 마음 속,</JuaBrownLight>
          <JuaBrownLight style={{fontSize: '36px'}}>오늘은 어떤 그림이 그려졌을까요?</JuaBrownLight>
          <img style={{marginLeft: '40px', marginTop: '80px'}} src='/icons/bear.svg' />
        </section>
        <section style={{marginLeft: '40px', marginTop: '40px', marginBottom: '10px'}}>
          <JuaBrown style={{fontSize: '48px'}}>우리 아이 마음 일기장</JuaBrown>
          <div style={{marginBottom: '30px'}}>
            <img src='/icons/heart.svg' />
            <GugiPink style={{fontSize: '64px', marginLeft: '10px'}}>맘쏙</GugiPink>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <InputTag1 type='email' placeholder='이메일' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <InputTag1 type='password' placeholder='비밀번호' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <FindPasswordTag onClick={handleClickFindPassword}>비밀번호 찾기</FindPasswordTag>
            <ButtonTag1 onClick={handleClickLogIn} style={{marginTop: '50px'}}>로그인</ButtonTag1>
            <TextTag style={{marginTop: '40px'}}>아직 계정이 없으신가요? <SignUpTag onClick={handleClickSignUp}>회원가입</SignUpTag></TextTag>
          </div>
        </section>
      </LoginPageBody>
    </>
  )
}

export default LogInPage