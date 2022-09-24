import React from 'react'
import { useNavigate } from  'react-router-dom'
import { ChildProfileComponentTag, AddProfileButtonTag } from '../Style/Components'


export function CreateProfileComponent() {
  const navigate = useNavigate()

  const handleClickCreateProfileButton = () => {
    navigate('/profile/create')
  }

  return (
    <ChildProfileComponentTag onClick={handleClickCreateProfileButton}>
      <AddProfileButtonTag style={{ backgroundColor: 'var(--White-Block)', width: '110px', height: '110px' }}>
        <img style={{ width: '50px', height: '50px' }} src='/icons/plus_brown.svg'></img>
      </AddProfileButtonTag>
      <p>프로필 등록</p>
    </ChildProfileComponentTag>
  )
}