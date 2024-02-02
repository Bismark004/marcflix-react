import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../Api/tmdbApi';
import VideoList from './VideoList';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [mediaType, setMediaType] = useState('movie'); // Default to 'movie'
  const [details, setDetails] = useState(null);
  const [casts, setCasts] = useState([]);
  const [similarMedia, setSimilarMedia] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Determine the media type based on the URL
        const pathSegments = window.location.pathname.split('/');
        const currentMediaType = pathSegments[1];
        setMediaType(currentMediaType);

        // Fetch details based on the determined media type
        const response = await tmdbApi.detail(currentMediaType, id);
        setDetails(response);

        // Fetch additional data (casts, similar media) based on the determined media type
        const castResponse = await tmdbApi.credits(currentMediaType, id);
        setCasts(castResponse.cast.slice(0, 5));

        const similarMediaResponse = await tmdbApi.similar(currentMediaType, id);
        setSimilarMedia(similarMediaResponse.results || []);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!details) {
    return <div className="loading">Loading...</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w342/${details.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original/${details.backdrop_path || details.poster_path}`;

  return (
    <div className="movie-details">
      <div className="banner" style={{ backgroundImage: `url(${backdropUrl})` }}></div>
      <div className="movie-content">
        <div className="movie-content__poster">
          <div className="movie-content__poster__img" style={{ backgroundImage: `url(${posterUrl})` }}></div>
        </div>
        <div className="movie-content__info">
          <h1 className="title">{details.title || details.name}</h1>
          <div className="genres">
  {details.genres && details.genres.slice(0, 5).map((genre, i) => (
    <span key={i} className="genres__item">{genre.name}</span>
  ))}
</div>
<p className="overview">{details.overview}</p>
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

      {/* Render similar media without Swiper */}
      <div className="similar-media">
        <div className="head">
          <h1>Similar {mediaType === 'movie' ? 'Movies' : 'TV Series'}</h1>
        </div>
        <div className="similar-media-list">
          {similarMedia.map((media) => (
            <div key={media.id}>
              <img
                src={`https://image.tmdb.org/t/p/w342/${media.poster_path}`}
                alt={media.title || media.name}
              />
              <p>{media.title || media.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
