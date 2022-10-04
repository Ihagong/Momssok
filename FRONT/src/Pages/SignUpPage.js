import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthCallback } from '../Functions/useAuthCallback'
import { useRecoilState } from 'recoil'
import { signUpTokenState } from '../store/atoms'
import { GugiBrown, JuaBrown, JuaBrownLight,  LoginPageBody, ButtonTag1, ButtonTag2, InputTag1 } from '../Style/Components'
import { AlertModalComponent } from '../Components/AlertModalComponent'



function SignUpPage() {
  const [signUpToken, setSignUpToken] = useRecoilState(signUpTokenState)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [authNumber, setAuthNumber] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')

  const { authCheckCallback, authEmailCallback, signUpCallback } = useAuthCallback()

  const navigate = useNavigate()

  const handleClickAuth = () => {
    if (email === '') {
      setModalContent('이메일을 입력해주세요.')
      setModalOpen(true)
    } else {
      authEmailCallback(email, setModalContent, setModalOpen)
    }
  }

  const handleClickAuthCheck = () => {
    if (authNumber === '') {
      setModalContent('인증 번호를 입력해주세요.')
      setModalOpen(true)
    } else {
      authCheckCallback(email, authNumber, setModalContent, setModalOpen)
    }
  }

  const handleClickSignUp = () => {
    if (username === '') {
      setModalContent('이름을 입력해주세요.')
      setModalOpen(true)
    } else if (password === '' || password !== passwordCheck) {
      setModalContent('비밀번호를 확인해주세요.')
      setModalOpen(true)
    } else if (signUpToken === '') {
      setModalContent('이메일 인증을 진행해주세요.')
      setModalOpen(true)
    } else {
      signUpCallback(email, password, username)
    }
  }

  return (
    <>
      { modalOpen ? <AlertModalComponent setModalOpen={setModalOpen} modalContent={modalContent} /> : null }
      <LoginPageBody>
        <section style={{marginLeft: "30px", marginTop: "40px"}}>
          <JuaBrown style={{fontSize: "80px"}}>
            <GugiBrown style={{marginRight: "20px"}}>맘쏙</GugiBrown>
            회원가입
          </JuaBrown>
          <JuaBrownLight style={{fontSize: "36px"}}>지금 회원가입 하신 후</JuaBrownLight>
          <JuaBrownLight style={{fontSize: "36px"}}>맘쏙의 다양한 서비스를 만나보세요.</JuaBrownLight>
          <img style={{marginLeft: "40px", marginTop: "80px"}} src='/icons/mom.svg' />
        </section>
        <section style={{marginLeft: "60px", marginTop: "40px"}}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <InputTag1 type='text' placeholder='이름' value={username} onChange={(e) => {setUsername(e.target.value)}}/>
            <span>
              <InputTag1 type='email' placeholder='이메일' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
              <ButtonTag2 onClick={handleClickAuth} style={{marginLeft: "15px"}}>인증</ButtonTag2>
            </span>
            <span>
              <InputTag1 type='text' placeholder='인증번호' value={authNumber} onChange={(e) => {setAuthNumber(e.target.value)}}/>
              <ButtonTag2 onClick={handleClickAuthCheck} style={{marginLeft: "15px"}}>확인</ButtonTag2>
            </span>
            <InputTag1 type='password' placeholder='비밀번호' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <JuaBrownLight style={{fontSize: "18px", marginTop: "10px", marginLeft: "50px"}}>8-16자의 영문 대소문자, 숫자 또는 특수문자 조합</JuaBrownLight>
            <InputTag1 type='password' placeholder='비밀번호 확인' value={passwordCheck} onChange={(e) => {setPasswordCheck(e.target.value)}}/>
            { password !== passwordCheck ?
              <JuaBrownLight style={{fontSize: "20px", marginTop: "15px", marginLeft: "110px", marginBottom: "-40px", color: "#ED0000"}}>비밀번호가 일치하지 않습니다.</JuaBrownLight>
            : null }
            <ButtonTag1 onClick={handleClickSignUp} style={{marginTop: "70px"}}>회원가입</ButtonTag1>
          </div>
        </section>
      </LoginPageBody>
    </>
  );
}

export default SignUpPage