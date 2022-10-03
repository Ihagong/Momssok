import React, { useEffect, useState } from 'react'
import { PromiseModalComponentTag, ModalBackgroundTag } from '../Style/Components'
import { ChildButtonTag2 } from '../Style/Components'
import { PromiseTodoItemComponent } from './PromiseTodoItemComponent'
import { useRecoilState } from 'recoil'
import { profileState, promiseItemsState } from '../store/atoms'
import { usePromiseCallback } from '../Functions/usePromiseCallback'


export function PromiseModalComponent({ promiseItemId, promiseItem, setModalOpen }) {
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [promiseItems, setPromiseItems] = useRecoilState(promiseItemsState)
  const { savePromiseCallback, donePromiseCallback } = usePromiseCallback()
  const [newTodo, setNewTodo] = useState('');

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false)
    }
  }
  console.log(promiseItems)
  
  const handleClickAddTodoButton = () => {
    console.log('here!', promiseItem)
    console.log(promiseItems, promiseItems.length, promiseItemId)
    if (!newTodo) {
      console.log('할일을 입력해주세요.')
    } else if (promiseItems.length == promiseItemId) {
      const newItems = [...promiseItems, { todoList: [{ todo: newTodo }]}]
      setPromiseItems(newItems)
      // savePromiseCallback(profileInfo.name, newItems)
    } else {
      let newItems = [...promiseItems]
      newItems = newItems.map((newItem, index) => {
        if (index === promiseItemId) {
          return [{ todoList : [...newItem.todoList, { todo: newTodo }]} ]
        } else {
          return [newItem]
        }
      })
      setPromiseItems(newItems)
      // savePromiseCallback(profileInfo.name, newItems)
    }
  }

  const handleClickDonePromiseButton = () => {
    donePromiseCallback(profileInfo.name, promiseItem.id)
  }
  
  return (
    <ModalBackgroundTag style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onCloseModal}>
      <PromiseModalComponentTag>
        {promiseItem.todoList ?
          (promiseItem.todoList.map((todoItem, index) => (
            <PromiseTodoItemComponent key={index} todoItem={todoItem} name={profileInfo.name}>
            </PromiseTodoItemComponent>
          )))
        :
          <>약속이 없습니다.</> }
        {/* { profileInfo.is_parent ? */}
          <div style={{ display: 'flex' }}>
            <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
            <button onClick={handleClickAddTodoButton}>추가</button>
            <button onClick={handleClickDonePromiseButton}>완료</button>
          </div>
          {/* : null } */}

        <ChildButtonTag2 onClick={() => setModalOpen(false)}>닫기</ChildButtonTag2>
      </PromiseModalComponentTag>
    </ModalBackgroundTag>
  )
}