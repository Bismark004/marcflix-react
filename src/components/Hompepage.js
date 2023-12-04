import React, { useState, useEffect } from 'react';
import './Homepage.css';
import Trending from './TrendingMovies';
import Top from './Top';
import TopRated from './TopRatedMovies.js';
import TrendingSeries from './TrendingSeries.js';
import TopRatedSeries from './TopRatedSeries.js';
import tmdbApi from '../Api/tmdbApi';
import Search from './search.js';

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
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='homepage'>
      <Top handleSearchQuery={handleSearchChange} />
      {searchQuery ? (
       <Search searchResults={searchResults}/>
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
