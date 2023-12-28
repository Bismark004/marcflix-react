import React, { useState, useEffect } from 'react';
import './TrendingMovies.css';
import tmdbApi from '../Api/tmdbApi.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link, Outlet } from 'react-router-dom';


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
        <div className='btn-container'>
          <a className='btn-content' href>
            <span className='btn-title'>See More <b>&gt;</b></span>
          </a>
        </div>
      </div>
      <Swiper
         spaceBetween={20}
         slidesPerView={4}
         navigation>
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

export default Trending;
