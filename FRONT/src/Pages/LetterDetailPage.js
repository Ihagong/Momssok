import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { letterItemState } from '../store/atoms'
import { useLetterCallback } from '../Functions/useLetterCallback'

import LetterEditorComponent from '../Components/LetterEditorComponent'



function LetterDetailPage() {
  const { letterDetailCallback } = useLetterCallback()

  const { letterId } = useParams()
  useEffect(() => {
    letterDetailCallback(letterId)
  }, [])

  const [letterItem, setLetterItem] = useRecoilState(letterItemState)

  return (
    <div>
      {letterItem && <LetterEditorComponent isDetail={true} letterItem={letterItem} />}
    </div>
  )
}

export default LetterDetailPage