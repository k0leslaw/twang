import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import SearchSongItem from "../../components/SearchSongItem/SearchSongItem";

function AddSongPage () {
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
            image: selectedSong.album.images[2]?.url,
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

        navigate('/song-library');
    }

    const back = async () => {
        navigate('/song-library');
    }

    return (
        <div>
            <h2>Add Song</h2>
            <SearchSongItem />
            <button onClick={back}>Back</button>
        </div>
    );
}

export default AddSongPage;