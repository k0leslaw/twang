import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddSongPage () {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [learned, setLearned] = useState(true);

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
            <select onChange={e => setLearned(e.target.value === "true")}>
                <option value={true}>Learned</option>
                <option value={false}>Not learned</option>
            </select>
            <br/>
            <button onClick={cancel}>Cancel</button>
            <button onClick={addSong}>Add</button>
        </div>
    );
}

export default AddSongPage;