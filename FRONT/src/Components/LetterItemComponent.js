import React from "react"
import { useNavigate } from "react-router-dom"

import { LetterItem, LetterItemContent, LetterItemAuthor } from "../Style/Components"
import { getStringDate } from "../util/date"


const LetterItemComponent = ({ letterId, title, author, date }) => {
  const navigate = useNavigate()

  const strDate = getStringDate(new Date(parseInt(date)))

  const goDetail = () => {
    navigate(`/letter/${letterId}`)
  };

  return (
    <LetterItem>
      <LetterItemContent onClick={goDetail}>
        <div>{title.slice(0, 25)}</div>
        <div>
          <LetterItemAuthor>{author}</LetterItemAuthor>
          <div style={{fontSize:"32px"}}>{strDate}</div>
        </div>
      </LetterItemContent>
    </LetterItem>
  )
}

export default React.memo(LetterItemComponent)
