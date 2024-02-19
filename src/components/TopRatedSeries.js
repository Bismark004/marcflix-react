import React, { useState, useEffect } from 'react';
import './TrendingMovies.css';
import tmdbApi from '../Api/tmdbApi.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './TrendingSeries.css';
import {  Link, Outlet } from 'react-router-dom';


function TopRatedSeries() {
  const [topSeries, setTopSeries] = useState([]);

  useEffect(() => {
    tmdbApi.getTvList('top_rated')
      .then(response => {
        setTopSeries(response.results);
      })
      .catch(error => {
        console.error('Error fetching trending series:', error);
      });
  }, []);

  return (
    <div className="trending">
      <div className="head">
        <h1>Top-Rated Series</h1>
        <div class='btn-container'>
          <a class='btn-content' href>
            <span class='btn-title'>See More <b>&gt;</b></span>
          </a>
        </div>
      </div>
        <Swiper
         spaceBetween={20}
         slidesPerView={4}
         navigation>
        {topSeries.map((tv) => (
          
          <SwiperSlide key={tv.id}>
          <Link to={`/movie/${tv.id}`} key={tv.id} >
            <img
              src={`https://image.tmdb.org/t/p/w342/${tv.poster_path}`}
              alt={tv.title}
            />
        
              <p>{tv.original_name}</p>
            
            </Link>
          </SwiperSlide>
          
        ))}
      </Swiper>
      <Outlet/>
    </div>
  );
}

export default TopRatedSeries;
