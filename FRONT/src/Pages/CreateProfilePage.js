import React, { useState } from 'react'
import { ProfileInfoLabelTag, ProfileInfoInputTag, ButtonTag3, ButtonTag4, ProfileImageTag, ProfileSelectedImageTag } from '../Style/Components'
import { useNavigate } from  'react-router-dom'
import { useAuthCallback } from '../Functions/useAuthCallback'


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
      const birthday = `${ year ? year : 2000 }-${ month ? month < 10 ? '0'+month : month : '01' }-${ day ? day < 10 ? '0'+day : day : '01' }`
      createProfileCallback(name, birthday, selectedImageIndex, null)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h3>자녀 프로필 등록</h3>
      <h4>아이의 이름과 생년월일, 캐릭터를 선택해 주세요.</h4>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ProfileInfoLabelTag htmlFor='name'>이름</ProfileInfoLabelTag>
          <ProfileInfoInputTag style={{ width: '300px' }} type='text' id='name' value={name} onChange={(e) => {setName(e.target.value)}} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ProfileInfoLabelTag htmlFor='year'>생년월일</ProfileInfoLabelTag>
          <span>
            <ProfileInfoInputTag style={{ width: '200px' }} type='number' id='year' value={year} onChange={(e) => {setYear(e.target.value)}}  min="1900" max="2022" />년
            <ProfileInfoInputTag style={{ width: '110px' }} type='number' id='month' value={month} onChange={(e) => {setMonth(e.target.value)}} min="1" max="12" />월
            <ProfileInfoInputTag style={{ width: '110px' }} type='number' id='day' value={day} onChange={(e) => {setDay(e.target.value)}} min="1" max="31" />일
          </span>
        </div>
      </div>
      <ProfileInfoLabelTag>캐릭터</ProfileInfoLabelTag>
      <p>캐릭터 이미지</p>
      <span>
        { selectedImageIndex === 0 ? <ProfileSelectedImageTag><img src='/images/profile.png' /></ProfileSelectedImageTag>
          :  <ProfileImageTag onClick={() => setSelectedImageIndex(0)}><img src='/images/profile.png' /></ProfileImageTag> }
        { selectedImageIndex === 1 ? <ProfileSelectedImageTag><img src='/images/profile.png' /></ProfileSelectedImageTag>
          :  <ProfileImageTag onClick={() => setSelectedImageIndex(1)}><img src='/images/profile.png' /></ProfileImageTag> }
        { selectedImageIndex === 2 ? <ProfileSelectedImageTag><img src='/images/profile.png' /></ProfileSelectedImageTag>
          :  <ProfileImageTag onClick={() => setSelectedImageIndex(2)}><img src='/images/profile.png' /></ProfileImageTag> }
        { selectedImageIndex === 3 ? <ProfileSelectedImageTag><img src='/images/profile.png' /></ProfileSelectedImageTag>
          :  <ProfileImageTag onClick={() => setSelectedImageIndex(3)}><img src='/images/profile.png' /></ProfileImageTag> }
        { selectedImageIndex === 4 ? <ProfileSelectedImageTag><img src='/images/profile.png' /></ProfileSelectedImageTag>
          :  <ProfileImageTag onClick={() => setSelectedImageIndex(4)}><img src='/images/profile.png' /></ProfileImageTag> }
        { selectedImageIndex === 5 ? <ProfileSelectedImageTag><img src='/images/profile.png' /></ProfileSelectedImageTag>
          :  <ProfileImageTag onClick={() => setSelectedImageIndex(5)}><img src='/images/profile.png' /></ProfileImageTag> }
      </span>
      <span>
        <ButtonTag3 onClick={handleClickPrevPage}>이전</ButtonTag3>
        <ButtonTag4 onClick={handleClickCreateProfile}>완료</ButtonTag4>
      </span>
    </div>
  );
}

export default CreateProfilePage