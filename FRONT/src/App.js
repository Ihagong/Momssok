import React, { useReducer, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignUpPage from './Pages/SignUpPage'
import LogInPage from './Pages/LogInPage'
import EditAccountPage from './Pages/EditAccountPage'
import ProfilePage from './Pages/ProfilePage'
import ManageProfilePage from './Pages/ManageProfilePage'
import CreateProfilePage from './Pages/CreateProfilePage'
import EditProfilePage from './Pages/EditProfilePage'
import ChildMainPage from './Pages/ChildMainPage'
import CreatePaintingPage from './Pages/CreatePaintingPage'
import LoadPaintingPage from './Pages/LoadPaintingPage'
import EditPaintingPage from './Pages/EditPaintingPage'
import CreateDiaryPage from './Pages/CreateDiaryPage'
import EditDiaryPage from './Pages/EditDiaryPage'
import DiaryPage from './Pages/DiaryPage'
import DiaryDetailPage from './Pages/DiaryDetailPage'
import ParentMainPage from './Pages/ParentMainPage'
import CalendarPage from './Pages/CalendarPage'
import PromisePage from './Pages/PromisePage'
import LetterPage from './Pages/LetterPage'
import CreateLetterPage from './Pages/CreateLetterPage'
import LetterDetailPage from './Pages/LetterDetailPage'
import FindPasswordPage from './Pages/FindPasswordPage'

import { useRecoilState } from 'recoil'
import { loadedPaintingState, logInTokenState } from './store/atoms'

const loadedPainting = new Image()


// LetterPage

const reducer = (state, action) => {
  let newState = []

  switch (action.type) {
    case "INIT": {
      return action.data
    }
    case "CREATE": {
      newState = [action.data, ...state]
      break
    }
    case "REMOVE": {
      newState = state.filter((it) => it.letterId !== action.targetId)
      break
    }
    default:
      return state
  }
  return newState
};

export const LetterStateContext = React.createContext()
export const LetterDispatchContext = React.createContext()



function App() {
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)
  const [loadedPaintingSrc, setLoadedPaintingSrc] = useRecoilState(loadedPaintingState)
  loadedPainting.src = loadedPaintingSrc

  // LetterPage
  const [data, dispatch] = useReducer(reducer, [])
  const dataId = useRef(1)

  // CREATE
  const onCreate = (receiver, title, content) => {
    dispatch({
      type: "CREATE",
      data: {
        letterId: dataId.current,
        date: new Date().getTime(),
        author: "다은이",
        receiver,
        title,
        content,
      },
    })
    dataId.current += 1
  }
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId })
  }
  

  return (
    <LetterStateContext.Provider value={data}>
      <LetterDispatchContext.Provider value={{ onCreate, onRemove }}>

        <Router>
          <Routes>
            <Route exact path='/' element={ <Navigate to='/login' replace /> } />
            <Route exact path='/signup' element={ <SignUpPage /> } />
            <Route exact path='/login' element={ logInToken ? <Navigate to='/profile' replace /> : <LogInPage /> } />
            <Route exact path='/account' element={ logInToken ? <EditAccountPage /> : <Navigate to='/login' replace /> } />
            <Route exact path='/profile' element={ logInToken ? <ProfilePage /> : <Navigate to='/login' replace /> } />
            <Route exact path='/profile/manage' element={ logInToken ? <ManageProfilePage /> : <Navigate to='/login' replace /> } />
            <Route exact path='/profile/create' element={ <CreateProfilePage /> } />
            <Route exact path='/profile/:profileId/edit' element={ <EditProfilePage /> } />
            <Route exact path='/child' element={ <ChildMainPage /> } />
            <Route exact path='/painting/create' element={ <CreatePaintingPage loadedPainting={loadedPainting} /> } />
            <Route exact path='/painting/load' element={ <LoadPaintingPage /> } />
            <Route exact path='/painting/:paintingId/edit' element={ <EditPaintingPage /> } />
            <Route exact path='/diary/create' element={ <CreateDiaryPage /> } />
            <Route exact path='/diary/:diaryId/edit' element={ <EditDiaryPage /> } />
            <Route exact path='/diary' element={ <DiaryPage /> } />
            <Route exact path='/diary/:diaryId' element={ <DiaryDetailPage /> } />
            <Route exact path='/parent' element={ <ParentMainPage /> } />
            <Route exact path='/calendar' element={ <CalendarPage /> } />
            <Route exact path='/promise' element={ <PromisePage /> } />
            <Route exact path='/letter' element={ <LetterPage /> } />
            <Route exact path='/letter/create' element={ <CreateLetterPage /> } />
            <Route exact path='/letter/:letterId' element={ <LetterDetailPage /> } />
            <Route exact path='/findpassword' element={ <FindPasswordPage /> } />
          </Routes>
        </Router>
        
      </LetterDispatchContext.Provider>
    </LetterStateContext.Provider>
  );
}

export default App