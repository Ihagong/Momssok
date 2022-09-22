import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'


const { persistAtom } = recoilPersist()

export const diaryContentState = atom({
  key: 'diaryContentState',
  default: '',
  effects_UNSTABLE: [persistAtom]
})

export const loadedPaintingState = atom({
  key: 'loadedPaintingState',
  default: '',
  effects_UNSTABLE: [persistAtom]
})

export const modalOpenState = atom({
  key: 'modalOpenState',
  default: false,
  effects_UNSTABLE: [persistAtom]
})

export const todoListState = atom({
  key: 'todoListState',
  default: [{ id: 1, todo: 'todoList 레이아웃 잡기', done: false },
    { id: 2, todo: 'todoList 기능 구현하기', done: false },
    { id: 3, todo: 'todoListx css 스타일링 하기', done: false }],
  effects_UNSTABLE: [persistAtom]
})