import React, { useEffect } from 'react'
import { AddProfileButtonTag, AddProfileTextTag, ButtonTag3 } from '../Style/Components'
import { useNavigate } from  'react-router-dom'
import { ChildProfileComponent } from '../Components/ChildProfileComponent'
import { useRecoilState } from 'recoil'
import { profileInfoState } from '../store/atoms'
import { useAuthCallback } from '../Functions/useAuthCallback'


function ProfilePage() {
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState)
  const navigate = useNavigate()
  // const childrenList = [{ id: 0, name: '찬석이', birth: '2017.12', age: 6 }] // 아이 정보
  
  const { logOutCallback, profileInfoCallback } = useAuthCallback()

  const handleClickCreateProfileButton = () => {
    navigate('/profile/create')
  }

  const handleClickManageProfileButton = () => {
    // navigate('/')
  }

  useEffect(() => {
    if (profileInfo.length === 0) {
      profileInfoCallback()
    }
  }, [])

  return (
    <>
      { profileInfo.length ?
        <>
          <h3>프로필을 선택해주세요.</h3>
          <h4>우리 아이마다 맞춤으로 서비스 이용이 가능합니다.</h4>
          {profileInfo.map((info, index) => (
            <ChildProfileComponent key={index} info={info} />
          ))}
          <ButtonTag3 onClick={handleClickManageProfileButton}>아이 관리</ButtonTag3>
          <ButtonTag3 onClick={logOutCallback}>로그아웃</ButtonTag3>
        </>
      :
        <>
          <ButtonTag3 onClick={logOutCallback}>로그아웃</ButtonTag3>
          <h3>자녀 프로필 등록</h3>
          <h4>우리 아이만을 위한 맘쏙 홈을 만나 보세요!</h4>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={handleClickCreateProfileButton}>
            <AddProfileButtonTag><img src='icons/plus.svg' /></AddProfileButtonTag>
            <AddProfileTextTag>프로필 등록</AddProfileTextTag>
          </div>
        </>
      }
    </>
  );
}

export default ProfilePage