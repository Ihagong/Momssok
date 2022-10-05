import React from 'react'
import { useNavigate } from  'react-router-dom'

import { GugiBrown, JuaBrown, JuaBrownLight, LoginPageBody, LightButtonNormal, BrownButtonNormal  } from '../Style/Components'
import { useAuthCallback } from '../Functions/useAuthCallback'


const DeleteAccountPage = () => {
  const navigate = useNavigate()

  const { deleteUserCallback } = useAuthCallback()

  const handleClickCloseAccountButton = () => {
    navigate('/account')
  }

  
  const handleClickDeleteAccountButton = () => {
    if (window.confirm("회원 탈퇴를 하시겠습니까?")){
      deleteUserCallback()
      navigate('/login')
    }
  }

  return (
    <LoginPageBody style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
      <section style={{marginLeft: "30px", marginTop: "30px",  textAlign: "center" }}>
        <JuaBrown style={{fontSize: "80px", marginBottom:"30px"}}>
          <GugiBrown style={{marginRight: "20px"}}>맘쏙</GugiBrown>
          회원탈퇴
        </JuaBrown>
        <img style={{marginBottom: "30px"}} src="/icons/bird.svg" />
        <JuaBrownLight style={{fontSize: "32px", color: "gray"}}>회원 탈퇴를 진행하시면 맘쏙에서 보관하고 있는</JuaBrownLight>
        <JuaBrownLight style={{fontSize: "32px", color: "gray"}}>회원님의 개인정보가 모두 삭제되며 복구할 수 없음을 알려드립니다.</JuaBrownLight>
        <JuaBrownLight style={{fontSize: "32px", color: "gray"}}>회원 탈퇴 후에도 언제든 재가입하셔서 맘쏙의 서비스를 이용하실 수 있습니다.</JuaBrownLight>
      </section>
      <section style={{display: "flex", marginTop: "60px"}}>
        <LightButtonNormal onClick={handleClickCloseAccountButton} style={{backgroundColor: "var(--Beige-Light)"}}>이전</LightButtonNormal>
        <BrownButtonNormal onClick={handleClickDeleteAccountButton}>회원 탈퇴</BrownButtonNormal>
      </section>

    </LoginPageBody>
  )
}

export default DeleteAccountPage