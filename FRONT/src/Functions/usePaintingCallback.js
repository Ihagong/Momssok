import { useRecoilState } from 'recoil'
import { diaryEditState, logInTokenState, loadedPaintingInfoState, loadedPaintingListState } from '../store/atoms'
import { useNavigate } from  'react-router-dom'
import axios from 'axios'


export function usePaintingCallback() {
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
  const [loadedPaintingList, setLoadedPaintingList] = useRecoilState(loadedPaintingListState)
  const [loadedPaintingItem, setLoadedPaintingItem] = useRecoilState(loadedPaintingInfoState)
  const [diaryIsEdit, setDiaryIsEdit] = useRecoilState(diaryEditState)

  
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
        console.log('그림이 저장되었습니다.')
        if (diaryIsEdit === true) {
          setLoadedPaintingItem(response.data.data)
          navigate('/diary/create')
        } else {
          setDiaryIsEdit(false)
          navigate('/painting/load')
        }
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const updatePaintingCallback = async (id, name, imageURL) => {
    axios({
      method: 'put',
      url: '/api/user/updateDrawing',
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

  const paintingRemoveCallback = async (drawing_id, name) => {
    axios({
        method: 'delete',
        url: '/api/letter/deleteDrawing',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
        },
        params: {
        "drawing_id": drawing_id,
        "name": name
        }
    })
    .then(response => {
        if (response.data) {
        console.log(response.data)
        console.log('해당 그림이 삭제되었습니다.')
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

  return { savePaintingCallback, updatePaintingCallback, paintingRemoveCallback, getAllPaintingCallback }
}