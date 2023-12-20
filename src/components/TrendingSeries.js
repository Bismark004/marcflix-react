import React, { useState, useEffect } from 'react';
import './TrendingSeries.css';
import tmdbApi from '../Api/tmdbApi.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';

function TrendingSeries() {
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    tmdbApi.getTvList('popular')
      .then(response => {
        setTrendingSeries(response.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching popular TV series:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="trending">
      <div className="head">
        <h1>Trending Series</h1>
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
        {trendingSeries.map((tv) => (
          <Link to={`/tv/${tv.id}`} key={tv.id}>
            <SwiperSlide>
              <img
                src={`https://image.tmdb.org/t/p/w342/${tv.poster_path}`}
                alt={tv.name}
              />
              <p>{tv.original_name}</p>
            </SwiperSlide>
          </Link>
        ))}
      </Swiper>
    </div>
  );
}

export default TrendingSeries;
