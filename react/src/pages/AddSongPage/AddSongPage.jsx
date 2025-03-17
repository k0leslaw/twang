import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AddSongPage () {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [learned, setLearned] = useState('not learned');

    const addSong = async () => {
        const newSong = { title, artist, learned };
        const response = await fetch(
            '/songs', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newSong)
            }
        );
        
        if (response.status === 201) {
            alert(`${title} by ${artist} has been added.`)
        } else {
            alert("Failed to add the song, status code " + response.status)
        }

        navigate('/song-library');
    }

    const cancel = async () => {
        navigate('/song-library');
    }

    const fetchSongsFromSpotify = async (query) => {
        try {
            const res = await fetch(`/spotify/search?query=${encodeURIComponent(query)}`);
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

            const data = await res.json();
            console.log("Spotify Search Results:", data);
        } catch (error) {
            console.error("Error fetching songs from Spotify:", error);
        }
    }

    useEffect( () => {
        fetchSongsFromSpotify("Deep Satin");
    }, [])

    return (
        <div>
            <h2>Add Song</h2>
            <input 
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)} />
            <br/>
            <input 
                type="text"
                placeholder="Artist"
                value={artist}
                onChange={e => setArtist(e.target.value)} />
            <br/>
            <select value={ learned } onChange={e => setLearned(e.target.value)}>
                <option value={'learned'}>Learned</option>
                <option value={'not learned'}>Not learned</option>
                <option value={'in progress'}>In progress</option>
            </select>
            <br/>
            <button onClick={cancel}>Cancel</button>
            <button onClick={addSong}>Add</button>
        </div>
    );
}

export default AddSongPage;