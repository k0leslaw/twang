function SongLibraryItem ({ song }) {
    return (
        <div>
            { song.title }
            <br/>
            { song.artist }
            <br/>
            <br/>
        </div>
    );
}

export default SongLibraryItem;