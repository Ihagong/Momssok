import React, { useState } from "react"

import { OrangeButton250, LightButton250, LetterEmpty } from "../Style/Components"
import LetterItemComponent from "./LetterItemComponent"

const LetterListComponent = ({ letterList }) => {
  
  const [sortType, setSortType] = useState("latest")


  const latestType = () => {
    setSortType("latest")
  }

  const oldestType = () => {
    setSortType("oldest")
  }

  const getProcessedLetterList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(new Date(b.date).getTime()) - parseInt(new Date(a.date).getTime());
      } else {
        return parseInt(new Date(a.date).getTime()) - parseInt(new Date(b.date).getTime());
      }
    }

    const copyList = JSON.parse(JSON.stringify(letterList))
    const sortedList = copyList.sort(compare)
    return sortedList
  }

  return (
    <div className="LetterListComponent">
      {sortType === "latest" ? 
        <div style={{display: "flex" }}>
        <OrangeButton250 style={{marginLeft: "40px"}} onClick={latestType}>최신순</OrangeButton250>
        <LightButton250 onClick={oldestType}>오래된 순</LightButton250>
        </div> : 
        <div style={{display: "flex" }}>
        <LightButton250 style={{marginLeft: "40px"}} onClick={latestType}>최신순</LightButton250>
        <OrangeButton250 onClick={oldestType}>오래된 순</OrangeButton250>
        </div>
      } 
      { letterList.length === 0 ? 
        <LetterEmpty>편지함에 편지가 없습니다.</LetterEmpty> :
        <div>
          {getProcessedLetterList().map((it) => (
            <LetterItemComponent key={it.letter_id} {...it} />
          ))}
        </div>
      }
    </div>
  )
}

LetterListComponent.defaultProps = {
  letterList: [],
}

export default LetterListComponent