import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from  'react-router-dom'
import { ChildProfileComponent } from '../Components/ChildProfileComponent'
import { CreateProfileComponent } from '../Components/CreateProfileComponent'
import { useRecoilState } from 'recoil'
import { profileListState, profileState } from '../store/atoms'
import { useAuthCallback } from '../Functions/useAuthCallback'
import { ButtonTag1, ButtonTag2, ProfileFooter, ProfileBlock, ProfileTitle, JuaBrown, JuaOrange, ButtonTag3, ButtonTag4 } from '../Style/Components'


function ManageProfilePage() {
  const { state } = useLocation()
  const [profileList, setProfileList] = useRecoilState(profileListState)
  const [isEditProfile, setIsEditProfile] = useState(false)
  const navigate = useNavigate()
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  
  const { logOutCallback, profileListCallback } = useAuthCallback()

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
    setProfileInfo(info)

    if (isEditProfile) {
      navigate('/profile/edit', { state: info })
    } else {
      navigate('/parent')
    }
  }

  useEffect(() => {
    if (profileList.length === 0) {
      profileListCallback()
    }
  }, [])

  return (
    <div>
      <ProfileTitle>
        <JuaBrown style={{fontSize: "55px"}}>프로필을 선택 또는 등록해주세요.</JuaBrown>
        <JuaOrange style={{fontSize: "48px"}}>우리 아이마다 개별적인 관리와 분석 결과를 제공합니다.</JuaOrange>
      </ProfileTitle>

      <ProfileBlock>
        { profileList?.map((info, index) => {if (!info.is_parent) {
          return <ChildProfileComponent key={index} info={info} handleClickChildProfile={handleClickChildProfile} />
        }})}
        { profileList.length < 5 ?
          <CreateProfileComponent />
          : null }
      </ProfileBlock>

      <ProfileFooter>
        <ButtonTag3 style={{ width: '200px', marginLeft:"10px", marginRight:"10px"}} onClick={handleClickPrevPage}>이전</ButtonTag3>
        {isEditProfile ?
          <ButtonTag3 style={{ width: '260px', marginLeft:"10px", marginRight:"10px" }} onClick={handleClickManageProfileButton} >수정 완료</ButtonTag3>
          : <ButtonTag2 style={{ fontSize: '40px', width: '260px', marginLeft:"10px", marginRight:"10px" }} onClick={handleClickManageProfileButton}>프로필 수정</ButtonTag2>}
        <ButtonTag4 style={{ marginLeft:"10px", marginRight:"10px", boxShadow: "0px 5px 10px rgba(255, 96, 41, 0.4)" }} onClick={handleClickEditAccountButton}>회원 수정</ButtonTag4>
      </ProfileFooter>
    </div>
  );
}

export default ManageProfilePage