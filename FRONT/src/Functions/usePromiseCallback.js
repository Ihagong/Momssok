import { useRecoilState } from 'recoil'
import { logInTokenState, promiseItemsState } from '../store/atoms'
import axios from 'axios'


export function usePromiseCallback() {
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
  const [promiseItems, setPromiseItems] = useRecoilState(promiseItemsState)

  const getAllPromiseCallback = async (name) => {
    axios({
      method: 'get',
      url: '/api/promise/lookupAllPromise',
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
        console.log('약속이 조회되었습니다.')
        setPromiseItems(response.data.promiseItems)
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const savePromiseCallback = async (name, promiseItems) => {
    axios({
      method: 'post',
      url: '/api/promise/savePromise',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      body: {
        name,
        promiseItems,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('약속이 조회되었습니다.')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const doneTodoCallback = async (name, promiseItemId, todoItemId) => {
    axios({
      method: 'put',
      url: '/api/promise/donePromise',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      params: {
        name,
        index: `${promiseItemId}-${todoItemId}`,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)

        const newItems = [...promiseItems]
        newItems[promiseItemId-1] = {
          ...newItems[promiseItemId-1],
          todoList: newItems[promiseItemId-1]['todoList'].map((todoItem) =>
            todoItem.id === todoItemId
            ? {...todoItem, done: !todoItem.done}
            : todoItem
          )
        }
        setPromiseItems(newItems)

        console.log('약속이 완료되었습니다.')
      }
    })
    .catch(error => {
      console.log(error.response.data)

      const newItems = [...promiseItems]
      newItems[promiseItemId-1] = {
        ...newItems[promiseItemId-1],
        todoList: newItems[promiseItemId-1]['todoList'].map((todoItem) =>
          todoItem.id === todoItemId
          ? {...todoItem, done: !todoItem.done}
          : todoItem
        )
      }
      setPromiseItems(newItems)
    })
  }

  const donePromiseCallback = async (name, promiseItemId) => {
    axios({
      method: 'put',
      url: '/api/promise/donePromise',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
      params: {
        name,
        index: promiseItemId,
      }
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('약속이 완료되었습니다.')
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }
  
  return { getAllPromiseCallback, doneTodoCallback, donePromiseCallback }
}