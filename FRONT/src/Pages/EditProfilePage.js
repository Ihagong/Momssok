import React, { useState } from 'react'
import { useNavigate, useLocation } from  'react-router-dom'
import { useAuthCallback } from '../Functions/useAuthCallback'

import { ProfileEditFooter, ProfileInput, ProfileTitle, JuaBrownLight, JuaBrown, JuaOrange, ProfileListLabelTag, ProfileListInputTag, ButtonTag2, ButtonTag3, ButtonTag4, ProfileImageTag, ProfileSelectedImageTag } from '../Style/Components'


function EditProfilePage() {
  const { state } = useLocation()
  const beforeBirthday = new Date(state.birthday)
  const [name, setName] = useState(state.name)
  const [year, setYear] = useState(beforeBirthday.getFullYear())
  const [month, setMonth] = useState(beforeBirthday.getMonth()+1)
  const [day, setDay] = useState(beforeBirthday.getDate())
  const [selectedImageIndex, setSelectedImageIndex] = useState(Number(state.image_num))

  const { updateProfileCallback, deleteProfileCallback } = useAuthCallback()

  const navigate = useNavigate()

  const handleClickPrevPage = () => {
    navigate(-1)
  }

  const handleClickUpdateProfile = () => {
    if (name === '') {
      console.log('이름을 입력해주세요.')
    } else if (!year || !month || !day) {
      console.log('생일을 확인해주세요.')
    } else {
      const birthday = `${ year ? year : 2000 }-${ month ? `${Number(month)}`.padStart(2,'0') : '01' }-${ day ? `${Number(day)}`.padStart(2,'0') : '01' }`
      updateProfileCallback(state.name, name, birthday, selectedImageIndex, state.profilePassword)
    }
  }

  const handleClickDeleteButton = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteProfileCallback(name)
    }
  }

  return (
    <div>
      <ProfileTitle>
        <JuaBrown style={{ fontSize: "55px" }}>자녀 프로필 관리</JuaBrown>
        <JuaOrange style={{ fontSize: "48px" }}>아이의 이름과 생년월일, 캐릭터를 선택해 주세요.</JuaOrange>
      </ProfileTitle>
      <ProfileInput>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ProfileListLabelTag htmlFor='name'>이름</ProfileListLabelTag>
          <ProfileListInputTag style={{ width: '230px', textAlign: "center", marginRight: '40px' }} type='text' id='name' value={name} onChange={(e) => {setName(e.target.value)}} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ProfileListLabelTag htmlFor='year'>생년월일</ProfileListLabelTag>
          <JuaBrownLight style={{fontSize: "40px" }}>
            <ProfileListInputTag style={{ width: '160px', textAlign: "center" }} type='number' id='year' value={year} onChange={(e) => {setYear(e.target.value)}}  min="1900" max="2022" />
            <span style={{fontSize: "36px", marginRight: "20px"}}>년</span>
            <ProfileListInputTag style={{ width: '80px', textAlign: "center" }} type='number' id='month' value={month} onChange={(e) => {setMonth(e.target.value)}} min="1" max="12" />
            <span style={{fontSize: "36px", marginRight: "20px"}}>월</span>
            <ProfileListInputTag style={{ width: '80px', textAlign: "center" }} type='number' id='day' value={day} onChange={(e) => {setDay(e.target.value)}} min="1" max="31" />
            <span style={{fontSize: "36px", marginRight: "20px"}}>일</span>
          </JuaBrownLight>
        </div>
      </ProfileInput>

      <ProfileInput style={{ display: 'flex', flexDirection: 'column', marginTop: '30px'}}>
        <JuaBrown style={{fontSize: "36px", marginBottom: '10px'}}>캐릭터</JuaBrown>
        <div>
          { selectedImageIndex === 0 ? <ProfileSelectedImageTag><img src='/images/profileImage_0.svg' /></ProfileSelectedImageTag>
            :  <ProfileImageTag onClick={() => setSelectedImageIndex(0)}><img src='/images/profileImage_0.svg' /></ProfileImageTag> }
          { selectedImageIndex === 1 ? <ProfileSelectedImageTag><img src='/images/profileImage_1.svg' /></ProfileSelectedImageTag>
            :  <ProfileImageTag onClick={() => setSelectedImageIndex(1)}><img src='/images/profileImage_1.svg' /></ProfileImageTag> }
          { selectedImageIndex === 2 ? <ProfileSelectedImageTag><img src='/images/profileImage_2.svg' /></ProfileSelectedImageTag>
            :  <ProfileImageTag onClick={() => setSelectedImageIndex(2)}><img src='/images/profileImage_2.svg' /></ProfileImageTag> }
          { selectedImageIndex === 3 ? <ProfileSelectedImageTag><img src='/images/profileImage_3.svg' /></ProfileSelectedImageTag>
            :  <ProfileImageTag onClick={() => setSelectedImageIndex(3)}><img src='/images/profileImage_3.svg' /></ProfileImageTag> }
          { selectedImageIndex === 4 ? <ProfileSelectedImageTag><img src='/images/profileImage_4.svg' /></ProfileSelectedImageTag>
            :  <ProfileImageTag onClick={() => setSelectedImageIndex(4)}><img src='/images/profileImage_4.svg' /></ProfileImageTag> }
          { selectedImageIndex === 5 ? <ProfileSelectedImageTag><img src='/images/profileImage_5.svg' /></ProfileSelectedImageTag>
            :  <ProfileImageTag onClick={() => setSelectedImageIndex(5)}><img src='/images/profileImage_5.svg' /></ProfileImageTag> }
        </div>
      </ProfileInput>

      <ProfileEditFooter>
        <span>
          <ButtonTag3 onClick={handleClickPrevPage}>이전</ButtonTag3>
          <ButtonTag2 style={{ fontSize: '40px', width: '230px', marginLeft: "20px", marginRight: "20px" }} onClick={handleClickDeleteButton}>삭제</ButtonTag2>
          <ButtonTag4 onClick={handleClickUpdateProfile}>수정</ButtonTag4>
        </span>
      </ProfileEditFooter>


    </div>
  );
}

export default EditProfilePage