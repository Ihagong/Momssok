import React from 'react'
import { PromiseModalComponentTag } from '../Style/Components'
import { PromiseTodoItemTag, PromiseTodoItemDoneTag } from '../Style/Components'
import { useRecoilState } from 'recoil'
import { todoListState } from '../store/atoms'


export function PromiseTodoItemComponent({ todoItem }) {
  const [todoList, setTodoList] = useRecoilState(todoListState)

  const handleClickTodoItem = () => {
    const newList = todoList.map((listItem) => 
      listItem.id === todoItem.id
      ? { ...listItem, done: !listItem.done }
      : listItem
    )
    setTodoList(newList)
    console.log(todoItem.id, newList)
  }

  return (
    <>
      { todoItem.done ?
        <PromiseTodoItemDoneTag onClick={handleClickTodoItem}>{ todoItem.todo }</PromiseTodoItemDoneTag>
      :
        <PromiseTodoItemTag onClick={handleClickTodoItem}>{ todoItem.todo }</PromiseTodoItemTag>
      }
    </>
  )
}