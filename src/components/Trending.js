import React, { useState, useEffect } from 'react';
import './Trending.css';
import tmdbApi from '../Api/tmdbApi.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Trending() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    tmdbApi.getMoviesList('popular')
      .then(response => {
        setTrendingMovies(response.results);
      })
      .catch(error => {
        console.error('Error fetching popular movies:', error);
      });
  }, []);

  return (
    <div className="trending">
      <div className="head">
        <h1>Trending Movies</h1>
        <div>
          <span>See More<b>&gt;</b></span>
        </div>
      </div>
        <Swiper
         spaceBetween={100}
         slidesPerView={4}
         navigation
        >
        {trendingMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
              alt={movie.title}
            />
            <div class="details">
              <p>{movie.title}</p>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Trending;
