import React, { useState } from 'react'
import { PromiseModalComponentTag } from '../Style/Components'
import { ChildButtonTag2 } from '../Style/Components'
import { PromiseTodoItemComponent } from './PromiseTodoItemComponent'
import { useRecoilState } from 'recoil'
import { totalTodoListState, modalOpenState } from '../store/atoms'


export function PromiseModalComponent({ promiseId }) {
  const [totalTodoList, setTotalTodoList] = useRecoilState(totalTodoListState)
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState)

  const handleClickCloseModal = () => {
    setModalOpen(false)
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
      <ChildButtonTag2 onClick={handleClickCloseModal}>닫기</ChildButtonTag2>
    </PromiseModalComponentTag>
  )
}