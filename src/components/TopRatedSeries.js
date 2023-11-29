import React, { useState, useEffect } from 'react';
import './TrendingMovies.css';
import tmdbApi from '../Api/tmdbApi.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function TopRatedSeries() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    tmdbApi.getTvList('top_rated')
      .then(response => {
        setTrendingMovies(response.results);
      })
      .catch(error => {
        console.error('Error fetching popular movies:', error);
      });
  }, []);

  return (
    <div className="top-rated-series">
      <div className="head">
        <h1>Top-Rated Series</h1>
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
        
              <p>{movie.title}</p>
            
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TopRatedSeries;
