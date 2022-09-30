import React, { useEffect } from 'react'
import { ProfileFooter, ProfileBlock, ProfileTitle, JuaOrange, JuaBrown, JuaBrownLight, AddProfileButtonTag, AddProfileTextTag, ButtonTag3 } from '../Style/Components'
import { useNavigate } from  'react-router-dom'
import { ChildProfileComponent } from '../Components/ChildProfileComponent'
import { useRecoilState } from 'recoil'
import { profileInfoState, profileState } from '../store/atoms'
import { useAuthCallback } from '../Functions/useAuthCallback'


function ProfilePage() {
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState)
  const [profileName, setProfileName] = useRecoilState(profileState)
  const navigate = useNavigate()
  
  const { logOutCallback, profileInfoCallback } = useAuthCallback()

  const handleClickCreateProfileButton = () => {
    navigate('/profile/create')
  }

  const handleClickManageProfileButton = () => {
    navigate('/profile/manage')
  }

  const handleClickChildProfile = (info) => {
    setProfileName(info.name)
    navigate('/child')
  }

  useEffect(() => {
    if (profileInfo.length === 0) {
      profileInfoCallback()
    }
  }, [])


  return (
    <>
      { profileInfo?.length !== 1 ?
        <div>
          <ProfileTitle>
            <JuaBrown style={{fontSize: "55px"}}>프로필을 선택해주세요.</JuaBrown>
            <JuaOrange style={{fontSize: "48px"}}>우리 아이마다 맞춤으로 서비스 이용이 가능합니다.</JuaOrange>
          </ProfileTitle>
          <ProfileBlock>
            { profileInfo?.map((info, index) => {if (!info.is_parent) {
                return <ChildProfileComponent key={index} info={info} handleClickChildProfile={handleClickChildProfile} />
            }})}
          </ProfileBlock>
          <ProfileFooter>
            <ButtonTag3 onClick={handleClickManageProfileButton} style={{marginLeft:"10px", marginRight:"10px"}}>아이 관리</ButtonTag3>
            <ButtonTag3 onClick={logOutCallback} style={{marginLeft:"10px", marginRight:"10px"}}>로그아웃</ButtonTag3>
          </ProfileFooter>
        </div>
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