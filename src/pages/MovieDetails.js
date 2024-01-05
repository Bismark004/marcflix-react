import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../Api/tmdbApi';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Fetch movie details based on the movie ID
    tmdbApi
      .detail('movie', id)
      .then((response) => {
        setMovieDetails(response);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, [id]);

  if (!movieDetails) {
    return <div className="loading">Loading...</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w342/${movieDetails.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path || movieDetails.poster_path}`;

  return (
    <div className="movie-details">
      <div className="backdrop" style={{ backgroundImage: `url(${backdropUrl})` }}>
        <div className="overlay">
          <div className="movie-content__poster">
            <div className="movie-content__poster__img" style={{ backgroundImage: `url(${posterUrl})` }}></div>
          </div>
          <div className="movie-content__info">
            <h1 className="title">
              {movieDetails.title}
            </h1>
            <div className="genres">
              {movieDetails.genres && movieDetails.genres.slice(0, 5).map((genre, i) => (
                <span key={i} className="genres__item">{genre.name}</span>
              ))}
            </div>
            <p className="overview">{movieDetails.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
