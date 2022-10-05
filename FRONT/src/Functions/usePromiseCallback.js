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
        const promiseItems = response.data.promiseItems.map(( promiseItem ) => {
          // return { todoList: promiseItem.todoList.map((todo) => ({ todo: todo.todo }))}
          return { todoList: promiseItem.todoList.map((todoList) => {
            return {todo: todoList.todo}
          }) }
        })
        // console.log(promiseItems, response.data.promiseItems)
        // setPromiseItems(promiseItems)
      }
    })
    .catch(error => {
      console.log(error.response.data)
      setPromiseItems([])
    })
  }

  const savePromiseCallback = async (name, params) => {
    console.log(`name=${name}` + params)
    axios({
      method: 'post',
      url: '/api/promise/savePromise2?' + `name=${name}` + params, //'&inputs=1%261%26레이아웃 잡기1%26선물1',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('약속이 저장되었습니다.')
        getAllPromiseCallback(name)
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  const updatePromiseCallback = async (name, params) => {
    console.log(`name=${name}` + params)
    axios({
      method: 'put',
      url: '/api/promise/updatePromise?' + `name=${name}` + params, //'&inputs=1%261%26레이아웃 잡기1%26선물1',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': logInToken,
      },
    })
    .then(response => {
      if (response.data) {
        console.log(response.data)
        console.log('약속이 업데이트 되었습니다.')
        getAllPromiseCallback(name)
      }
    })
    .catch(error => {
      console.log(error.response.data)
      // getAllPromiseCallback(name)
    })
  }

  const doneTodoCallback = async (name, promiseItemId, todoItemId) => {
    console.log('index', `${promiseItemId}-${todoItemId}`)
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
        console.log('약속이 완료되었습니다.')
        getAllPromiseCallback(name)
      }
    })
    .catch(error => {
      console.log(error.response.data)
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
        getAllPromiseCallback(name)
      }
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }
  
  return { getAllPromiseCallback, savePromiseCallback, updatePromiseCallback, doneTodoCallback, donePromiseCallback }
}