import { useRecoilState } from 'recoil'
import { logInTokenState, dailyEmotionListState, weeklyEmotionListState, dailyEmotionObjectState, weeklyEmotionObjectState, monthlyEmotionObjectState, wordCloudTagListState, calendarEmotionObjectState } from '../store/atoms'
import axios from 'axios'


export function useReportCallback() {
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
  const [dailyEmotionList, setDailyEmotionList] = useRecoilState(dailyEmotionListState)
  const [dailyEmotionObject, setDailyEmotionObject] = useRecoilState(dailyEmotionObjectState)
  const [weeklyEmotionList, setWeeklyEmotionList] = useRecoilState(weeklyEmotionListState)
  const [weeklyEmotionObject, setWeeklyEmotionObject] = useRecoilState(weeklyEmotionObjectState)
  const [monthlyEmotionObject, setMonthlyEmotionObject] = useRecoilState(monthlyEmotionObjectState)
  const [wordCloudTagList, setWordCloudTagList] = useRecoilState(wordCloudTagListState)
  const [calendarEmotionObject, setCalendarEmotionObject] = useRecoilState(calendarEmotionObjectState)

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
        if (response.data.status === 'FAIL') {
          setDailyEmotionObject(null)
        } else {
          const emotionList = response.data?.today.emotion_all.split(', ').map((emotion) => {
            const temp = emotion.split(':')
            return parseFloat(temp[1])
          })
          const emotionObj = {
            emotion: response.data.today.emotion,
            today : {
              '슬픔': emotionList[0],
              '분노': emotionList[1],
              '행복': emotionList[2],
              '불안': emotionList[3],
              '놀람': emotionList[4],
            },
            average : {
              '슬픔': response.data.avg['슬픔'],
              '분노': response.data.avg['분노'],
              '행복': response.data.avg['행복'],
              '불안': response.data.avg['불안'],
              '놀람': response.data.avg['놀람'],
            }
          }
          setDailyEmotionObject(emotionObj)
        }
      }
    })
    .catch(error => {
      console.log(error)
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
        const emotionObj = {
          thisWeek : {
            '슬픔': response.data.this_week['슬픔'] ? response.data.this_week['슬픔'] : 0,
            '분노': response.data.this_week['분노'] ? response.data.this_week['분노'] : 0,
            '행복': response.data.this_week['행복'] ? response.data.this_week['행복'] : 0,
            '불안': response.data.this_week['불안'] ? response.data.this_week['불안'] : 0,
            '놀람': response.data.this_week['놀람'] ? response.data.this_week['놀람'] : 0,
          },
          average : {
            '슬픔': response.data.avg['슬픔'] ? response.data.avg['슬픔']/7 : 0,
            '분노': response.data.avg['분노'] ? response.data.avg['분노']/7 : 0,
            '행복': response.data.avg['행복'] ? response.data.avg['행복']/7 : 0,
            '불안': response.data.avg['불안'] ? response.data.avg['불안']/7 : 0,
            '놀람': response.data.avg['놀람'] ? response.data.avg['놀람']/7 : 0,
          }
        }
        setWeeklyEmotionObject(emotionObj)
      }
    })
    .catch(error => {
      console.log(error)
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
        const emotionObj = {
          emotion: response.data.main_emotion,
          emotionDiff: response.data.main_emotion_diff,
          mainPercent: response.data.main_percent,
          thisMonth : {
            '슬픔': response.data.this_month['슬픔'] ? response.data.this_month['슬픔'] : 0,
            '분노': response.data.this_month['분노'] ? response.data.this_month['분노'] : 0,
            '행복': response.data.this_month['행복'] ? response.data.this_month['행복'] : 0,
            '불안': response.data.this_month['불안'] ? response.data.this_month['불안'] : 0,
            '놀람': response.data.this_month['놀람'] ? response.data.this_month['놀람'] : 0,
          },
          lastMonth : {
            '슬픔': response.data.last_month['슬픔'] ? response.data.last_month['슬픔'] : 0,
            '분노': response.data.last_month['분노'] ? response.data.last_month['분노'] : 0,
            '행복': response.data.last_month['행복'] ? response.data.last_month['행복'] : 0,
            '불안': response.data.last_month['불안'] ? response.data.last_month['불안'] : 0,
            '놀람': response.data.last_month['놀람'] ? response.data.last_month['놀람'] : 0,
          }
        }
        setMonthlyEmotionObject(emotionObj)
        const emotionList = [response.data.data.emotion, ...response.data.data.emotion_all.split(', ').map((emotion) => {
          const temp = emotion.split(':')
          return [temp[0].toLowerCase(), parseFloat(temp[1])]
        })]
        setWeeklyEmotionList(emotionList)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  const getWordCloudCallback = async (name) => {
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
        setWordCloudTagList(response.data.data.split(' '))
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  const getMonthlyEmotionListCallback = async (date, name) => {
    axios({
      method: 'post',
      url: '/api/parents/monthlyEmotionList2',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      data: {
        date,
        name,
      }
    })
    .then(response => {
      if (response.data) {
        let obj = {}
        response.data.emotions.forEach(({date, emotion}) => {
          const temp = date.split(' ')[0].split('-')[2]
          obj[Number(temp)] = emotion
        })
        setCalendarEmotionObject(obj)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  return { getDailyEmotionCallback, getWeeklyEmotionCallback, getMonthlyEmotionCallback, getWordCloudCallback, getMonthlyEmotionListCallback }
}