import React, { useState, useEffect } from 'react';
import tmdbApi from '../Api/tmdbApi.js';
import './TrendingMovies.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link, Outlet } from 'react-router-dom';

function TopRated() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    tmdbApi.getMoviesList('top_rated')
      .then(response => {
        setTrendingMovies(response.results);
      })
      .catch(error => {
        console.error('Error fetching top-rated movies:', error);
      });
  }, []);

  return (
    <div className="trending">
      <div className="head">
        <h1>Top-Rated Movies</h1>
        
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation
      >
        {trendingMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`} key={movie.id} >
              <img
                src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
              </Link>
            </SwiperSlide>
          
        ))}
      </Swiper>
      <Outlet/>
    </div>
  );
}

export default TopRated;
