import React, { useEffect, useState } from 'react'
import { LetterButtonBack, LetterButtonGo, OrangeButton250, DiaryInputTag, DongleBrown, DongleLightBrown, ChildButtonTag2, PromiseModalComponentTag, ModalBackgroundTag } from '../Style/Components'
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
    setModalOpen(false)
  }
  
  return (
    <ModalBackgroundTag style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onCloseModal}>
      <PromiseModalComponentTag style={{ justifyContent: 'start'}}>
        {/* <DongleBrown style={{ fontSize: "54px", fontWeight: "bold" }} >선물</DongleBrown>
        <DongleLightBrown style={{ fontSize: "36px", marginBottom: "10px" }}>{promiseGift ? promiseGift : '선물이 없습니다.'}</ DongleLightBrown>
        {parentActive ?
          <div style={{ display: 'flex' }}>
            <DiaryInputTag style={{ width: "250px", height: "55px"}} value={promiseGift} onChange={(e) => setPromiseGift(e.target.value)} />
            <OrangeButton250 style={{ width: "100px", height: "60px"}} onClick={handleClickAddGiftButton}>추가</OrangeButton250>
          </div> 
        : null 
        } */}
        <DongleBrown style={{ fontSize: "70px", fontWeight: "bold", marginTop: '20px' }} >약속</DongleBrown>
        <div style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {promiseItems[promiseItemId-1]?.todoList ?
            (promiseItems[promiseItemId-1]?.todoList.map((todoItem, index) => (
              <PromiseTodoItemComponent key={index} name={profileInfo.name} promiseItemId={promiseItemId} todoItem={todoItem}>
              </PromiseTodoItemComponent>
            )))
          :
            <DongleLightBrown style={{ fontSize: "42px" }}>약속이 없습니다.</ DongleLightBrown> }
          
        </div>

          {(parentActive && (!promiseItems[promiseItemId-1] || promiseItems[promiseItemId-1]?.todoList.length < 3)) ?
            <div style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
              <DiaryInputTag style={{ width: "250px", height: "55px" }} value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
              <OrangeButton250 style={{ width: "100px", height: "60px"}} onClick={handleClickAddTodoButton}>추가</OrangeButton250>
            </div> 
          : null 
          }
          <div style={{ display: "flex", marginTop: '20px' }}>
            <LetterButtonBack style={{ backgroundColor: 'var(--Beige-Stroke)', marginLeft: '5px', marginRight: '5px', marginTop: '0', marginBottom: '0'}} onClick={() => setModalOpen(false)}>닫기</LetterButtonBack>
            { parentActive ? <LetterButtonGo style={{marginLeft: '5px', marginRight: '5px', marginTop: '0', marginBottom: '0'}} onClick={handleClickDonePromiseButton}>완료</LetterButtonGo> : null }
          </div>

      </PromiseModalComponentTag>
    </ModalBackgroundTag>
  )
}