import React, { useEffect, useState } from 'react'
import { ChildButtonTag1, ChildProfileTag, PromiseBoardTag, PromiseItemTag1, PromiseItemTag2 } from '../Style/Components'
import { PromiseModalComponent } from '../Components/PromiseModalComponent'
import { useRecoilState } from 'recoil'
import { modalOpenState, profileState } from '../store/atoms'
import { usePromiseCallback } from '../Functions/usePromiseCallback'


function PromisePage() {
  const [profile, setProfile] = useRecoilState(profileState)
  // const [modalOpen, setModalOpen] = useState(false);
  const { getAllPromiseCallback } = usePromiseCallback()

  useEffect(() => {
    getAllPromiseCallback(profile.name)
  }, [])

  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState)
  const [promiseId, setPromiseId] = useState(0)

  const handleClickPromiseItem = (id) => {
    setPromiseId(id)
    setModalOpen(true)
  }

  const promiseBoard = () => {
    const result = []
    for (let i = 0; i < 15; i++) {
      if (i%2) {
        result.push(<PromiseItemTag1 key={i} onClick={() => handleClickPromiseItem(i+1)}></PromiseItemTag1>)
      } else {
        result.push(<PromiseItemTag2 key={i} onClick={() => handleClickPromiseItem(i+1)}></PromiseItemTag2>)
      }
    }
    return result
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        { modalOpen ? <PromiseModalComponent promiseId={promiseId} /> : null }
        <div style={{ display: 'flex' }}>
          <ChildButtonTag1 style={{ width: '120px' }}>닫기</ChildButtonTag1>
          <h3>OO이의 칭찬 도장</h3>
          <ChildProfileTag ChildProfileTag><img src='/icons/boy.svg' />아이 이름</ChildProfileTag>
        </div>
        <div style={{ display: 'flex' }}>
          <PromiseBoardTag>
            {promiseBoard()}
          </PromiseBoardTag>
        </div>
      </div>
    </>
  );
}

export default PromisePage