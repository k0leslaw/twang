import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";

import './EditSongPage.css';

function EditSongPage ({ songToEdit }) {
    const [title, setTitle] = useState(songToEdit.title);
    const [artist, setArtist] = useState(songToEdit.artist);
    const [learned, setLearned] = useState(songToEdit.learned);
    const image = songToEdit.image;
    
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
        <div id='edit-song-page'>
            <h2>Edit Song</h2>
            
            <div id='options-buttons-container'>
                <div id='edit-options-container'>
                    <div id='song-info-container'>
                        <img src={image}/>
                        <input 
                            id = 'title'
                            type='text'
                            placeholder='Title'
                            value={ title }
                            readOnly
                            onChange={ e => setTitle(e.target.value) } />
                        <input 
                            id = 'artist'
                            type='text'
                            placeholder='Artist'
                            value={ artist }
                            readOnly
                            onChange={e => setArtist(e.target.value)} />
                    </div>
                    
                    <select value={ learned } onChange={ e => setLearned(e.target.value) }>
                        <option value={'learned'}>Learned</option>
                        <option value={'not learned'}>Not learned</option>
                        <option value={'in progress'}>In progress</option>
                    </select>
                </div>
                
                <div id='buttons-container'>
                    <button onClick={cancel}>Cancel</button>
                    <button onClick={editSong}>Save</button>
                    <button id='delete-button' onClick={deleteSong}><HiOutlineTrash /></button>
                </div>
            </div>

            <footer>
                <p>footer</p>
            </footer>
        </div>
    );
}

export default EditSongPage;