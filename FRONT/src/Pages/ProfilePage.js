import React from 'react'
import { AddProfileButtonTag, AddProfileTextTag, ButtonTag3 } from '../Style/Components'
import { useNavigate } from  'react-router-dom'
import { ChildProfileComponent } from '../Components/ChildProfileComponent'


function ProfilePage() {
  const navigate = useNavigate()
  const childrenList = [{ id: 0, name: '찬석이', birth: '2017.12', age: 6 }] // 아이 정보
  
  const handleClickCreateProfileButton = () => {
    navigate('create')
  }

  return (
    <>
      {childrenList.length ?
        <>
          <h3>프로필을 선택해주세요.</h3>
          <h4>우리 아이마다 맞춤으로 서비스 이용이 가능합니다.</h4>
          {childrenList.map((info) => (
            <ChildProfileComponent key={info.id} info={info} />
          ))}
          <ButtonTag3>아이 관리</ButtonTag3>
          <ButtonTag3>로그아웃</ButtonTag3>
        </>
      :
        <>
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