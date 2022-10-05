import { useRecoilState } from 'recoil'
import { logInTokenState, dailyEmotionListState, weeklyEmotionListState } from '../store/atoms'
import axios from 'axios'


export function useReportCallback() {
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
  const [dailyEmotionList, setDailyEmotionList] = useRecoilState(dailyEmotionListState)
  const [weeklyEmotionList, setWeeklyEmotionList] = useRecoilState(weeklyEmotionListState)
  
  const getDailyEmotionCallback = async (name, date) => {
    axios({
      method: 'post',
      url: '/api/parents/daily',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      data: {
        name,
        date,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('일별 감정이 조회되었습니다.')
        const emotionList = [response.data.data.emotion, ...response.data.data.emotion_all.split(', ').map((emotion) => {
          const temp = emotion.split(':')
          return [temp[0].toLowerCase(), parseFloat(temp[1])]
        })]
        console.log(emotionList)
        setDailyEmotionList(emotionList)
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const getWeeklyEmotionCallback = async (name, date) => {
    axios({
      method: 'post',
      url: '/api/parents/weekly',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      data: {
        name,
        date,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('주별 감정이 조회되었습니다.')
        const emotionList = [response.data.data.emotion, ...response.data.data.emotion_all.split(', ').map((emotion) => {
          const temp = emotion.split(':')
          return [temp[0].toLowerCase(), parseFloat(temp[1])]
        })]
        console.log(emotionList)
        setWeeklyEmotionList(emotionList)
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const getMonthlyEmotionCallback = async (name, date) => {
    axios({
      method: 'post',
      url: '/api/parents/monthly',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      data: {
        name,
        date,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('월별 감정이 조회되었습니다.')
        const emotionList = [response.data.data.emotion, ...response.data.data.emotion_all.split(', ').map((emotion) => {
          const temp = emotion.split(':')
          return [temp[0].toLowerCase(), parseFloat(temp[1])]
        })]
        console.log(emotionList)
        setWeeklyEmotionList(emotionList)
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const getWordCloudCallback = async (name) => {
    console.log(name)
    axios({
      method: 'get',
      url: '/api/parents/word',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      params: {
        name,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('태그가 조회되었습니다.')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }
  
  return { getDailyEmotionCallback, getWordCloudCallback, getWeeklyEmotionCallback }
}