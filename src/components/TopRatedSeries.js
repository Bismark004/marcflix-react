import React, { useState, useEffect } from 'react';
import './TrendingMovies.css';
import tmdbApi from '../Api/tmdbApi.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './TrendingSeries.css';
import { Link } from 'react-router-dom';

function TopRatedSeries() {
  const [topRatedSeries, setTopRatedSeries] = useState([]);

  useEffect(() => {
    tmdbApi.getTvList('top_rated')
      .then(response => {
        setTopRatedSeries(response.results);
      })
      .catch(error => {
        console.error('Error fetching top-rated series:', error);
      });
  }, []);

  return (
    <div className="trending">
      <div className="head">
        <h1>Top-Rated Series</h1>
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
        {topRatedSeries.map((series) => (
          <SwiperSlide key={series.id}>
            <Link to={`/tv/${series.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w342/${series.poster_path}`}
                alt={series.original_name}
              />
              <p>{series.original_name}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TopRatedSeries;
