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