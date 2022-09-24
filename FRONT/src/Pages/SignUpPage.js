import React, { useState } from 'react'
import { ButtonTag1, ButtonTag2, InputTag1 } from '../Style/Components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function SignUpPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [authNumber, setAuthNumber] = useState('')
  const [token, setToken] = useState('')

  const navigate = useNavigate()

  const handleClickAuth = () => {
    if (email === '') {
      console.log('이메일을 입력해주세요.')
    } else {
      axios({
        method: 'post',
        url: '/api/user/emailInput',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          email,
        }
      })
      .then(response => {
        if (response.data) {
          console.log(response.data)
          console.log('인증 메일을 보냈습니다.')
        }
      })
      .catch(error => {
        console.log(error.response.data)
      })
    }
  }

  const handleClickAuthCheck = () => {
    if (authNumber === '') {
      console.log('이메일을 입력해주세요.')
    } else if (token !== '') {
      axios({
        method: 'post',
        url: '/api/user/emailCertification',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email,
          code: authNumber,
        }
      })
      .then(response => {
        if (response.data) {
          console.log(response.data)
          console.log('인증되었습니다.')
          setToken(response.data.token)
        }
      })
      .catch(error => {
        console.log(error.response.data)
        setToken('')
      })
    }
  }

  const handleClickSignUp = () => {
    if (username === '') {
      console.log('이름을 입력해주세요.')
    } else if (password === '' || password !== passwordCheck) {
      console.log('비밀번호를 확인해주세요.')
    } else if (token === '') {
      console.log('이메일 인증을 진행해주세요.')
    } else {
      axios({
        method: 'post',
        url: '/api/user/signUp',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        data: {
          email,
          password,
          username,
        }
      })
      .then(response => {
        if (response.data) {
          console.log(response.data)
          console.log('회원가입에 성공했습니다.')
          navigate('/login')
        }
      })
      .catch(error => {
        console.log(error.response.data)
      })
    }
  }

  return (
    <>
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
    </>
  );
}

export default SignUpPage