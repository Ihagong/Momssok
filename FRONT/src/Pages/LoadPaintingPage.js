import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { loadedPaintingState } from '../store/atoms'
import { ChildProfileTag, ChildButtonTag1, ChildButtonTag3, ChildButtonTag4, PaintingCardTag } from '../Style/Components'
import { PaintingCardComponent } from '../Components/PaintingCardComponent'


function LoadPaintingPage() {
  const [loadedPaintingSrc, setLoadedPaintingSrc] = useRecoilState(loadedPaintingState)

  const [sortOrder, setSortOrder] = useState(0)

  const navigate = useNavigate();

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

  const handleClickCreatePaintingButton = () => {
    setLoadedPaintingSrc('')
    navigate('/painting/create')
  }

  const handleClickLoadPaintingButton = () => {
    setLoadedPaintingSrc('/images/MyPainting.png')
    navigate('/painting/create')
  }

  const paintingList = [{ id: 1, date: '2022.09.19', tags: ['운동회', '계주', '줄다리기'] }]

  return (
    <>
      <div style={{ display: 'flex' }}>
        <ChildButtonTag1 style={{ width: '120px' }}>닫기</ChildButtonTag1>
        <h3>그림 그리기</h3>
        <ChildProfileTag><img src='/icons/boy.svg' />아이 이름</ChildProfileTag>
      </div>
      <div style={{ display: 'flex' }}>
        { sortOrder === 0 ?
          <ChildButtonTag3>최신순</ChildButtonTag3>
        :
          <ChildButtonTag4 onClick={() => setSortOrder(0)}>최신순</ChildButtonTag4>
        }
        { sortOrder === 1 ?
          <ChildButtonTag3>오래된순</ChildButtonTag3>
        :
          <ChildButtonTag4 onClick={() => setSortOrder(1)}>오래된순</ChildButtonTag4>
        }
      </div>
      <div style={{ display: 'flex' }}>
        <PaintingCardTag onClick={handleClickCreatePaintingButton}><img src='/icons/plus_brown.svg' /></PaintingCardTag>
        {paintingList.map((info) => (
          <div onClick={handleClickLoadPaintingButton}>
            <PaintingCardComponent key={info.id} info={info} />
          </div>
        ))}
      </div>
    </>
  );
}

export default LoadPaintingPage