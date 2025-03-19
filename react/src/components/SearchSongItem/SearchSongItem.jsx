import { useNavigate } from "react-router-dom";
import { useState } from "react";

import AddSongPage from "../../pages/AddSongPage/AddSongPage";

function SearchSongItem () {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [learned, setLearned] = useState('not learned');

    const searchSpotify = async () => {
        if (!searchQuery) return;

        try {
            const response = await fetch(`/spotify/search?query=${searchQuery}&type=track`);
            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const data = await response.json();
            setSearchResults(data.tracks.items);
        } catch {
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

    return (
        <div>
            <input 
                type="text"
                placeholder="Search for a song..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)} />
            <button onClick={searchSpotify}>Search</button>
            <br/>

            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map(song => (
                        <li key={song.id} onClick={() => handleSelectSong(song)}>
                            {song.name} - {song.artists.map(artist => artist.name).join(", ")}
                        </li>
                    ))}
                </ul>
            )}
        
            <select value={ learned } onChange={e => setLearned(e.target.value)}>
                <option value={'learned'}>Learned</option>
                <option value={'not learned'}>Not learned</option>
                <option value={'in progress'}>In progress</option>
            </select>
            <br/>
            <button onClick={addSong}>Add</button>
        </div>
    );
}

export default SearchSongItem;