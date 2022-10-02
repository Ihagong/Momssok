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
  const [profile, setProfile] = useRecoilState(profileState)
  const [animalList, setAnimalList] = useRecoilState(animalDictionaryState)
  // const [animalList, setAnimalList] = useState(animalListt['animals'])
  
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
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '500px' }}>
      <div style={{ display: 'flex', marginTop: '-10px' }}>
        <LetterPageHeader>
          <div style={{display: "flex", alignItems: "center", marginLeft: "10px" }}>
            <LightButton120 onClick={() => navigate("/child")}>닫기</LightButton120>
            <BrownText100>동물도감</BrownText100>
          </div>
        </LetterPageHeader>

      </div>
      <DictionarySectionComponentTag>
        <DictionaryDetailComponentTag>
          <p style={{ margin: 0, margin: '30px 0 0 0', lineHeight: '50px' }}>{animalList[detailIndex].name_ko}</p>
          {/* <img src={`/images/${animalList[detailIndex].name}/${animalList[detailIndex].name}.svg`}></img> */}
          <DictionaryDetailImageComponent name={animalList[detailIndex].name} />
          <div style={{ display: 'flex' }}>
            <ChildButtonTag4 onClick={() => handleClickCreateDictionaryButton(animalList[detailIndex])}>그리기</ChildButtonTag4>
            <ChildButtonTag2 style={{ margin: '0 0 0 20px' }}>설명</ChildButtonTag2>
          </div>
        </DictionaryDetailComponentTag>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginLeft: '20px'}}>
          {animalList.map((element, index) => {
            return (
              <DictionaryCardComponent key={index} info={element} handleClickDictionaryCardComponent={handleClickDictionaryCardComponent}>
              </DictionaryCardComponent>
            )
          })}
        </div>
      </DictionarySectionComponentTag>
    </div>
  )
}

export default AnimalDictionaryPage