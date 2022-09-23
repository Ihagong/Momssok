import React, { useState } from 'react'
import { PromiseModalComponentTag } from '../Style/Components'
import { ChildButtonTag2 } from '../Style/Components'
import { PromiseTodoItemComponent } from './PromiseTodoItemComponent'
import { useRecoilState } from 'recoil'
import { totalTodoListState, modalOpenState } from '../store/atoms'


export function PromiseModalComponent({ promiseId }) {
  const [totalTodoList, setTotalTodoList] = useRecoilState(totalTodoListState)
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState)
  const [isParent, setIsParent] = useState(true)
  const [newTodo, setNewTodo] = useState('')

  const handleClickCloseModal = () => {
    setModalOpen(false)
  }

  const handleClickAddTodoButton = () => {
    let newList = { ...totalTodoList }
    newList[promiseId] = [...totalTodoList[promiseId], { id: newList[promiseId].length+1, todo: newTodo, done: false }]
    console.log(newList)
    setTotalTodoList(newList)
  }

  return (
    <PromiseModalComponentTag>
      {totalTodoList[promiseId] ?
        (totalTodoList[promiseId].map((todoItem) => (
          <PromiseTodoItemComponent key={todoItem.id} todoItem={todoItem} promiseId={promiseId}>
          </PromiseTodoItemComponent>
        )))
      :
        null }
      { isParent ?
        <div style={{ display: 'flex' }}>
          <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
          <button onClick={handleClickAddTodoButton}>추가</button>
        </div>
        : null }

      <ChildButtonTag2 onClick={handleClickCloseModal}>닫기</ChildButtonTag2>
    </PromiseModalComponentTag>
  )
}