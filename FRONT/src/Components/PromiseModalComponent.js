import React, { useState } from 'react'
import { PromiseModalComponentTag } from '../Style/Components'
import { ChildButtonTag2 } from '../Style/Components'
import { PromiseTodoItemComponent } from './PromiseTodoItemComponent'
import { useRecoilState } from 'recoil'
import { todoListState, modalOpenState } from '../store/atoms'


export function PromiseModalComponent() {
  const [todoList, setTodoList] = useRecoilState(todoListState)
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState)

  const handleClickCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <PromiseModalComponentTag>
      {todoList.map((todoItem) => (
        <PromiseTodoItemComponent key={todoItem.id} todoItem={todoItem}>
        </PromiseTodoItemComponent>
      ))}
      <ChildButtonTag2 onClick={handleClickCloseModal}>닫기</ChildButtonTag2>
    </PromiseModalComponentTag>
  )
}