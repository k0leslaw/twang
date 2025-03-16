import { useNavigate } from "react-router-dom";

function AddSongPage () {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [learned, setLearned] = useState('');

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

        navigate('/');
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
            <input 
                type="boolean"
                placeholder="true"
                value={learned}
                onChange={e => setLearned(e.target.value)} />
            <br/>
            <button onClick={addExercise}>Add</button>
        </div>
    );
}

export default AddSongPage;