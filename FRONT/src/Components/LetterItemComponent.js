import React from "react"
import { useNavigate } from "react-router-dom"

import { useRecoilState } from 'recoil'
import { totalLetterListState } from '../store/atoms'

import { LetterItemTitle, LetterItem, LetterItemContent, LetterItemAuthor } from "../Style/Components"
import { getStringDate } from "../util/date"


const LetterItemComponent = ({ letter_id, date, author, check, receiver, title, content }) => {
  const navigate = useNavigate()
  const [letterList, setLetterList] = useRecoilState(totalLetterListState)


  const strDate = getStringDate(new Date(parseInt(date)))

  //onEdit
  const onEdit = (newLetterList) => {
    setLetterList(newLetterList)
  }

  const goDetail = () => {
    let newLetter = {}
    let newLetterList = []
    newLetter = {
      letter_id,
      date,
      author,
      check: true,
      receiver,
      title,
      content
    }
    newLetterList = letterList.map((it) =>
    it.letter_id === letter_id ? { ...newLetter } : it
    )
    onEdit(newLetterList)
    navigate(`/letter/${letter_id}`)
  };

  return (
    <LetterItem style={{backgroundColor: check === false ? "#FDFDF5" : "#F5F5F5"}}>  
      <LetterItemContent onClick={goDetail}>
        <LetterItemTitle>
          {check === false ? 
            <img src='/icons/letteroff.svg' />
            : <img src='/icons/letteron.svg' />
          } 
          <span style={{marginLeft: "20px"}}>{title.slice(0, 25)}</span>
        </LetterItemTitle>
        <div>
          <LetterItemAuthor>{author}</LetterItemAuthor>
          <div style={{fontSize:"32px"}}>{strDate}</div>
        </div>
      </LetterItemContent>
    </LetterItem>
  )
}

export default React.memo(LetterItemComponent)
