import React, { useState } from 'react'
import { ProfileInfoLabelTag, ProfileInfoInputTag, ButtonTag3, ButtonTag4 } from '../Style/Components'
import { useNavigate } from  'react-router-dom'


function CreateProfilePage() {
  const [name, setName] = useState('')
  const [year, setYear] = useState(null)
  const [month, setMonth] = useState(null)
  const [day, setDay] = useState(null)

  const navigate = useNavigate()

  const handleClickPrevPage = () => {
    navigate(-1)
  }

  const handleClickCreateProfile = () => {
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h3>자녀 프로필 등록</h3>
      <h4>아이의 이름과 생년월일, 캐릭터를 선택해 주세요.</h4>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ProfileInfoLabelTag for='name'>이름</ProfileInfoLabelTag>
          <ProfileInfoInputTag style={{ width: '300px' }} type='text' id='name' value={name} onChange={(e) => {setName(e.target.value)}} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ProfileInfoLabelTag for='year'>생년월일</ProfileInfoLabelTag>
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
        <ButtonTag3 onClick={handleClickPrevPage}>이전</ButtonTag3>
        <ButtonTag4 onClick={handleClickCreateProfile}>완료</ButtonTag4>
      </span>
    </div>
  );
}

export default CreateProfilePage