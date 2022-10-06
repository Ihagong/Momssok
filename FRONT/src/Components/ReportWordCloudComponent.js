import React, { useEffect } from "react";
import WordCloud from "react-d3-cloud";

import { EmotionReportTag } from '../Style/Components'

import { useRecoilState } from 'recoil'
import { profileState, totalLetterListState, totalDiaryListState, userInfoState, wordCloudTagListState } from '../store/atoms'
import { useReportCallback } from '../Functions/useReportCallback'
import { useDiaryCallback } from '../Functions/useDiaryCallback'
import { useLetterCallback } from '../Functions/useLetterCallback'



const fontSize = (word) => word.value / 20;
const rotate = (word) => (word.value % 90) - 45;



export function ReportWordCloudComponent() {
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [letterList, setLetterList] = useRecoilState(totalLetterListState)
  const [loadedDiaryList, setLoadedDiaryList] = useRecoilState(totalDiaryListState)
  const [wordCloudTagList, setWordCloudTagList] = useRecoilState(wordCloudTagListState)
  const { getWordCloudCallback } = useReportCallback()
  const { getAllDiaryCallback } = useDiaryCallback()
  const { letterInfoCallback } = useLetterCallback()


  useEffect(() => {
    getWordCloudCallback(profileInfo.name)
    letterInfoCallback(userInfo.username)
  }, [])

  const data = () => {
    let result = []
    
    loadedDiaryList.forEach((diary) => {
      diary.content.split('.').forEach((sentence) => {
        sentence.split(' ').forEach((word) => {
          if (word) {
            result.push(word)
          }
        })
      })
    })

    letterList.filter((letter) => {
      return letter.author === profileInfo.name
    }).forEach((letterItem) => {
      letterItem.content.split('.').forEach((sentence) => {
        sentence.split(' ').forEach((word) => {
          if (word) {
            result.push(word)
          }
        })
      })
    })

    wordCloudTagList.forEach((tag) => {
      result.push(tag)
    })
    return result
  }

  const newData = data().map((item) => ({
    text: item,
    value: Math.random() * 1000
  }));

  return (
    <EmotionReportTag>
      <div style={{ width: '700px', height: '400px' }}>
        <WordCloud
          width={700}
          height={400}
          data={newData}
          fontSize={fontSize}
          rotate={rotate}
          padding={2}
          font={'Jua'}
        />
      </div>
    </EmotionReportTag>
  )
}
