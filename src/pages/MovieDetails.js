import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import tmdbApi from '../Api/tmdbApi';
import VideoList from './VideoList';  
import './MovieDetails.css';
import Sidebar from '../components/SideBar';

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [casts, setCasts] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchMovieDetails = async () => {
      try {
        const category = window.location.pathname.startsWith('/movie') ? 'movie' : 'tv';
        const response = await tmdbApi.detail(category, id);
        if (isMounted) setMovieDetails(response);

        const castResponse = await tmdbApi.credits(category, id);
        if (isMounted) setCasts(castResponse.cast.slice(0, 5));

        const similarMoviesResponse = await tmdbApi.similar(category, id);
        if (isMounted) setSimilarMovies(similarMoviesResponse.results || []); 
      } catch (error) {
        console.error(`Error fetching ${category} details, cast, or similar movies:`, error);
      }
    };

    fetchMovieDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!movieDetails) {
    return <div className="loading">Loading...</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w342/${movieDetails.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path || movieDetails.poster_path}`;

  return (
    <div className="movie-details-wrapper">
      <Sidebar />
      <div className="movie-details">
        <div className="banner" style={{ backgroundImage: `url(${backdropUrl})` }}></div>
        <div className="movie-content">
          <div className="movie-content__poster">
            <div className="movie-content__poster__img" style={{ backgroundImage: `url(${posterUrl})` }}></div>
          </div>
          <div className="movie-content__info">
            <h1 className="title">{movieDetails.title || movieDetails.name}</h1>
            <div className="genres">
              {movieDetails.genres && movieDetails.genres.slice(0, 5).map((genre, i) => (
                <span key={i} className="genres__item">{genre.name}</span>
              ))}
            </div>
            <p className="overview">{movieDetails.overview}</p>
            <div className="cast">
              <div className="section__header">
                <h2>Casts</h2>
              </div>
              <div className="casts">
                {casts.map((item, i) => (
                  <div key={i} className="casts__item">
                    {item.profile_path && (
                      <div
                        className="casts__item__img"
                        style={{
                          backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.profile_path})`,
                        }}
                      ></div>
                    )}
                    <p className="casts__item__name">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="video-section">
          <VideoList category="movie" id={id} />
        </div>
        <div className="similar-movies">
          <div className="head">
            <h1>Similar Movies</h1>
          </div>
          <div className="similar-movies-list">
            {similarMovies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} className="similar-movie">
                <img
                  src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
