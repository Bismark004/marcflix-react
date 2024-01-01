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

  return (
    <div className="movie-details">
      <h2 className="title">{movieDetails.title}</h2>
      <p className="overview">{movieDetails.overview}</p>
    </div>
  );
}

export default MovieDetails;
