import SearchResultSongItem from "../SearchResultSongItem/SearchResultSongItem";
import './SearchResultsItem.css'

function SearchResultsItem ({ searchResults, handleSelectSong }) {
    return (
        <div id='search-results-item'>
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