import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../Api/tmdbApi';
import VideoList from './VideoList';  // Import VideoList component
import './MovieDetails.css';
import SimilarMovies from '../components/SimilarMovies';


function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await tmdbApi.detail('movie', id);
        setMovieDetails(movieResponse);

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
            <div className='casts'>
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
      {/* Include VideoList component */}
      <div className="video-section">
        <VideoList category="movie" id={id} />
      </div>

      <div>
        <SimilarMovies category='movie' id={id}/>
      </div>
    </div> 
  );
}

export default MovieDetails;
