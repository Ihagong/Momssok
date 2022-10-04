import React from 'react'
import { AlertModalComponentTag, ModalBackgroundTag, ButtonTag1 } from '../Style/Components'


export function AlertModalComponent({ setModalOpen, modalContent }) {

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false)
    }
  }
  
  return (
    <ModalBackgroundTag style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onCloseModal}>
      <AlertModalComponentTag>
        <div style={{ margin: '0 0 30px 0' }}>{ modalContent }</div>
        <ButtonTag1 style={{ width: '120px' }} onClick={() => setModalOpen(false)}>확인</ButtonTag1>
      </AlertModalComponentTag>
    </ModalBackgroundTag>
  )
}