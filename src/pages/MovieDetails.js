import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../Api/tmdbApi';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [casts, setCasts] = useState([]); // Add state for casts

  useEffect(() => {
    // Fetch movie details based on the movie ID
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
        const movieResponse = await tmdbApi.detail('movie', id);
        setMovieDetails(movieResponse);

        // Fetch cast details
        const castResponse = await tmdbApi.credits('movie', id);
        setCasts(castResponse.cast.slice(0, 5));
      } catch (error) {
        console.error('Error fetching movie details or cast:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div className="loading">Loading...</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w342/${movieDetails.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path || movieDetails.poster_path}`;

  return (
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
          {/* Cast rendering */}
          <div className="cast">
            <div className="section__header">
              <h2>Casts</h2>
            </div>
            <div className="casts">
              {casts.map((item, i) => (
                <div key={i} className="casts__item">
                  <div
                    className="casts__item__img"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.profile_path})`,
                    }}
                  ></div>
                  <p className="casts__item__name">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
