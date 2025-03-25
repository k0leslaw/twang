import SearchResultSongItem from "../SearchResultSongItem/SearchResultSongItem";

function SearchResultsItem ({ searchResults, handleSelectSong }) {
    return (
        <div>
            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map(song => (
                        <li key={song.id} onClick={() => handleSelectSong(song)}>
                            <SearchResultSongItem song={song} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchResultsItem;