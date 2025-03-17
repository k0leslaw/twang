import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditSongPage ({ songToEdit }) {
    const [title, setTitle] = useState(songToEdit.title);
    const [artist, setArtist] = useState(songToEdit.artist);
    const [learned, setLearned] = useState(songToEdit.learned);
    
    const navigate = useNavigate();

    useEffect( () => {
        setTitle(songToEdit.title);
        setArtist(songToEdit.artist);
        setLearned(songToEdit.learned);
    }, [songToEdit]);

    const editSong = async () => {
        const updatedSong = { title, artist, learned };
        const response = await fetch(
            `/songs/${songToEdit._id}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(updatedSong)
            }
        );
        
        if (response.status === 201) {
            alert(`${title} by ${artist} has been edited.`);
        } else {
            alert("Failed to edit the song, status code " + response.status);
        }

        await navigate('/song-library');
    }

    const deleteSong = async (_id) => {
        const response = await fetch(`/songs/${songToEdit._id}`,
            {method: 'DELETE'}
        );

        if (response.status === 204) {
            alert(`${title} by ${artist} was deleted.`);
            navigate('/song-library');
        } else {
            alert(`Failed to delete ${title} by ${artist}`);
        }
    }

    const cancel = async () => {
        navigate('/song-library');
    }

    return (
        <div>
            <h2>Edit Song</h2>
            <input 
                type="text"
                placeholder="Title"
                value={ title }
                readOnly
                onChange={ e => setTitle(e.target.value) } />
            <br/>
            <input 
                type="text"
                placeholder="Artist"
                value={ artist }
                readOnly
                onChange={e => setArtist(e.target.value)} />
            <br/>
            <select value={ learned } onChange={ e => setLearned(e.target.value) }>
                <option value={'learned'}>Learned</option>
                <option value={'not learned'}>Not learned</option>
                <option value={'in progress'}>In progress</option>
            </select>
            <br/>

            <button onClick={cancel}>Cancel</button>
            <button onClick={editSong}>Save</button>
            <button onClick={deleteSong}>Delete</button>
        </div>
    );
}

export default EditSongPage;