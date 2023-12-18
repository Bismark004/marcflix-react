import React, { useState, useEffect } from 'react';
import tmdbApi from '../Api/tmdbApi.js';
import './TrendingMovies.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';

function TopRated() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    tmdbApi.getMoviesList('top_rated')
      .then(response => {
        setTopRatedMovies(response.results);
      })
      .catch(error => {
        console.error('Error fetching top-rated movies:', error);
      });
  }, []);

  return (
    <div className="trending">
      <div className="head">
        <h1>Top-Rated Movies</h1>
        <div className='btn-container'>
          <a className='btn-content' href="/">
            <span className='btn-title'>See More <b>&gt;</b></span>
          </a>
        </div>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        navigation
      >
        {topRatedMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
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

export default TopRated;
