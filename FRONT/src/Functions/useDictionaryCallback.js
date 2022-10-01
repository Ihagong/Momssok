import { useRecoilState } from 'recoil'
import { logInTokenState, animalDictionaryState } from '../store/atoms'
import { useNavigate } from  'react-router-dom'
import axios from 'axios'


export function useDictionaryCallback() {
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
  const [animalDictionary, setAnimalDictionary] = useRecoilState(animalDictionaryState)
  const navigate = useNavigate()

  const getAllDictionaryCallback = async (name) => {
    axios({
      method: 'get',
      url: '/api/animal/lookupAlldictionary',
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
        console.log(response.data.animals)
        console.log('도감이 조회되었습니다.')
        setAnimalDictionary(response.data.animals)
        navigate(`/dictionary`)
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const inputPartImageCallback = async (name, partId, image) => {
    axios({
      method: 'put',
      url: '/api/animal/inputPartImage',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      body: {
        name,
        animal_part_id: partId,
        image,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('도감에 그림이 저장되었습니다.')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  return { getAllDictionaryCallback }
}