import React, { useState, useEffect } from 'react';
import './TrendingSeries.css';
import tmdbApi, { tvType } from '../Api/tmdbApi.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function TrendingSeries() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    tmdbApi.getTvList('popular')
      .then(response => {
        setTrendingMovies(response.results);
      })
      .catch(error => {
        console.error('Error fetching popular movies:', error);
      });
  }, []);

  return (
    <div className="trending-series">
      <div className="head">
        <h1>Trending Series</h1>
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
        
              <p>{tv.title}</p>
            
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TrendingSeries;
