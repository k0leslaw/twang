import './SongLibraryItem.css';

function SongLibraryItem ({ song, onEdit }) {

    return (
        <div className="song-library-item" onClick={() => onEdit(song)}>
            <img  id='song-img' src={song.image}/>
            <span id='song-info-text'>
                <div id='song-title'>{ song.title }</div>
                <div id='song-artist'>{ song.artist }</div>
            </span>
        </div>
    );
}

export default SongLibraryItem;