// MovieDetails.js
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

  const backdropUrl = `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path || movieDetails.poster_path}`;

  return (
    <div className="movie-details">
      <div className="backdrop" style={{ backgroundImage: `url(${backdropUrl})` }}>
        <div className="overlay">
          <h2 className="title">{movieDetails.title}</h2>
          <p className="overview">{movieDetails.overview}</p>
        </div>
      </div>
      {/* Add cast rendering if available */}
      {movieDetails.credits && movieDetails.credits.cast && (
        <div className="cast">
          <h3>Cast</h3>
          <ul>
            {movieDetails.credits.cast.slice(0, 5).map((castMember) => (
              <li key={castMember.id}>{castMember.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
