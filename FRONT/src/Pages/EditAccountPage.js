import React, { useEffect, useState } from 'react'
import { useNavigate } from  'react-router-dom'
import { GugiBrown, JuaBrown, JuaBrownLight, FindPasswordTag, LoginPageBody, ButtonTag1, ButtonTag2, InputTag1 } from '../Style/Components'
import { useRecoilState } from 'recoil'
import { userInfoState } from '../store/atoms'
import { useAuthCallback } from '../Functions/useAuthCallback'


function EditAccountPage() {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  
  const { userInfoCallback, editAccountCallback } = useAuthCallback()

  useEffect(() => {
    if (!userInfo) {
      console.log(userInfo)
      userInfoCallback(email, newPassword)
    }
  }, [])
  
  const [username, setUsername] = useState(userInfo?.username)
  const [email, setEmail] = useState(userInfo?.email)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordCheck, setNewPasswordCheck] = useState('')
 
  const handleClickAuthPassword = () => {
    // 비밀번호 인증
  }

  const handleClickEditAccount = () => {
    if (newPassword !== newPasswordCheck) {
      console.log('비밀번호를 확인해주세요.')
    } else {
      editAccountCallback(username, newPassword)
      setNewPassword('')
      setNewPasswordCheck('')
    }
  }

  const handleClickDeleteAccount = () => {
    navigate('/account/delete')
  }

  return (
    <LoginPageBody>
      <section style={{marginLeft: "30px", marginTop: "40px"}}>
        <JuaBrown style={{fontSize: "80px"}}>
          <GugiBrown style={{marginRight: "20px"}}>맘쏙</GugiBrown>
          회원수정
        </JuaBrown>
        <JuaBrownLight style={{fontSize: "36px"}}>이름과 비밀번호를</JuaBrownLight>
        <JuaBrownLight style={{fontSize: "36px"}}>자유롭게 변경하실 수 있습니다.</JuaBrownLight>
        <img style={{marginLeft: "40px", marginTop: "80px"}} src='/icons/mom.svg' />
      </section>

      <section style={{marginLeft: "60px", marginTop: "40px"}}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <InputTag1 type='text' placeholder='이름' value={username} onChange={(e) => {setUsername(e.target.value)}}/>
          <InputTag1 type='email' placeholder='이메일' value={email}  disabled onChange={(e) => {setEmail(e.target.value)}}/>
          <span>
            <InputTag1 type='password' placeholder='현재 비밀번호' value={currentPassword} onChange={(e) => {setCurrentPassword(e.target.value)}}/>
            <ButtonTag2 onClick={handleClickAuthPassword} style={{marginLeft: "15px"}}>인증</ButtonTag2>
          </span>
          <InputTag1 type='password' placeholder='새 비밀번호' value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}/>
          <JuaBrownLight style={{fontSize: "18px", marginTop: "10px", marginLeft: "50px"}}>8-16자의 영문 대소문자, 숫자 또는 특수문자 조합</JuaBrownLight>
          <InputTag1 type='password' placeholder='새 비밀번호 확인' value={newPasswordCheck} onChange={(e) => {setNewPasswordCheck(e.target.value)}}/>
          { newPassword !== newPasswordCheck ?
            <JuaBrownLight style={{fontSize: "20px", marginTop: "10px", marginLeft: "110px", marginBottom: "-40px", color: "#ED0000"}}>비밀번호가 일치하지 않습니다.</JuaBrownLight>
            : null }
          <ButtonTag1 onClick={handleClickEditAccount} style={{marginTop: "70px"}}>회원 수정</ButtonTag1>
          <FindPasswordTag onClick={handleClickDeleteAccount} style={{marginRight: "130px", marginTop: "10px"}}>회원 탈퇴</FindPasswordTag>
        </div>
      </section>


    </LoginPageBody>
  )
}

export default EditAccountPage