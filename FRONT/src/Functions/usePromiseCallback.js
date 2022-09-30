import { useRecoilState } from 'recoil'
import { logInTokenState } from '../store/atoms'
import axios from 'axios'


export function usePromiseCallback() {
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)

  const getAllPromiseCallback = async (name) => {
    axios({
      method: 'get',
      url: '/api/promise/lookupAllPromise',
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
        console.log('약속이 조회되었습니다.')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  return { getAllPromiseCallback, }
}