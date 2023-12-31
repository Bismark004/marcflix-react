import React, { useState, useEffect } from 'react';
import './TrendingMovies.css';
import tmdbApi from '../Api/tmdbApi.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';


function SimilarMovies({ movieId }) {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    tmdbApi.similar('movie', movieId)
      .then(response => {
        console.log(response.results);
        setSimilarMovies(response.results || []);
      })
      .catch(error => {
        console.error('Error fetching similar movies:', error);
        setError(error); // Set the error state
      });
  }, [movieId]);

  if (error) {
    return <div>Error fetching similar movies. Please try again later.</div>;
  }

  return (
    <div className="similar-movies">
      <div className="head">
        <h1>Similar Movies</h1>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        navigation
      >
        {similarMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SimilarMovies;
