
import { Link, Outlet } from 'react-router-dom';

function SearchResults (props) {

    return(
        <div className="search-results">
        {props.SearchResults.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} >
          <div className='movie-grid' key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </div>
          </Link>
        ))}
        <Outlet/>
      </div>


    )

}
export default  SearchResults;