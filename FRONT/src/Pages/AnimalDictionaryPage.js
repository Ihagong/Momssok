import React, { useState } from 'react'
import { DictionaryDetailComponentTag, ChildButtonTag1, ChildButtonTag2, ChildButtonTag4, LightButton120, BrownLightButton150, BrownText100, LetterPageHeader } from '../Style/Components'
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
  // const [animals, set]
  
  // const animalList = [
  //   {
  //     'id': 1,
  //     'name': 'dog',
  //     'name_ko': '개',
  //     'description': '개는 중형 동물이자 가장 널리 분포하며 개체 수가 가장 많은 지상 동물 중 하나이며 가축화한 회색늑대이다. 개는 인류가 최초로 가축으로 삼은 동물로 알려져 있으며, 역사적으로 반려견, 사냥견으로서 길러 왔다.'
  //   },
  //   {
  //     'id': 2,
  //     'name': 'rabbit',
  //     'name_ko': '토끼',
  //     'description': '개는 중형 동물이자 가장 널리 분포하며 개체 수가 가장 많은 지상 동물 중 하나이며 가축화한 회색늑대이다. 개는 인류가 최초로 가축으로 삼은 동물로 알려져 있으며, 역사적으로 반려견, 사냥견으로서 길러 왔다.'
  //   },
  //   {
  //     'id': 3,
  //     'name': 'elephant',
  //     'name_ko': '코끼리',
  //     'description': '개는 중형 동물이자 가장 널리 분포하며 개체 수가 가장 많은 지상 동물 중 하나이며 가축화한 회색늑대이다. 개는 인류가 최초로 가축으로 삼은 동물로 알려져 있으며, 역사적으로 반려견, 사냥견으로서 길러 왔다.'
  //   },
  //   {
  //     'id': 4,
  //     'name': 'cat',
  //     'name_ko': '고양이',
  //     'description': '개는 중형 동물이자 가장 널리 분포하며 개체 수가 가장 많은 지상 동물 중 하나이며 가축화한 회색늑대이다. 개는 인류가 최초로 가축으로 삼은 동물로 알려져 있으며, 역사적으로 반려견, 사냥견으로서 길러 왔다.'
  //   }
  // ]

  const [detailIndex, setDetailIndex] = useState(0)

  const navigate = useNavigate()

  const handleClickDictionaryCardComponent = (info) => {
    setDetailIndex(info.id-1)
  }

  const handleClickCreateDictionaryButton = (detailId) => {
    console.log('그리기', detailId)
    // setDetail(info)
    navigate(`/dictionary/create/${detailId}`)
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '500px' }}>
      <div style={{ display: 'flex' }}>
        <LetterPageHeader>
          <div style={{display: "flex", alignItems: "center", marginLeft: "10px" }}>
            <LightButton120 onClick={() => navigate("/child")}>닫기</LightButton120>
            <BrownLightButton150 onClick={() => navigate("/letter/create")}>새 편지</BrownLightButton150>
            <BrownText100>동물도감</BrownText100>
          </div>
        </LetterPageHeader>

        {/* <ChildButtonTag1>닫기</ChildButtonTag1>
        <p>동물 도감</p> */}
      </div>
      <div style={{ display: 'flex' }}>
        <DictionaryDetailComponentTag>
          <p style={{ margin: 0 }}>{animalList[detailIndex].name_ko}</p>
          <img src={`/images/${animalList[detailIndex].name}/${animalList[detailIndex].name}.svg`}></img>
          <DictionaryDetailImageComponent name={`animalList[detailIndex].name`} />
          <div style={{ display: 'flex' }}>
            <ChildButtonTag4 onClick={() => handleClickCreateDictionaryButton(detailIndex)}>그리기</ChildButtonTag4>
            <ChildButtonTag2>설명</ChildButtonTag2>
          </div>
        </DictionaryDetailComponentTag>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {animalList.map((element, index) => {
            return (
              <DictionaryCardComponent key={index} info={element} handleClickDictionaryCardComponent={handleClickDictionaryCardComponent}>
              </DictionaryCardComponent>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AnimalDictionaryPage