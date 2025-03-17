import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import SongLibraryItem from "../../components/SongLibraryItem/SongLibraryItem";

function SongLibraryPage ({ setSongToEdit }) {
    const [songs, setSongs] = useState([]);
    const [filter, setFilter] = useState(null);

    const navigate = useNavigate();

    useEffect ( () => {
        loadSongs();
    }, [filter]);

    const loadSongs = async () => {
        let url = '/songs';
        if (filter !== null) {
            url = `/songs?learned=${filter}`;
        }

        const res = await fetch(url);
        const data = await res.json();
  
        setSongs(data);
    }

    const onEdit = async (song) => {
        setSongToEdit(song);
        navigate('edit-song')
    }

    return (
        <div>
            <h2>Song Library</h2>

            <button onClick={e => { e.preventDefault(); setFilter('learned') }}>Learned</button>
            <button onClick={e => { e.preventDefault(); setFilter('not learned') }}>Not Learned</button>
            <button onClick={e => { e.preventDefault(); setFilter('in progress') }}>In progress</button>
            <button onClick={e => { e.preventDefault(); setFilter(null) }}>All Songs</button>

            
            <Link to="add-song">
                <button>Add Song</button>
            </Link>

            { songs.map((song, i) => (<SongLibraryItem onEdit={onEdit} song={song} key={i}/>)) }
        </div>
    );
}

export default SongLibraryPage;