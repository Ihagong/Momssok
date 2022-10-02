import { useRecoilState } from 'recoil'
import { signUpTokenState, logInTokenState, userInfoState, profileListState, loadedPaintingListState } from '../store/atoms'
import { useNavigate } from  'react-router-dom'
import axios from 'axios'
import ManageProfilePage from '../Pages/ManageProfilePage'


export function usePaintingCallback() {
  const [signUpToken, setSignUpToken] = useRecoilState(signUpTokenState)
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [profileList, setProfileList] = useRecoilState(profileListState)
  const [loadedPaintingList, setLoadedPaintingList] = useRecoilState(loadedPaintingListState)
  
  const navigate = useNavigate()

  const savePaintingCallback = async (imageURL, name) => {
    axios({
      method: 'post',
      url: '/api/user/saveDrawing',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      data: {
        drawing_base64: imageURL,
        name,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log(imageURL)
        console.log('그림이 저장되었습니다.')
        navigate(-1)
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const updatePaintingCallback = async (id, name, imageURL) => {
    axios({
      method: 'post',
      url: '/api/user/saveDrawing',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      data: {
        drawing_id: id,
        name,
        drawing_base64: imageURL,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('그림이 수정되었습니다.')
        navigate(-1)
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const getAllPaintingCallback = async (name) => {
    axios({
      method: 'get',
      url: '/api/user/searchDrawing',
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
        console.log('그림이 조회되었습니다.')
        setLoadedPaintingList(response.data.data)
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  return { savePaintingCallback, updatePaintingCallback, getAllPaintingCallback }
}