import { useRecoilState } from 'recoil'
import { logInTokenState, LetterItemState, totalLetterListState } from '../store/atoms'
import axios from 'axios'

export function useLetterCallback() {
    const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
    const [letterList, setLetterList] = useRecoilState(totalLetterListState)
    const [letterItem, setLetterItem] = useRecoilState(LetterItemState)
  
    const letterInfoCallback = async (name) => {
        axios({
            method: 'get',
            url: '/api/letter',
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
            url: '/api/letter',
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
            url: '/api/letter',
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

    const letterSendCallback = async (author, receiver, title, content) => {
        console.log(author, receiver, title, content)
        axios({
          method: 'post',
          url: '/api/letter/send',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': logInToken,
          },
          data: {
            "videoFile": null,
            "author": author,
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
  
    return { letterInfoCallback, letterDetailCallback, letterSendCallback, letterRemoveCallback }
  }