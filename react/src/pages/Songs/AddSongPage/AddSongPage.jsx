import { useNavigate } from "react-router-dom";
import { useState } from "react";

import './AddSongPage.css';
import SearchResultsItem from '../../../components/SearchResultsItem/SearchResultsItem.jsx';

function AddSongPage () {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [learned, setLearned] = useState('not learned');
    const [songLimit, setSongLimit] = useState(3);

    const searchSpotify = async () => {
        if (!searchQuery) return;

        try {
            const response = await fetch(`/spotify/search?query=${searchQuery}&type=track&limit=${songLimit}`);
            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const data = await response.json();
            setSearchResults(data.tracks.items);
        } catch (error) {
            console.error("Spotify search failed", error);
            setSearchResults([]);
        }
    }

    const handleSelectSong = (song) => {
        setSelectedSong(song);
        setSearchQuery(`${song.name} - ${song.artists.map(artist => artist.name).join(", ")}`);
        setSearchResults([]);
    }

    const addSong = async () => {
        if (!selectedSong) {
            alert("Please select a song before adding.");
            return;
        }

        const newSong = {
            title: selectedSong.name,
            artist: selectedSong.artists.map(artist => artist.name).join(", "),
            image: selectedSong.album.images[0]?.url,
            learned
        }

        const response = await fetch('/songs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSong)
        });
        
        if (response.status === 201) {
            alert(`${newSong.title} by ${newSong.artist} has been added.`)
        } else {
            alert("Failed to add the song, status code " + response.status)
        }
    }

    const back = async () => {
        navigate('/song-library');
    }

    return (
        
        <div id='add-song-page'>
            <div id='title-search-bar-container'>
                <h2>Add Song</h2>
                <div>
                    <input 
                        type="text"
                        placeholder="Search for a song..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)} />
                    <input 
                        type='number'
                        value={songLimit}
                        onChange={e => setSongLimit(e.target.valueAsNumber)} />
                </div>
            </div>

            <button onClick={searchSpotify}>Search</button>

            <div id='back-results-container'>
                <button onClick={back}>Back</button>
                <div id='search-results-selector-container'>
                    <SearchResultsItem searchResults={searchResults} handleSelectSong={handleSelectSong}/>

                    <div>
                        <select value={ learned } onChange={e => setLearned(e.target.value)}>
                            <option value={'learned'}>Learned</option>
                            <option value={'not learned'}>Not learned</option>
                            <option value={'in progress'}>In progress</option>
                        </select>

                        <button onClick={addSong}>Add</button>
                    </div>
                </div>
                
            </div>   
        </div>
    );
}

export default AddSongPage;