import { useRecoilState } from 'recoil'
import { logInTokenState} from '../store/atoms'
import axios from 'axios'


export function useReportCallback() {
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)

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
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }
  
  return { getDailyEmotionCallback }
}