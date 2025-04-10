import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/Homepage';
import SongLibraryPage from './pages/Songs/SongLibraryPage/SongLibraryPage.jsx';
import AddSongPage from './pages/Songs/AddSongPage/AddSongPage.jsx';
import EditSongPage from './pages/Songs/EditSongPage/EditSongPage.jsx';
import PracticeLogPage from './pages/PracticeLog//PracticeLogPage/PracticeLogPage.jsx';
import AddPracticeLogPage from './pages/PracticeLog/AddPracticeLogPage/AddPracticeLogPage.jsx';
import EditPracticeLogPage from './pages/PracticeLog/EditPracticeLogPage/EditPracticeLogPage.jsx';

import './App.css'

function App() {
  const [songToEdit, setSongToEdit] = useState([]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={ <HomePage /> }></Route>
          <Route path='/song-library' element={ <SongLibraryPage setSongToEdit={setSongToEdit} /> }></Route>
          <Route path='/song-library/add-song' element={ <AddSongPage /> }></Route>
          <Route path='/song-library/edit-song' element={ <EditSongPage songToEdit={songToEdit} /> }></Route>
          <Route path = '/practice-log' element={ <PracticeLogPage /> }></Route>
          <Route path = '/practice-log/add-log' element={ <AddPracticeLogPage />}></Route>
          <Route path = '/practice-log/edit-log' element={ <EditPracticeLogPage />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
