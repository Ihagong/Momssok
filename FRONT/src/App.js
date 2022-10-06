import React from 'react'
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
import AnimalDictionaryPage from './Pages/AnimalDictionaryPage'
import CreateDictionaryPaintingPage from './Pages/CreateDictionaryPaintingPage'
import ReportPage from './Pages/ReportPage'
import KidsSongPage from './Pages/KidsSongPage'
import DeleteAccountPage from './Pages/DeleteAccountPage'
import ActivityRecordPage from './Pages/ActivityRecordPage'

import { useRecoilState } from 'recoil'
import { logInTokenState } from './store/atoms'


function App() {
  const [logInToken, setLogInToken] = useRecoilState(logInTokenState)


  return (
    <Router>
      <Routes>
        <Route exact path='/' element={ <Navigate to='/login' replace /> } />
        <Route exact path='/signup' element={ <SignUpPage /> } />
        <Route exact path='/login' element={ logInToken ? <Navigate to='/profile' replace /> : <LogInPage /> } />
        <Route exact path='/account' element={ logInToken ? <EditAccountPage /> : <Navigate to='/login' replace /> } />
        <Route exact path='/profile' element={ logInToken ? <ProfilePage /> : <Navigate to='/login' replace /> } />
        <Route exact path='/profile/manage' element={ logInToken ? <ManageProfilePage /> : <Navigate to='/login' replace /> } />
        <Route exact path='/profile/create' element={ <CreateProfilePage /> } />
        <Route exact path='/profile/edit' element={ <EditProfilePage /> } />
        <Route exact path='/child' element={ <ChildMainPage /> } />
        <Route exact path='/painting/create' element={ <CreatePaintingPage /> } />
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
        <Route exact path='/dictionary' element={ <AnimalDictionaryPage /> } />
        <Route exact path='/dictionary/create/:detailId' element={ <CreateDictionaryPaintingPage /> } />
        <Route exact path='/report' element={ <ReportPage /> } />
        <Route exact path='/song' element={ <KidsSongPage /> } />
        <Route exact path='/account/delete' element={ logInToken ? <DeleteAccountPage /> : <Navigate to='/login' replace /> } />
        <Route exact path='/activity' element={ <ActivityRecordPage /> } />
      </Routes>
    </Router>
  );
}

export default App