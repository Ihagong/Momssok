import React, { useEffect, useState } from 'react'
import { PromiseModalComponentTag, ModalBackgroundTag } from '../Style/Components'
import { ChildButtonTag2 } from '../Style/Components'
import { PromiseTodoItemComponent } from './PromiseTodoItemComponent'
import { useRecoilState } from 'recoil'
import { profileState, promiseItemsState, parentActiveState } from '../store/atoms'
import { usePromiseCallback } from '../Functions/usePromiseCallback'


export function PromiseModalComponent({ promiseItemId, promiseItem, setModalOpen }) {
  const [profileInfo, setProfileInfo] = useRecoilState(profileState)
  const [promiseItems, setPromiseItems] = useRecoilState(promiseItemsState)
  const [parentActive, setParentActive] = useRecoilState(parentActiveState)
  const { savePromiseCallback, donePromiseCallback } = usePromiseCallback()
  const [newTodo, setNewTodo] = useState('');
  const [promiseGift, setPromiseGift] = useState('선물');

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false)
    }
  }
  
  const handleClickAddTodoButton = () => {
    console.log(promiseItems)
    let params = ''
    promiseItems?.forEach((promiseItem) => {
      promiseItem.todoList?.forEach((todoItem) => {
        params += `&inputs=${promiseItem.id}%26${promiseItem.todoList.length+1}%26${todoItem.todo}%26${promiseItem.gift}`
      })
    })
    params += `&inputs=${promiseItemId}%26${promiseItem?.todoList.length ? promiseItem?.todoList.length+1 : 1}%26${newTodo}%26${promiseGift}`
    console.log(params)
    savePromiseCallback(profileInfo.name, params)
  }

  const handleClickDonePromiseButton = () => {
    donePromiseCallback(profileInfo.name, promiseItemId)
  }
  
  return (
    <ModalBackgroundTag style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onCloseModal}>
      <PromiseModalComponentTag>
        {promiseItems[promiseItemId-1]?.todoList ?
          (promiseItems[promiseItemId-1]?.todoList.map((todoItem, index) => (
            <PromiseTodoItemComponent key={index} todoItem={todoItem} name={profileInfo.name}>
            </PromiseTodoItemComponent>
          )))
        :
          <>약속이 없습니다.</> }
        {/* { profileInfo.is_parent ? */}
          <div style={{ display: 'flex' }}>
            
            { (parentActive && (!promiseItems[promiseItemId-1] || promiseItems[promiseItemId-1]?.todoList.length < 3)) ?
              <>
                <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                <button onClick={handleClickAddTodoButton}>추가</button>
              </> : null }
            { parentActive ? <button onClick={handleClickDonePromiseButton}>완료</button> : null }
          </div>
          {/* : null } */}

        <ChildButtonTag2 onClick={() => setModalOpen(false)}>닫기</ChildButtonTag2>
      </PromiseModalComponentTag>
    </ModalBackgroundTag>
  )
}