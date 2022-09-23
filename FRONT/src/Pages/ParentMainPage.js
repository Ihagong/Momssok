import React from 'react'
import { LogoTag, EditProfileButtonTag, ParentMenuButtonTag } from '../Style/Components'
import { useNavigate } from  'react-router-dom'


function ParentMainPage() {
  const childInfo = { id: 0, name: '찬석이', birth: '2017.12', age: 6 } // 아이 정보

  const navigate = useNavigate()

  const handleClickReportButton = () => {
  }

  const handleClickRecordButton = () => {
  }

  const handleClickPromiseButton = () => {
  }

  const handleClickLetterButton = () => {
    navigate('/letter')
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <p>프로필 이미지</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>{childInfo.name} | {childInfo.age}세</h3>
          <p>다른 프로필로 변경하거나 신규 프로필을 수정하고 신규로 등록할 수 있어요!</p>
        </div>
        <EditProfileButtonTag>프로필 등록/변경</EditProfileButtonTag>
      </div>
      <div style={{ display: 'flex' }}>
        <ParentMenuButtonTag onClick={handleClickReportButton}>
          <h4>진단 리포트</h4>
          <p>아이의 감정 분석 결과가</p>
          <p>궁금하다면?</p>
          <LogoTag src='icons/report.svg' />
        </ParentMenuButtonTag>
        <ParentMenuButtonTag onClick={handleClickRecordButton}>
          <h4>활동 내역</h4>
          <p>아이의 활동 내역이</p>
          <p>궁금하다면?</p>
          <LogoTag src='icons/report.svg' />
        </ParentMenuButtonTag>
        <ParentMenuButtonTag onClick={handleClickPromiseButton}>
          <h4>약속 관리</h4>
          <p>아이와의 약속을</p>
          <p>관리하세요!</p>
          <LogoTag src='icons/report.svg' />
        </ParentMenuButtonTag>
        <ParentMenuButtonTag onClick={handleClickLetterButton}>
          <h4>편지함</h4>
          <p>아이와 주고받는 편지를</p>
          <p>관리하세요!</p>
          <LogoTag src='icons/report.svg' />
        </ParentMenuButtonTag>
      </div>
    </>
  );
}

export default ParentMainPage