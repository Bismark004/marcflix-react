import React, { useState, useEffect } from 'react';
import './TrendingMovies.css';
import tmdbApi from '../Api/tmdbApi.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './TrendingSeries.css';
import {  Link, Outlet } from 'react-router-dom';

function TrendingSeries () {
    const [TrendingSeries, setTrendingSeries] = useState([])

    useEffect(() => {
        tmdbApi.getTvList('popular')
          .then(response => {
            setTrendingSeries(response.results);
          })
          .catch(error => {
            console.error('Error fetching popular series:', error);
          });
      }, []);
    

    return (
        <div className="trending">
        <div className="head">
          <h1>Trending Series</h1>
          
        </div>
          <Swiper
           spaceBetween={20}
           slidesPerView={4}
           navigation>
          {TrendingSeries.map(tv => (
            
            <SwiperSlide key={tv.id}>
            <Link to={`/tv/${tv.id}`}>
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

    )
}
export default TrendingSeries; 

