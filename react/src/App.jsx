import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/Homepage';
import SongLibraryPage from './pages/SongLibraryPage/SongLibraryPage';
import AddSongPage from './pages/AddSongPage/AddSongPage';
import EditSongPage from './pages/EditSongPage/EditSongPage';
import PracticeLogPage from './pages/PracticeLogPage/PracticeLogPage';

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
          <Route path = '/practice-log' element={ <PracticeLogPage/> }></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
