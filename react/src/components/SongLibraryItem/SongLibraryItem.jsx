import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import './SongLibraryItem.css';

function SongLibraryItem ({ song, onEdit }) {
    const navigate = useNavigate();

    return (
        <div className="song-library-item">
            <img src={song.image} width="64"/>
    
            { song.title }
            { song.artist }

            <button onClick={() => onEdit(song)}>Edit</button>
        </div>
    );
}

export default SongLibraryItem;