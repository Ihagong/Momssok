import React, { useEffect, useState } from 'react'
import { ButtonTag3, ButtonTag4 } from '../Style/Components'
import { useNavigate, useLocation } from  'react-router-dom'
import { ChildProfileComponent } from '../Components/ChildProfileComponent'
import { CreateProfileComponent } from '../Components/CreateProfileComponent'
import { useRecoilState } from 'recoil'
import { profileInfoState } from '../store/atoms'
import { useAuthCallback } from '../Functions/useAuthCallback'


function ManageProfilePage() {
  const { state } = useLocation()
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState)
  const [isEditProfile, setIsEditProfile] = useState(false)
  const navigate = useNavigate()
  
  const { logOutCallback, profileInfoCallback } = useAuthCallback()

  const handleClickManageProfileButton = () => {
    // navigate('/')
    setIsEditProfile(!isEditProfile)
  }

  const handleClickEditAccountButton = () => {
    navigate('/account')
  }

  const handleClickChildProfile = (info) => {
    if (isEditProfile) {
      navigate('/profile/edit', { state: info })
    } else {
      navigate('/parent')
    }
  }

  useEffect(() => {
    if (profileInfo.length === 0) {
      profileInfoCallback()
    }
  }, [])

  return (
    <>
      <h3>프로필을 선택 또는 등록해주세요.</h3>
      <h4>우리 아이마다 개별적인 관리와 분석 결과를 제공합니다.</h4>
      <div style={{ display: 'flex' }}>
        { profileInfo?.map((info, index) => {if (!info.is_parent) {
          return <ChildProfileComponent key={index} info={info} handleClickChildProfile={handleClickChildProfile} />
        }})}
        <CreateProfileComponent />
      </div>
      { isEditProfile ?
        <ButtonTag4 style={{ width: '400px' }} onClick={handleClickManageProfileButton}>프로필 수정 완료</ButtonTag4>
        : <ButtonTag3 style={{ width: '400px' }} onClick={handleClickManageProfileButton}>프로필 수정 및 삭제</ButtonTag3> }
      
      
      <ButtonTag3 onClick={handleClickEditAccountButton}>회원 수정</ButtonTag3>
    </>
  );
}

export default ManageProfilePage