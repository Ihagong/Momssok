import { useRecoilState } from 'recoil'
import { signUpTokenState, logInTokenState, userInfoState, profileInfoState } from '../store/atoms'
import { useNavigate } from  'react-router-dom'
import axios from 'axios'
import ManageProfilePage from '../Pages/ManageProfilePage'


export function useAuthCallback() {
  const [signUpToken, setSignUpToken] = useRecoilState(signUpTokenState)
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState)
  const navigate = useNavigate()

  const authCheckCallback = async (email, authNumber) => {
    axios({
      method: 'post',
      url: '/api/user/emailCertification',
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
      url: '/api/user/emailInput',
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
      url: '/api/user/signUp',
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
      url: '/api/user/detailUser',
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
      url: '/api/user/updateUser',
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
      url: '/api/user/login',
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

  const deleteUserCallback = async (logInToken) => {
    axios({
      method: 'delete',
      url: '/api/user/deleteUser',
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
      url: '/api/user/lookupAllprofile',
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

  const createProfileCallback = async (name, birthday, selectedImageIndex, profilePassword) => {
    axios({
      method: 'post',
      url: '/api/user/saveProfile',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      data: {
        image_num: selectedImageIndex,
        name,
        birthday,
        profile_password: profilePassword,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('프로필이 생성되었습니다.')
        profileInfoCallback()
        navigate('/profile')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const updateProfileCallback = async (beforeName, name, birthday, selectedImageIndex, profilePassword) => {
    axios({
      method: 'put',
      url: '/api/user/updateProfile',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      data: {
        beforeName,
        name,
        birthday,
        image_num: selectedImageIndex,
        profile_password: profilePassword,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('프로필이 수정되었습니다.')
        profileInfoCallback()
        navigate('/profile/manage')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const deleteProfileCallback = async (name) => {
    console.log(name)
    axios({
      method: 'delete',
      url: '/api/user/deleteProfile',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': logInToken,
      },
      data: {
        "name": name,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('프로필이 삭제되었습니다.')
        profileInfoCallback()
        navigate('/profile/manage')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const findPasswordCallback = async (email) => {
    axios({
      method: 'get',
      url: '/api/user/findPassword',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        email,
      }
    })
    .then (response => {
      if (response.data) {
        console.log(response.data)
        console.log('임시 비밀번호가 전송되었습니다.')
        navigate('/login')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  return { authCheckCallback, authEmailCallback, signUpCallback, userInfoCallback,
    editAccountCallback, logInCallback, logOutCallback, deleteUserCallback, profileInfoCallback,
    createProfileCallback, updateProfileCallback, deleteProfileCallback, findPasswordCallback }
}