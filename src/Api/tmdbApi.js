import React, { useState, useEffect } from 'react';
import tmdbApi from '../Api/tmdbApi';

function MovieDetails({ match }) {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const movieId = match.params.id;

    tmdbApi.detail('movie', movieId)
      .then(response => {
        setMovieDetails(response);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  }, [match.params.id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movieDetails.title}</h1>
      {/* Render other movie details here */}
    </div>
  );
}

export default MovieDetails;
