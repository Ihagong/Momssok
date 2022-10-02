import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePaintingCallback } from '../Functions/usePaintingCallback'

import { useRecoilState } from 'recoil'
import { loadedPaintingState, profileState, loadedPaintingListState } from '../store/atoms'

import { OrangeButton250, LightButton250, LetterPageHeader, BrownText100, LightButton120, BrownLightButton150, ChildProfileTag, ChildButtonTag1, ChildButtonTag3, ChildButtonTag4, PaintingCardTag } from '../Style/Components'
import { PaintingCardComponent } from '../Components/PaintingCardComponent'


function LoadPaintingPage() {
  const { getAllPaintingCallback } = usePaintingCallback()
  const navigate = useNavigate();
  const [loadedPaintingSrc, setLoadedPaintingSrc] = useRecoilState(loadedPaintingState)
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [loadedPaintingList, setLoadedPaintingList] = useRecoilState(loadedPaintingListState)
  
  const [sortOrder, setSortOrder] = useState(0)

  useEffect(() => {
    getAllPaintingCallback(profileInfo.name)
  }, [])

  const handleChangeFile = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('painting', e.target.files[0])
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    
    return new Promise((resolve) => {
      reader.onload = () => {
        setLoadedPaintingSrc(reader.result)
        resolve()
        
        navigate('/painting/create')
      }
    })
  }

  const handleClickChildProfile = () => {
    navigate('/profile')
  }

  const handleClickCreatePaintingButton = () => {
    setLoadedPaintingSrc('')
    navigate('/painting/create')
  }

  const handleClickLoadPaintingButton = () => {
    setLoadedPaintingSrc('/images/MyPainting.png')
    navigate('/painting/create')
  }

  return (
    <div className='LetterPageHome'>
      <LetterPageHeader>
        <div style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>
          <LightButton120 onClick={() => navigate("/child")}>닫기</LightButton120>
          <BrownText100>그림 그리기</BrownText100>
        </div>
          <ChildProfileTag style={{marginTop: "30px", marginRight: "40px"}} onClick={handleClickChildProfile}><img src={`/images/profileImage_${profileInfo.image_num}.svg`} />{profileInfo.name}</ChildProfileTag>
      </LetterPageHeader>

      <div style={{ display: 'flex', marginTop: "-20px" }}>
        { sortOrder === 0 ?
          <OrangeButton250 style={{marginLeft: "70px"}}>최신순</OrangeButton250>
        :
          <LightButton250 style={{marginLeft: "70px"}} onClick={() => setSortOrder(0)}>최신순</LightButton250>
        }
        { sortOrder === 1 ?
          <OrangeButton250>오래된순</OrangeButton250>
        :
          <LightButton250 onClick={() => setSortOrder(1)}>오래된순</LightButton250>
        }
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 3fr)', marginTop: "40px", marginLeft: "50px" }}>
        <PaintingCardTag onClick={handleClickCreatePaintingButton}><img src='/icons/plus_brown.svg' /></PaintingCardTag>
        {loadedPaintingList.map((info) => (
          <div key={info.drawing_id} onClick={handleClickLoadPaintingButton}>
            <PaintingCardComponent info={info} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadPaintingPage