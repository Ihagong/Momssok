import { useRecoilState } from 'recoil'
import { totalDiaryListState, logInTokenState } from '../store/atoms'
import { useNavigate } from  'react-router-dom'
import axios from 'axios'


export function useDiaryCallback() {
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
  const [loadedDiaryList, setLoadedDiaryList] = useRecoilState(totalDiaryListState)
  
  const navigate = useNavigate()

  const saveDiaryCallback = async ({name, drawing_id, title, content, weather, date}) => {
    axios({
      method: 'post',
      url: '/api/user/saveDiary',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      data: {
        'name': name,
        'drawing_id': drawing_id,
        'title': title,
        'content': content,
        'weather': weather,
        'date': date
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('일기가 저장되었습니다.')
        navigate('/diary')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const updateDiaryCallback = async ({id, name, drawing_id, date, title, content, weather}) => {
    console.log(id, name, drawing_id, date, title, content, weather)
    axios({
      method: 'put',
      url: '/api/user/updateDiary',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      data: {
        'id': id,
        'name': name,
        'drawing_id': drawing_id,
        'date': date,
        'title': title,
        'content': content,
        'weather': weather
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('일기가 수정되었습니다.')
        navigate('/diary')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const diaryRemoveCallback = async ( {id, name} ) => {
    axios({
        method: 'put',
        url: '/api/user/deleteDiary',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
        },
        data: {
        "id": id,
        "name": name
        }
    })
    .then(response => {
        if (response.data) {
        console.log(response.data)
        console.log('해당 일기가 삭제되었습니다.')
        }
    })
    .catch(error => {
        console.log(error.response.data)
    })
  }

  const getAllDiaryCallback = async (name) => {
    axios({
      method: 'post',
      url: '/api/user/searchDiaryGallery',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      data: {
        'name': name
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('일기가 조회되었습니다.')
        setLoadedDiaryList(response.data.data)
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  return { saveDiaryCallback, updateDiaryCallback, getAllDiaryCallback, diaryRemoveCallback }
}