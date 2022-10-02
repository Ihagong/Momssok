import React from "react"
import { useNavigate } from "react-router-dom"

import { LetterItemTitle, LetterItem, LetterItemContent, LetterItemAuthor } from "../Style/Components"
import { getStringDate } from "../util/date"


const LetterItemComponent = ({ letter_id, date, author, check, title }) => {
  const navigate = useNavigate()

  const strDate = getStringDate(new Date(date))


  const goDetail = () => {
    navigate(`/letter/${letter_id}`)
  };

  return (
    <LetterItem style={{backgroundColor: check === 0 ? "#FDFDF5" : "#F5F5F5"}}>  
      <LetterItemContent onClick={goDetail}>
        <LetterItemTitle>
          {check === 0 ? 
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
