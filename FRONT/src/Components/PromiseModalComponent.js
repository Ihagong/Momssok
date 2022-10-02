import React, { useEffect, useState } from 'react'
import { PromiseModalComponentTag, ModalBackgroundTag } from '../Style/Components'
import { ChildButtonTag2 } from '../Style/Components'
import { PromiseTodoItemComponent } from './PromiseTodoItemComponent'
import { useRecoilState } from 'recoil'
import { profileState } from '../store/atoms'
import { usePromiseCallback } from '../Functions/usePromiseCallback'


export function PromiseModalComponent({ promiseItem, setModalOpen }) {
  const [profile, setProfile] = useRecoilState(profileState)
  const { donePromiseCallback } = usePromiseCallback()
  const [newTodo, setNewTodo] = useState('');

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false)
    }
  }

  const handleClickAddTodoButton = () => {
  }

  const handleClickDonePromiseButton = () => {
    donePromiseCallback(profile.name, promiseItem.id)
  }
  
  return (
    <ModalBackgroundTag style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onCloseModal}>
      <PromiseModalComponentTag>
        {promiseItem?.todoList ?
          (promiseItem.todoList.map((todoItem) => (
            <PromiseTodoItemComponent key={todoItem.id} todoItem={todoItem} promiseItemId={promiseItem.id} name={profile.name}>
            </PromiseTodoItemComponent>
          )))
        :
          <>약속이 없습니다.</> }
        {/* { profile.is_parent ? */}
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