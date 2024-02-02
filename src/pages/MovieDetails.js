import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import tmdbApi from '../Api/tmdbApi';
import VideoList from './VideoList';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [mediaType, setMediaType] = useState('movie'); // Default to 'movie'
  const [movieDetails, setMovieDetails] = useState(null);
  const [casts, setCasts] = useState([]);
  const [similarMedia, setSimilarMedia] = useState([]);

  useEffect(() => {
    const fetchMediaDetails = async () => {
      try {
        // Use the 'detail' function based on the mediaType (movie or tv)
        const mediaResponse = await tmdbApi.detail(mediaType, id);
        setMovieDetails(mediaResponse);

        const castResponse = await tmdbApi.credits(mediaType, id);
        setCasts(castResponse.cast.slice(0, 5));

        const similarMediaResponse = await tmdbApi.similar(mediaType, id);
        setSimilarMedia(similarMediaResponse.results || []);
      } catch (error) {
        console.error('Error fetching media details or cast or similar media:', error);
      }
    };

    fetchMediaDetails();
  }, [id, mediaType]);

  useEffect(() => {
    // Set the mediaType based on the URL path
    const path = window.location.pathname;
    setMediaType(path.includes('/movie/') ? 'movie' : 'tv');
  }, []);

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
        <VideoList category={mediaType} id={id} />
      </div>

      {/* Render similar media (movies or TV series) without Swiper */}
      <div className="similar-media">
        <div className="head">
          <h1>Similar {mediaType === 'movie' ? 'Movies' : 'TV Series'}</h1>
        </div>
        <div className="similar-media-list">
          {similarMedia.map((media) => (
            <Link to={`/${mediaType}/${media.id}`} key={media.id} className="similar-media-item">
              <img
                src={`https://image.tmdb.org/t/p/w342/${media.poster_path}`}
                alt={media.title || media.name}
              />
              <p>{media.title || media.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
