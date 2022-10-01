import React, { useState } from 'react'
import { PromiseModalComponentTag } from '../Style/Components'
import { PromiseTodoItemTag, PromiseTodoItemDoneTag } from '../Style/Components'
import { usePromiseCallback } from '../Functions/usePromiseCallback'


export function PromiseTodoItemComponent({ todoItem, promiseItemId, name }) {
  const { doneTodoCallback } = usePromiseCallback()
  const [isDone, setIsDone] = useState(todoItem.done)

  // useEffect(() => {
    
  // }, [todoItem])

  const handleClickTodoItem = () => {
    setIsDone(true)
    doneTodoCallback(name, promiseItemId, todoItem.id)
  }

  return (
    <>
      { isDone ?
        <PromiseTodoItemDoneTag onClick={handleClickTodoItem}>{ todoItem.todo }</PromiseTodoItemDoneTag>
      :
        <PromiseTodoItemTag onClick={handleClickTodoItem}>{ todoItem.todo }</PromiseTodoItemTag>
      }
    </>
  )
}