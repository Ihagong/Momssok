import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from  'react-router-dom'
import { ChildProfileComponent } from '../Components/ChildProfileComponent'
import { CreateProfileComponent } from '../Components/CreateProfileComponent'
import { useRecoilState } from 'recoil'
import { profileInfoState } from '../store/atoms'
import { useAuthCallback } from '../Functions/useAuthCallback'
import { ProfileFooter, ProfileBlock, ProfileTitle, JuaBrown, JuaOrange, ButtonTag3, ButtonTag4 } from '../Style/Components'


function ManageProfilePage() {
  const { state } = useLocation()
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState)
  const [isEditProfile, setIsEditProfile] = useState(false)
  const navigate = useNavigate()
  
  const { logOutCallback, profileInfoCallback } = useAuthCallback()

  const handleClickManageProfileButton = () => {
    setIsEditProfile(!isEditProfile)
  }

  const handleClickPrevPage = () => {
    navigate('/profile')
  }

  const handleClickEditAccountButton = () => {
    navigate('/account')
  }

  const handleClickChildProfile = (info) => {
    if (isEditProfile) {
      console.log(info)
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
    <div>
      <ProfileTitle>
        <JuaBrown style={{fontSize: "55px"}}>프로필을 선택 또는 등록해주세요.</JuaBrown>
        <JuaOrange style={{fontSize: "48px"}}>우리 아이마다 개별적인 관리와 분석 결과를 제공합니다.</JuaOrange>
      </ProfileTitle>

      <ProfileBlock>
        { profileInfo?.map((info, index) => {if (!info.is_parent) {
          return <ChildProfileComponent key={index} info={info} handleClickChildProfile={handleClickChildProfile} />
        }})}
        { profileInfo.length < 5 ?
          <CreateProfileComponent />
          : null }
      </ProfileBlock>

      <ProfileFooter>
        <ButtonTag3 style={{ width: '200px', marginLeft:"10px", marginRight:"10px"}} onClick={handleClickPrevPage}>이전</ButtonTag3>
        {isEditProfile ?
          <ButtonTag3 style={{ width: '260px', marginLeft:"10px", marginRight:"10px" }} onClick={handleClickManageProfileButton} >수정 완료</ButtonTag3>
          : <ButtonTag4 style={{ backgroundColor: "var(--Brown-Text)", width: '260px', marginLeft:"10px", marginRight:"10px" }} onClick={handleClickManageProfileButton}>프로필 수정</ButtonTag4>}
        <ButtonTag4 style={{ marginLeft:"10px", marginRight:"10px"}} onClick={handleClickEditAccountButton}>회원 수정</ButtonTag4>
      </ProfileFooter>
    </div>
  );
}

export default ManageProfilePage