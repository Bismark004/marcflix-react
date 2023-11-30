import React, { useState, useEffect } from 'react';
import './Homepage.css';
import Trending from './TrendingMovies';
import Top from './Top';
import TopRated from './TopRatedMovies.js';
import TrendingSeries from './TrendingSeries.js';
import TopRatedSeries from './TopRatedSeries.js';
import tmdbApi from '../Api/tmdbApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      // Fetch movies based on the search query
      tmdbApi
        .search('movie', { query: searchQuery })
        .then((response) => {
          setSearchResults(response.results);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [searchQuery]);

  // Handle search query changes
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className='homepage'>
      <Top onSearchChange={handleSearchChange} />
      {searchQuery ? (
        <div className="search-results">
          <h1>Search Results</h1>
          <Swiper spaceBetween={100} slidesPerView={4} navigation>
            {searchResults.map((movie) => (
              <SwiperSlide key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <>
          <Trending />
          <TopRated />
          <TrendingSeries />
          <TopRatedSeries />
        </>
      )}
    </div>
  );
}

export default Homepage;
