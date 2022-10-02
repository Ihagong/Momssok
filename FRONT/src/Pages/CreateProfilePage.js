import React, { useState } from 'react'
import { useNavigate } from  'react-router-dom'
import { useAuthCallback } from '../Functions/useAuthCallback'

import { ProfileEditFooter, ProfileInput, ProfileBlock, ProfileTitle, JuaBrown, JuaBrownLight, JuaOrange, ProfileListLabelTag, ProfileListInputTag, ButtonTag3, ButtonTag4, ProfileImageTag, ProfileSelectedImageTag } from '../Style/Components'


function CreateProfilePage() {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const { createProfileCallback } = useAuthCallback()

  const navigate = useNavigate()

  const handleClickPrevPage = () => {
    navigate(-1)
  }

  const handleClickCreateProfile = () => {
    if (name === '') {
      console.log('이름을 입력해주세요.')
    } else if (!year || !month || !day) {
      console.log('생일을 확인해주세요.')
    } else {
      const birthday = `${ year ? year : 2000 }-${ month ? `${Number(month)}`.padStart(2,'0') : '01' }-${ day ? `${Number(day)}`.padStart(2,'0') : '01' }`
      createProfileCallback(name, birthday, selectedImageIndex, null)
    }
  }

  return (
    <div>
      <ProfileTitle>
        <JuaBrown style={{ fontSize: "55px" }}>자녀 프로필 등록</JuaBrown>
        <JuaOrange style={{ fontSize: "48px" }}>아이의 이름과 생년월일, 캐릭터를 선택해 주세요.</JuaOrange>
      </ProfileTitle>

      <ProfileInput>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ProfileListLabelTag htmlFor='name'>이름</ProfileListLabelTag>
          <ProfileListInputTag style={{ width: '230px' }} type='text' id='name' value={name} onChange={(e) => {setName(e.target.value)}} />
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
        <ButtonTag3 style={{ marginRight: "10px" }} onClick={handleClickPrevPage}>이전</ButtonTag3>
        <ButtonTag4 style={{ marginLeft: "10px" }} onClick={handleClickCreateProfile}>완료</ButtonTag4>
      </span>
      </ProfileEditFooter>
    </div>
  );
}

export default CreateProfilePage