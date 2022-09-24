import { useRecoilState } from 'recoil'
import { logInTokenState, userInfoState } from '../store/atoms'
import axios from 'axios'


export function useAuthCallback() {
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  const logoutCallback = async () => {
    // axios({
    //   method: 'post',
    //   url: '/api/user/logout',
    // })
    // .then(response => {
    //   if (response.data) {
    //     console.log(response.data)
    //     setLogInToken('')
    //     setUserInfo(null)
    //     console.log('로그아웃 되었습니다.')
    //   }
    // })
    // .catch(error => {
    //   console.log(error.response.data)
    // })
    
    setLogInToken('')
    setUserInfo(null)
    console.log('로그아웃 되었습니다.')
  }

  return { logoutCallback }
}