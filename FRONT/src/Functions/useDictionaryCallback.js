import { useRecoilState } from 'recoil'
import { logInTokenState, animalDictionaryState } from '../store/atoms'
import axios from 'axios'


export function useDictionaryCallback() {
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
  const [animalDictionary, setAnimalDictionary] = useRecoilState(animalDictionaryState)

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
        console.log(response.data['animals'])
        console.log('도감이 조회되었습니다.')
        setAnimalDictionary(response.data.animals)
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  return { getAllDictionaryCallback }
}