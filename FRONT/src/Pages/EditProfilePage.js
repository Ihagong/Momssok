import React, { useEffect, useState } from 'react'
import { ProfileInfoLabelTag, ProfileInfoInputTag, ButtonTag3, ButtonTag4, ProfileImageTag, ProfileSelectedImageTag } from '../Style/Components'
import { useNavigate, useLocation } from  'react-router-dom'
import { useAuthCallback } from '../Functions/useAuthCallback'


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
      // deleteProfileCallback()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h3>자녀 프로필 관리</h3>
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
        { selectedImageIndex === 0 ? <ProfileSelectedImageTag><img src='/images/profileImage_0.png' /></ProfileSelectedImageTag>
          :  <ProfileImageTag onClick={() => setSelectedImageIndex(0)}><img src='/images/profileImage_0.png' /></ProfileImageTag> }
        { selectedImageIndex === 1 ? <ProfileSelectedImageTag><img src='/images/profileImage_1.png' /></ProfileSelectedImageTag>
          :  <ProfileImageTag onClick={() => setSelectedImageIndex(1)}><img src='/images/profileImage_1.png' /></ProfileImageTag> }
        { selectedImageIndex === 2 ? <ProfileSelectedImageTag><img src='/images/profileImage_2.png' /></ProfileSelectedImageTag>
          :  <ProfileImageTag onClick={() => setSelectedImageIndex(2)}><img src='/images/profileImage_2.png' /></ProfileImageTag> }
        { selectedImageIndex === 3 ? <ProfileSelectedImageTag><img src='/images/profileImage_3.png' /></ProfileSelectedImageTag>
          :  <ProfileImageTag onClick={() => setSelectedImageIndex(3)}><img src='/images/profileImage_3.png' /></ProfileImageTag> }
        { selectedImageIndex === 4 ? <ProfileSelectedImageTag><img src='/images/profileImage_4.png' /></ProfileSelectedImageTag>
          :  <ProfileImageTag onClick={() => setSelectedImageIndex(4)}><img src='/images/profileImage_4.png' /></ProfileImageTag> }
        { selectedImageIndex === 5 ? <ProfileSelectedImageTag><img src='/images/profileImage_5.png' /></ProfileSelectedImageTag>
          :  <ProfileImageTag onClick={() => setSelectedImageIndex(5)}><img src='/images/profileImage_5.png' /></ProfileImageTag> }
      </span>
      <span>
        <ButtonTag3 onClick={handleClickPrevPage}>이전</ButtonTag3>
        <ButtonTag3 onClick={handleClickDeleteButton}>삭제</ButtonTag3>
        <ButtonTag4 onClick={handleClickUpdateProfile}>완료</ButtonTag4>
      </span>
    </div>
  );
}

export default EditProfilePage