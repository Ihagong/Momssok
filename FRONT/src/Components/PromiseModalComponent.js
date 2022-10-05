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
  const { savePromiseCallback, donePromiseCallback, updatePromiseCallback } = usePromiseCallback()
  const [newTodo, setNewTodo] = useState('');
  const [promiseGift, setPromiseGift] = useState(promiseItems[promiseItemId-1]?.gift ? promiseItems[promiseItemId-1]?.gift : '');

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false)
    }
  }
  
  const handleClickAddTodoButton = () => {
    console.log(promiseItems, promiseGift)
    let params = ''
    if (promiseItems.length) {
      params = `&index=${promiseItemId}-${promiseItem?.todoList.length ? promiseItem?.todoList.length+1 : 1}&newTodo=${newTodo}&gift=${promiseGift}`
      updatePromiseCallback(profileInfo.name, params)
    } else {
      params = `&inputs=1%261%26${newTodo}${promiseGift ? '%26'+promiseGift : '%26선물'}`
      savePromiseCallback(profileInfo.name, params)
    }
  }

  const handleClickAddGiftButton = () => {
    if (promiseItem?.todoList.length) {
      const params = `&index=${promiseItemId}-${promiseItem?.todoList.length}&newTodo=${promiseItem.todoList[0]?.todo}&gift=${promiseGift}`
      updatePromiseCallback(profileInfo.name, params)
    } else if (newTodo) {
      const params = `&index=${promiseItemId}-${1}&newTodo=${newTodo}` + (promiseGift ? `&gift=${promiseGift}` : '')
      updatePromiseCallback(profileInfo.name, params)
    } else {
      console.log('약속을 먼저 입력해주세요.')
    }
  }
  
  const handleClickDonePromiseButton = () => {
    donePromiseCallback(profileInfo.name, promiseItemId)
  }
  
  return (
    <ModalBackgroundTag style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onCloseModal}>
      <PromiseModalComponentTag>
        <>선물: {promiseGift ? promiseGift : '없음'}</>
        <br/>
        {promiseItems[promiseItemId-1]?.todoList ?
          (promiseItems[promiseItemId-1]?.todoList.map((todoItem, index) => (
            <PromiseTodoItemComponent key={index} name={profileInfo.name} promiseItemId={promiseItemId} todoItem={todoItem}>
            </PromiseTodoItemComponent>
          )))
        :
          <>약속이 없습니다.</> }
        {/* { profileInfo.is_parent ? */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {(parentActive && (!promiseItems[promiseItemId-1] || promiseItems[promiseItemId-1]?.todoList.length < 3)) ?
              <div style={{ display: 'flex' }}>
                <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                <button onClick={handleClickAddTodoButton}>약속 추가</button>
              </div> : null }
            
            {parentActive ?
              
              <div style={{ display: 'flex' }}>
                <input value={promiseGift} onChange={(e) => setPromiseGift(e.target.value)} />
                <button onClick={handleClickAddGiftButton}>선물 추가 및 삭제</button>
              </div> : null }
            { parentActive ? <button onClick={handleClickDonePromiseButton}>완료</button> : null }
          </div>
          {/* : null } */}

        <ChildButtonTag2 onClick={() => setModalOpen(false)}>닫기</ChildButtonTag2>
      </PromiseModalComponentTag>
    </ModalBackgroundTag>
  )
}