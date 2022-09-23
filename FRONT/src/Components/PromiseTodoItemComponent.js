import React from 'react'
import { PromiseModalComponentTag } from '../Style/Components'
import { PromiseTodoItemTag, PromiseTodoItemDoneTag } from '../Style/Components'
import { useRecoilState } from 'recoil'
import { totalTodoListState } from '../store/atoms'


export function PromiseTodoItemComponent({ todoItem, promiseId }) {
  const [totalTodoList, setTotalTodoList] = useRecoilState(totalTodoListState)

  const handleClickTodoItem = () => {
    const newList = { ...totalTodoList }
    newList[promiseId] = totalTodoList[promiseId].map((listItem) => 
        listItem.id === todoItem.id
        ? { ...listItem, done: !listItem.done }
        : listItem
      )
    setTotalTodoList(newList)
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