import React from 'react'
import { useRecoilState } from 'recoil'
import { diaryContentState } from '../store/atoms'


export function KeepDiaryComponent() {
  const [diaryContent, setDiaryContent] = useRecoilState(diaryContentState)
  
  return (
    <div>
      <h5>일기 작성</h5>
      <textarea rows='5' cols='50' value={diaryContent} onChange={(e) => {setDiaryContent(e.target.value)}} />
    </div>
  );
}