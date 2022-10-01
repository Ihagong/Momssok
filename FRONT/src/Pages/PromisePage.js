import React, { useEffect, useState } from 'react'
import { ChildButtonTag1, ChildProfileTag, PromiseBoardTag, PromiseItemTag1, PromiseItemTag2 } from '../Style/Components'
import { PromiseModalComponent } from '../Components/PromiseModalComponent'
import { useRecoilState } from 'recoil'
import { profileState, promiseItemsState } from '../store/atoms'
import { usePromiseCallback } from '../Functions/usePromiseCallback'
import { useNavigate } from 'react-router'


function PromisePage() {
  const [profile, setProfile] = useRecoilState(profileState)
  const [promiseItems, setPromiseItems] = useRecoilState(promiseItemsState)
  const [modalOpen, setModalOpen] = useState(false);
  const [promiseItem, setPromiseItem] = useState({});
  const { getAllPromiseCallback } = usePromiseCallback()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(profile)
    getAllPromiseCallback(profile.name)
  }, [])

  // const [modalOpen, setModalOpen] = useRecoilState(modalOpenState)
  const [promiseId, setPromiseId] = useState(0)

  // const handleClickModalClose = () => {
  //   setModalOpen(false)
  //   // setPaintingToolModalOpen(false)
  //   // setColorPickerModalOpen(false)
  // }

  const handleClickPromiseItem = (id) => {
    setPromiseItem(promiseItems[id])
    setModalOpen(true)
    // setPromiseId(id)
    // setModalOpen(true)
  }

  const handleClickCloseButton = () => {
    navigate('/child')
  }

{/* <PaintingToolModalComponent modalOpen={paintingToolModalOpen} setPaintingToolModalOpen={setPaintingToolModalOpen} motionTextureIndex={strokeTextureIndex} offset={offset} gesture={gesture}
          changeStrokeTexture={changeStrokeTexture} changeStrokeLineWidthIndex={changeStrokeLineWidthIndex} onClick={() => setModalOpen(false)} /> */}
  const promiseBoard = () => {
    const result = []
    for (let i = 0; i <= 15; i++) {
      if (i%2) {
        result.push(<PromiseItemTag1 key={i} onClick={() => handleClickPromiseItem(i)}></PromiseItemTag1>)
      } else {
        result.push(<PromiseItemTag2 key={i} onClick={() => handleClickPromiseItem(i)}></PromiseItemTag2>)
      }
    }
    return result
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        { modalOpen ? <PromiseModalComponent promiseItem={promiseItem} setModalOpen={setModalOpen} /> : null }
        <div style={{ display: 'flex' }}>
          <ChildButtonTag1 style={{ width: '120px' }} onClick={handleClickCloseButton}>닫기</ChildButtonTag1>
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