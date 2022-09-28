import React, { useState } from 'react'
import { DictionaryDetailComponentTag, ChildButtonTag1, ChildButtonTag2, ChildButtonTag4 } from '../Style/Components'
import { DictionaryCardComponent } from '../Components/DictionaryCardComponent'
import { DictionaryDetailImageComponent } from '../Components/DictionaryDetailImageComponent'
import '../Style/animalAnimation.css'


const AnimalDictionaryPage = () => {

  const animalList = [
    {
      'id': 1,
      'name': 'dog',
      'name_ko': '개',
      'description': '개는 중형 동물이자 가장 널리 분포하며 개체 수가 가장 많은 지상 동물 중 하나이며 가축화한 회색늑대이다. 개는 인류가 최초로 가축으로 삼은 동물로 알려져 있으며, 역사적으로 반려견, 사냥견으로서 길러 왔다.'
    },
    {
      'id': 2,
      'name': 'rabbit',
      'name_ko': '토끼',
      'description': '개는 중형 동물이자 가장 널리 분포하며 개체 수가 가장 많은 지상 동물 중 하나이며 가축화한 회색늑대이다. 개는 인류가 최초로 가축으로 삼은 동물로 알려져 있으며, 역사적으로 반려견, 사냥견으로서 길러 왔다.'
    },
    {
      'id': 3,
      'name': 'elephant',
      'name_ko': '코끼리',
      'description': '개는 중형 동물이자 가장 널리 분포하며 개체 수가 가장 많은 지상 동물 중 하나이며 가축화한 회색늑대이다. 개는 인류가 최초로 가축으로 삼은 동물로 알려져 있으며, 역사적으로 반려견, 사냥견으로서 길러 왔다.'
    },
    {
      'id': 4,
      'name': 'cat',
      'name_ko': '고양이',
      'description': '개는 중형 동물이자 가장 널리 분포하며 개체 수가 가장 많은 지상 동물 중 하나이며 가축화한 회색늑대이다. 개는 인류가 최초로 가축으로 삼은 동물로 알려져 있으며, 역사적으로 반려견, 사냥견으로서 길러 왔다.'
    }
  ]

  const [detail, setDetail] = useState(animalList[0])

  const handleClickDictionaryCardComponent = (info) => {
    setDetail(info)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <ChildButtonTag1>닫기</ChildButtonTag1>
        <p>동물 도감</p>
      </div>
      <div style={{ display: 'flex' }}>
        <DictionaryDetailComponentTag>
          <p style={{ margin: 0 }}>{detail.name_ko}</p>
          {/* <img src={`/images/${detail.name}/${detail.name}.svg`}></img> */}
          <DictionaryDetailImageComponent name={detail.name} />
          <div style={{ display: 'flex' }}>
            <ChildButtonTag4>그리기</ChildButtonTag4>
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