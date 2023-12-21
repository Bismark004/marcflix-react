import React, { useState, useEffect } from 'react';
import './TrendingSeries.css';
import tmdbApi from '../Api/tmdbApi.js';
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
    <div className="trending">
      <div className="head">
        <h1>Trending Series</h1>
        <div class='btn-container'>
          <a class='btn-content' href>
            <span class='btn-title'>See More <b>&gt;</b></span>
          </a>
        </div>
      </div>
        <Swiper
         spaceBetween={20}
         slidesPerView={4}
         navigation
        >
        {trendingMovies.map((tv) => (
          <SwiperSlide key={tv.id}>
            <img
              src={`https://image.tmdb.org/t/p/w342/${tv.poster_path}`}
              alt={tv.name}
            />
        
              <p> {tv.original_name}</p>
            
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TrendingSeries;
