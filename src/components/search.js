
function Search(props) {
    <div className="search-results">
    <h1>Search Results</h1>
    {props.searchResults.map((movie) => (
      <div className='movie-grid' key={movie.id}>
        <img
          src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          alt={movie.title}
        />
        <p>{movie.title}</p>
      </div>
    ))}
  </div>

}
export default Search;