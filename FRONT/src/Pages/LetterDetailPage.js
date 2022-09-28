import React from 'react'
import { useParams } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { LetterItemState } from '../store/atoms'
import { useLetterCallback } from '../Functions/useLetterCallback'

import LetterEditorComponent from '../Components/LetterEditorComponent'



function LetterDetailPage() {
  const { letterDetailCallback } = useLetterCallback()

  const { letterId } = useParams()
  letterDetailCallback(letterId)

  const [letterItem, setLetterItem] = useRecoilState(LetterItemState)

  return (
    <div>
      {letterItem && <LetterEditorComponent isDetail={true} letterItem={letterItem} />}
    </div>
  )
}

export default LetterDetailPage