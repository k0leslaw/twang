function SearchResultSongItem ({ song }) {
    return (
        <div>
            {<img src={song.album.images[2].url} width="64"/>} {song.name} by {song.artists.map(artist => artist.name).join(", ")}
        </div>
    );
}

export default SearchResultSongItem;