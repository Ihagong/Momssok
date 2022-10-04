import React, { useEffect } from 'react'
import { ProfileEditFooter, ProfileChildren, ProfileFooter, ProfileBlock, ProfileTitle, JuaOrange, JuaBrown, JuaBrownLight, AddProfileButtonTag, AddProfileTextTag, ButtonTag3 } from '../Style/Components'
import { useNavigate } from  'react-router-dom'
import { ChildProfileComponent } from '../Components/ChildProfileComponent'
import { useRecoilState } from 'recoil'
import { profileListState, profileState, parentActiveState } from '../store/atoms'
import { useAuthCallback } from '../Functions/useAuthCallback'


function ProfilePage() {
  const [profileList, setProfileList] = useRecoilState(profileListState)
  const [profile, setProfile] = useRecoilState(profileState)
  const [parentActive, setParentActive] = useRecoilState(parentActiveState)
  const navigate = useNavigate()
  
  const { logOutCallback, profileListCallback } = useAuthCallback()

  const handleClickCreateProfileButton = () => {
    navigate('/profile/create')
  }

  const handleClickManageProfileButton = () => {
    console.log(profileList)
    const parentProfile = profileList.forEach((profile) => {
      if (profile.is_parent) {
        return profile
      }
    })
    setProfile(parentProfile)
    setParentActive(true)
    navigate('/profile/manage')
  }

  const handleClickChildProfile = (info) => {
    setProfile(info)
    setParentActive(false)
    navigate('/child')
  }

  useEffect(() => {
    if (profileList.length === 0) {
      profileListCallback()
    }
  }, [])


  return (
    <>
      { profileList?.length !== 1 ?
        <div>
          <ProfileTitle>
            <JuaBrown style={{fontSize: "55px"}}>프로필을 선택해주세요.</JuaBrown>
            <JuaOrange style={{fontSize: "48px"}}>우리 아이마다 맞춤으로 서비스 이용이 가능합니다.</JuaOrange>
          </ProfileTitle>
          <ProfileBlock>
            { profileList?.map((info, index) => {if (!info.is_parent) {
                return <ChildProfileComponent key={index} info={info} handleClickChildProfile={handleClickChildProfile} />
            }})}
          </ProfileBlock>
          <ProfileFooter>
            <ButtonTag3 onClick={handleClickManageProfileButton} style={{marginLeft:"10px", marginRight:"10px"}}>아이 관리</ButtonTag3>
            <ButtonTag3 onClick={logOutCallback} style={{marginLeft:"10px", marginRight:"10px"}}>로그아웃</ButtonTag3>
          </ProfileFooter>
        </div>
      :
        <div>
          <ProfileTitle>
            <JuaBrown style={{fontSize: "55px"}}>자녀 프로필 등록</JuaBrown>
            <JuaOrange style={{fontSize: "48px"}}>우리 아이만을 위한 맘쏙 홈을 만나 보세요!</JuaOrange>
          </ProfileTitle>
          <ProfileBlock style={{ flexDirection: 'column'}} onClick={handleClickCreateProfileButton}>
            <AddProfileButtonTag 
              style={{ boxShadow: "0px 10px 20px rgba(255, 96, 41, 0.4)" }}>
                <img src='/icons/plus.svg' />
            </AddProfileButtonTag>
            <AddProfileTextTag style={{marginTop: "5px"}}>프로필 등록</AddProfileTextTag>
          </ProfileBlock>
          <ProfileEditFooter>
            <ButtonTag3 onClick={logOutCallback}>로그아웃</ButtonTag3>
          </ProfileEditFooter>
          <ProfileChildren>
            <img src='/icons/children.svg'/>
          </ProfileChildren>
        </div>
      }
    </>
  );
}

export default ProfilePage