import React, { useState, useEffect } from 'react';
import './TrendingMovies.css';
import tmdbApi from '../Api/tmdbApi.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './TrendingSeries.css';
import {  Link, Outlet } from 'react-router-dom';

function TrendingSeries () {
    const [trendingMovies, setTrendingMovies] = useState([])

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
           navigation>
          {trendingMovies.map((tvSeries) => (
            
            <SwiperSlide key={tvSeries.id}>
            <Link to={`tv/${tvSeries.id}`} key={tvSeries.id} >
              <img
                src={`https://image.tmdb.org/t/p/w342/${tvSeries.poster_path}`}
                alt={tvSeries.title}
              />
          
                <p>{tvSeries.original_name}</p>
              
              </Link>
            </SwiperSlide>
            
          ))}
        </Swiper>
        <Outlet/>
      </div>

    )
}
export default TrendingSeries;