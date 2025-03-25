import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import './SongLibraryItem.css';

function SongLibraryItem ({ song, onEdit }) {
    const navigate = useNavigate();

    return (
        <div className="song-library-item">
            <img  id='song-img' onClick={() => onEdit(song)} src={song.image}/>
            <span id='song-info-text'>
                <div id='song-title'>{ song.title }</div>
                <div id='song-artist'>{ song.artist }</div>
            </span>
        </div>
    );
}

export default SongLibraryItem;