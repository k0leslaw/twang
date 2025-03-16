import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/Homepage';
import SongLibraryPage from './pages/SongLibraryPage/SongLibraryPage';
import AddSongPage from './pages/AddSongPage/AddSongPage';

import './App.css'

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route path='/' element={ <HomePage /> }></Route>
            <Route path='/song-library' element={ <SongLibraryPage /> }></Route>
            <Route path='/add-song' element={ <AddSongPage /> }></Route>
          </Routes>
        </Router>
      </div>
  )
}

export default App
