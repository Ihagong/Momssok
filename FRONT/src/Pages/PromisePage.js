import React, { useEffect, useState } from 'react'
import { BrownText100, LightButton120, LetterPageHeader, ChildProfileTag, PromiseBoardTag, PromiseItemTag } from '../Style/Components'
import { PromiseModalComponent } from '../Components/PromiseModalComponent'
import { useRecoilState } from 'recoil'
import { parentActiveState, profileState, promiseItemsState } from '../store/atoms'
import { usePromiseCallback } from '../Functions/usePromiseCallback'
import { useNavigate } from 'react-router'


function PromisePage() {
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [promiseItems, setPromiseItems] = useRecoilState(promiseItemsState)
  const [parentActive, setParentActive] = useRecoilState(parentActiveState)
  const [modalOpen, setModalOpen] = useState(false)
  const [promiseBoard, setPromiseBoard] = useState([])
  const [promiseItem, setPromiseItem] = useState({})
  const [doneList, setDoneList] = useState([])

  const { getAllPromiseCallback } = usePromiseCallback()
  const navigate = useNavigate()

  useEffect(() => {
    getAllPromiseCallback(profileInfo.name)
  }, [])

  const [promiseItemId, setPromiseItemId] = useState(0)

  const handleClickPromiseItem = (id) => {
    setPromiseItem(promiseItems[id-1])
    setModalOpen(true)
    setPromiseItemId(id)
  }

  const handleClickCloseButton = () => {
    if (parentActive) {
      navigate('/parent')
    } else {
      navigate('/child')
    }
  }

  const handleClickChildProfile = () => {
    if (parentActive) {
      navigate('/parent')
    } else {
      navigate('/profile')
    }
  }

  const length = (promiseItems.length < 15 ? promiseItems.length+1 : 15)

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        { modalOpen ? <PromiseModalComponent promiseItemId={promiseItemId} promiseItem={promiseItem} setModalOpen={setModalOpen} /> : null }
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
            {[...Array(15)].map((_, i) => {
              return (
                <PromiseItemTag style={{ backgroundColor: (i < length-1 || (i === length-1 && parentActive)) ? null : '#C5BEB660',
                  cursor: (i < length-1 || (i === length-1 && parentActive)) ? 'pointer' : 'default',
                  transform: i%2 ? 'rotate(8deg)' : 'rotate(-6deg)' }}
                  key={i} onClick={() => (i < length-1 || (i === length-1 && parentActive)) ? handleClickPromiseItem(i+1) : null}>
                  { promiseItems[i]?.done ? <img style={{ width: '80px', height: '80px' }} src='/icons/stamp.png'></img> : null }
                  { (parentActive && i === length-1) ? <img style={{ width: '50px', height: '50px' }} src='/icons/plus_brown.svg'></img> : null }
                </PromiseItemTag>
              )
            })}
          </PromiseBoardTag>
        </div>
      </div>
    </>
  );
}

export default PromisePage