import React, { useEffect, useState } from 'react'
import { BrownText100, LightButton120, LetterPageHeader, ChildProfileTag, PromiseBoardTag, PromiseItemTag1, PromiseItemTag2 } from '../Style/Components'
import { PromiseModalComponent } from '../Components/PromiseModalComponent'
import { useRecoilState } from 'recoil'
import { profileState, promiseItemsState } from '../store/atoms'
import { usePromiseCallback } from '../Functions/usePromiseCallback'
import { useNavigate } from 'react-router'


function PromisePage() {
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [promiseItems, setPromiseItems] = useRecoilState(promiseItemsState)
  const [modalOpen, setModalOpen] = useState(false);
  const [promiseItem, setPromiseItem] = useState({});
  const { getAllPromiseCallback } = usePromiseCallback()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(profileInfo)
    getAllPromiseCallback(profileInfo.name)
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

  const handleClickChildProfile = () => {
    navigate('/profile')
  }

{/* <PaintingToolModalComponent modalOpen={paintingToolModalOpen} setPaintingToolModalOpen={setPaintingToolModalOpen} motionTextureIndex={strokeTextureIndex} offset={offset} gesture={gesture}
          changeStrokeTexture={changeStrokeTexture} changeStrokeLineWidthIndex={changeStrokeLineWidthIndex} onClick={() => setModalOpen(false)} /> */}
  const promiseBoard = () => {
    const result = []
    for (let i = 0; i < 15; i++) {
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
        <LetterPageHeader>
          <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", marginTop: "-40px"}}>
              <LightButton120 onClick={handleClickCloseButton}>닫기</LightButton120>
              <BrownText100>칭찬 도장</BrownText100>
            </div>
            <div style={{ marginLeft:"50px", marginRight:"50px", marginBottom: "-70px" }}>
              <img src={`/icons/boypromiseicon.svg`} />
              <img src={`/icons/girlpromiseicon.svg`} />
              <img src={`/icons/boy2promiseicon.svg`} />
            </div>
            <ChildProfileTag style={{marginTop: "30px", marginRight: "40px"}} onClick={handleClickChildProfile}><img style={{ width: "130px", height: "130px", marginBottom: "-10px" }}src={`/images/profileImage_${profileInfo.image_num}.svg`} />{profileInfo.name}</ChildProfileTag>
          </div>
        </LetterPageHeader>
        <div style={{ display: 'flex', marginTop: "30px" }}>
          <PromiseBoardTag>
            {promiseBoard()}
          </PromiseBoardTag>
        </div>
      </div>
    </>
  );
}

export default PromisePage