import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'


const { persistAtom } = recoilPersist()

export const signUpTokenState = atom({
  key: 'signUpTokenState',
  default: '',
  effects_UNSTABLE: [persistAtom]
})

export const logInTokenState = atom({
  key: 'logInTokenState',
  default: '',
  effects_UNSTABLE: [persistAtom]
})

export const userInfoState = atom({
  key: 'userInfoState',
  default: null,
  effects_UNSTABLE: [persistAtom]
})

export const profileListState = atom({
  key: 'profileListState',
  default: [],
  effects_UNSTABLE: [persistAtom]
})

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

export const totalTodoListState = atom({
  key: 'totalTodoListState',
  default: {
    1: [
        { id: 1, todo: 'todoList 레이아웃 잡기', done: false },
        { id: 2, todo: 'todoList 기능 구현하기', done: false },
        { id: 3, todo: 'todoListx css 스타일링 하기', done: false }
      ],
    2: [
        { id: 1, todo: 'todoList 레이아웃 잡기2', done: false },
        { id: 2, todo: 'todoList 기능 구현하기2', done: false },
        { id: 3, todo: 'todoListx css 스타일링 하기2', done: false }
      ],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
  },
  effects_UNSTABLE: [persistAtom]
})

export const totalLetterListState = atom({
  key: 'totalLetterListState',
  default: [],
  effects_UNSTABLE: [persistAtom]
})

export const letterItemState = atom({
  key: 'letterItemState',
  default: {},
  effects_UNSTABLE: [persistAtom]
})

export const profileState = atom({
  key: 'profileState',
  default: {},
  effects_UNSTABLE: [persistAtom]
})

export const dictionaryPaintingState = atom({
  key: 'dictionaryPaintingState',
  default: [],
  effects_UNSTABLE: [persistAtom]
})

export const promiseItemsState = atom({
  key: 'promiseItemsState',
  default: [],
  effects_UNSTABLE: [persistAtom]
})

export const animalDictionaryState = atom({
  key: 'animalDictionaryState',
  default: [],
  effects_UNSTABLE: [persistAtom]
})

export const loadedPaintingListState = atom({
  key: 'loadedPaintingListState',
  default: [],
  effects_UNSTABLE: [persistAtom]
})