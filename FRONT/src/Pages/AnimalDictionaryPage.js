import React, { useState } from 'react'
import { DictionarySectionComponentTag, DictionaryDetailComponentTag, ChildButtonTag2, ChildButtonTag4, LightButton120, BrownText100, LetterPageHeader } from '../Style/Components'
import { DictionaryCardComponent } from '../Components/DictionaryCardComponent'
import { DictionaryDetailImageComponent } from '../Components/DictionaryDetailImageComponent'
import '../Style/animalAnimation.css'
import { useNavigate } from 'react-router-dom'
import { useDictionaryCallback } from '../Functions/useDictionaryCallback'
import { useRecoilState } from 'recoil'
import { profileState, animalDictionaryState } from '../store/atoms'


const AnimalDictionaryPage = () => {
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [animalList, setAnimalList] = useRecoilState(animalDictionaryState)
  const [openDescription, setOpenDescription] = useState(false)
  
  console.log(animalList)

  const [detailIndex, setDetailIndex] = useState(0)

  const navigate = useNavigate()

  const handleClickDictionaryCardComponent = (info) => {
    setDetailIndex(info.id-1)
  }

  const handleClickCreateDictionaryButton = (info) => {
    console.log('그리기', info.id)
    // setDetail(info)
    navigate(`/dictionary/create/${info.id}`, { state: info })
  }

  const handleClickOpenDescription = (info) => {
    setOpenDescription(!openDescription)
    console.log(info)
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', marginTop: '-10px' }}>
        <LetterPageHeader>
          <div style={{display: "flex", alignItems: "center", marginLeft: "10px" }}>
            <LightButton120 onClick={() => navigate("/child")}>닫기</LightButton120>
            <BrownText100>동물도감</BrownText100>
          </div>
        </LetterPageHeader>
      </div>
      <DictionarySectionComponentTag>
        <div style={{ display: 'flex' }}>
          <DictionaryDetailComponentTag style={{ width: openDescription ? '1024px' : null }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '520px' }}>
              <p style={{ margin: '30px 0 0 0', lineHeight: '50px' }}>{animalList[detailIndex].name_ko}</p>
              {/* <img src={`/images/${animalList[detailIndex].name}/${animalList[detailIndex].name}.svg`}></img> */}
              <DictionaryDetailImageComponent name={animalList[detailIndex].name} />
              <div style={{ display: 'flex' }}>
                <ChildButtonTag4 style={{ width: '200px' }} onClick={() => handleClickCreateDictionaryButton(animalList[detailIndex])}>그리기</ChildButtonTag4>
                <ChildButtonTag2 style={{ width: '200px', margin: '0 0 0 20px' }} onClick={() => handleClickOpenDescription(animalList[detailIndex])}>{ openDescription ? '목록' : '설명'}</ChildButtonTag2>
              </div>
            </div>
            { openDescription ? 
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '48px' }}>
                오랫동안 사람과 함께 살아 온 동물!<br/>
                어린 개를 ‘강아지’라고도 해요.<br/>
                냄새를 잘 맡고 충성심이 강해서 우리에게<br/>
                도움을 많이 준답니다. 하지만 조심하세요!<br/>
                늑대와 조상이 같아서 이빨이 뾰족해요.
              </div> : null }
          </DictionaryDetailComponentTag>
          { openDescription ? 
            null :
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', margin: '10px 20px 0 20px' }}>
              {animalList.map((element, index) => {
                return <DictionaryCardComponent key={index} info={element} handleClickDictionaryCardComponent={handleClickDictionaryCardComponent} openDescription={openDescription}/>
              })}
            </div> }
        </div>
      </DictionarySectionComponentTag>
    </div>
  )
}

export default AnimalDictionaryPage