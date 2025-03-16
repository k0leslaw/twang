import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import SongLibraryItem from "../../components/SongLibraryItem/SongLibraryItem";

function SongLibraryPage () {
    const [songs, setSongs] = useState([]);
    const [filter, setFilter] = useState(null);

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

    return (
        <div>
            <h2>Song Library</h2>

            <button onClick={ () => setFilter(true) }>Learned</button>
            <button onClick={ () => setFilter(false) }>Not Learned</button>
            <button onClick={ () => setFilter(null) }>All Songs</button>

            { songs.map((song, i) => (<SongLibraryItem  song={song} key={i}/>)) }


        </div>
    );
}

export default SongLibraryPage;