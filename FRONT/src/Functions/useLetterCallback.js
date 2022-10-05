import { useRecoilState } from 'recoil'
import { logInTokenState, letterItemState, totalLetterListState, letterVideoURLState } from '../store/atoms'
import axios from 'axios'

export function useLetterCallback() {
    const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
    const [letterList, setLetterList] = useRecoilState(totalLetterListState)
    const [letterItem, setLetterItem] = useRecoilState(letterItemState)
    const [letterVideoURL, setLetterVideoURL] = useRecoilState(letterVideoURLState)
  
    const letterInfoCallback = async (name) => {
        axios({
            method: 'get',
            url: '/api/letter/lookupAllLetter',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': logInToken,
            },
            params: {
            "name": name,
            }
        })
        .then(response => {
            if (response.data) {
            console.log(response.data)
            setLetterList(response.data['letters'])
            console.log('편지 정보가 조회되었습니다.')
            }
        })
        .catch(error => {
            console.log(error.response.data)
        })
    }

    const letterDetailCallback = async (letter_id) => {
        axios({
            method: 'get',
            url: '/api/letter/lookupLetter',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': logInToken,
            },
            params: {
            "letter_id": letter_id,
            }
        })
        .then(response => {
            if (response.data) {
            console.log(response.data)
            setLetterItem(response.data['letter'])
            console.log('편지 정보가 조회되었습니다.')
            }
        })
        .catch(error => {
            console.log(error.response.data)
        })
    }

    const letterRemoveCallback = async (letter_id) => {
        axios({
            method: 'delete',
            url: '/api/letter/deleteLetter',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': logInToken,
            },
            params: {
            "letter_id": letter_id,
            }
        })
        .then(response => {
            if (response.data) {
            console.log(response.data)
            console.log('해당 편지가 삭제되었습니다.')
            }
        })
        .catch(error => {
            console.log(error.response.data)
        })
    }

    const letterSendCallback = async (videoFile, profileName, receiver, title, content) => {
      console.log(profileName)
      
      // const formData = new FormData()
      // formData.append('videoFile', blob)
      // formData.append('author', blob)
      // formData.append('videoFile', blob)
      // formData.append('videoFile', blob)
      // console.log(formData.get('file'))

      axios({
        method: 'post',
        url: '/api/letter/sendLetter',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': logInToken,
        },
        data: {
          "videoFile": videoFile,
          "author": profileName,
          "receiver": receiver,
          "title": title,
          "content": content,
        }
      })
      .then(response => {
        if (response.data) {
          console.log(response.data)
          console.log('편지가 전송 되었습니다.')
        }
      })
      .catch(error => {
        console.log(error.response.data)
      })
    }
    const getLetterVideoFileCallback = async (letter_id) => {
      axios({
        method: 'get',
        url: '/api/letter/getVideo',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': logInToken,
        },
        responseType: 'blob',
        params: {
          letter_id,
        }
      })
      .then(response => {
        if (response.data) {
          console.log('영상이 조회되었습니다.')
          const blob = new Blob([response.data])
          const videoURL = URL.createObjectURL(blob)
          setLetterVideoURL(videoURL)
        }
      })
      .catch(error => {
        console.log(error.response)
      })
    }

    return { letterInfoCallback, letterDetailCallback, letterSendCallback, letterRemoveCallback, getLetterVideoFileCallback }
  }