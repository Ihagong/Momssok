import { useRecoilState } from 'recoil'
import { signUpTokenState, logInTokenState, userInfoState, profileInfoState } from '../store/atoms'
import { useNavigate } from  'react-router-dom'
import axios from 'axios'


export function useAuthCallback() {
  const [signUpToken, setSignUpToken] = useRecoilState(signUpTokenState)
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState)
  const navigate = useNavigate()

  const authCheckCallback = async (email, authNumber) => {
    axios({
      method: 'post',
      url: 'http://j7d203.p.ssafy.io:8080/user/emailCertification',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        code: authNumber,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('인증되었습니다.')
        setSignUpToken(response.data.token)
      }
    })
    .catch(error => {
      console.log(error.response.data)
      setSignUpToken('')
    })
  }

  const authEmailCallback = async (email) => {
    axios({
      method: 'post',
      url: 'http://j7d203.p.ssafy.io:8080/user/emailInput',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        email,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('인증 메일을 보냈습니다.')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }
  
  const signUpCallback = async (email, password, username) => {
    axios({
      method: 'post',
      url: 'http://j7d203.p.ssafy.io:8080/user/signUp',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': signUpToken
      },
      data: {
        email,
        password,
        username,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('회원가입에 성공했습니다.')
        navigate('/login')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const userInfoCallback = async (token) => {
    axios({
      method: 'get',
      url: 'http://j7d203.p.ssafy.io:8080/user/detailUser',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? token : logInToken,
      },
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        setUserInfo(response.data['user'])
        console.log('회원 정보가 조회되었습니다.')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const editAccountCallback = async (username, password) => {
    axios({
      method: 'put',
      url: 'http://j7d203.p.ssafy.io:8080/user/updateUser',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      data: {
        username,
        password,
      }
    })
    .then (response => {
      if (response.data) {
        console.log(response.data)
        console.log('회원 정보가 수정되었습니다.')
        userInfoCallback(logInToken)
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const logInCallback = async (email, password) => {
    axios({
      method: 'post',
      url: 'http://j7d203.p.ssafy.io:8080/user/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
      }
    })
    .then (response => {
      if (response.data) {
        console.log(response.data)
        console.log('로그인되었습니다.')
        setLogInToken(response.data.token)
        userInfoCallback(response.data.token)
        profileInfoCallback(response.data.token)
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const logOutCallback = async () => {
    // axios({
    //   method: 'post',
    //   url: 'http://j7d203.p.ssafy.io:8080/user/logout',
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

  const deleteUserCallback = async (logInToken) => {
    axios({
      method: 'delete',
      url: 'http://j7d203.p.ssafy.io:8080/user/deleteUser',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        setLogInToken('')
        setUserInfo(null)
        console.log('회원 탈퇴 되었습니다.')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const profileInfoCallback = async (token) => {
    axios({
      method: 'get',
      url: 'http://j7d203.p.ssafy.io:8080/user/lookupAllprofile',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? token : logInToken,
      },
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('프로필이 조회되었습니다.')
        setProfileInfo(response.data['profiles'])
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const createProfileCallback = async (name, birthday, profilePassword) => {
    console.log(name, birthday, profilePassword)
    axios({
      method: 'post',
      url: 'http://j7d203.p.ssafy.io:8080/user/saveProfile',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      data: {
        profileImage: null,
        name,
        birthday,
        profile_password: profilePassword,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('프로필이 조회되었습니다.')
        setProfileInfo(response.data['profiles'])
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  return { authCheckCallback, authEmailCallback, signUpCallback, userInfoCallback,
    editAccountCallback, logInCallback, logOutCallback, deleteUserCallback, profileInfoCallback,
    createProfileCallback }
}