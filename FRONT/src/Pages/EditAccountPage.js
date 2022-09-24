import React, { useEffect, useState } from 'react'
import { ButtonTag1, ButtonTag2, InputTag1 } from '../Style/Components'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { logInTokenState, userInfoState } from '../store/atoms'
import { useAuthCallback } from '../Functions/useAuthCallback'


function EditAccountPage() {
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  
  const { userInfoCallback } = useAuthCallback()

  useEffect(() => {
    if (!userInfo) {
      console.log(userInfo)
      userInfoCallback()
    }
  }, [])
  
  const [nickname, setNickname] = useState(userInfo?.username)
  const [email, setEmail] = useState(userInfo?.email)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordCheck, setNewPasswordCheck] = useState('')
 
  const handleClickAuthPassword = () => {
  }

  const handleClickEditAccount = () => {
  }

  return (
    <>
      <h2>맘쏙 회원수정</h2>
      <p>닉네임과 비밀번호를</p>
      <p>자유롭게 변경하실 수 있습니다.</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <InputTag1 type='text' placeholder='이름' value={nickname} onChange={(e) => {setNickname(e.target.value)}}/>
        <InputTag1 type='email' placeholder='이메일' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        <span>
          <InputTag1 type='password' placeholder='현재 비밀번호' value={currentPassword} onChange={(e) => {setCurrentPassword(e.target.value)}}/>
          <ButtonTag2 onClick={handleClickAuthPassword}>인증</ButtonTag2>
        </span>
        <InputTag1 type='password' placeholder='새 비밀번호' value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}/>
        <p>8-16자의 영문 대소문자, 숫자 또는 특수문자 조합</p>
        <InputTag1 type='password' placeholder='새 비밀번호 확인' value={newPasswordCheck} onChange={(e) => {setNewPasswordCheck(e.target.value)}}/>
        { newPassword !== newPasswordCheck ?
          <p>비밀번호가 다릅니다.</p>
        : null }
        <ButtonTag1 onClick={handleClickEditAccount}>회원 수정</ButtonTag1>
      </div>
    </>
  );
}

export default EditAccountPage