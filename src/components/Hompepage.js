import React, { useState, useEffect } from 'react';
import './Homepage.css';
import Top from './Top';
import tmdbApi from '../Api/tmdbApi'
import SearchResults from './SearchResults.js';
import TopRated from './TopRatedMovies.js';
import Trending from './TrendingMovies.js';
import TopRatedSeries from './TopRatedSeries.js';
import TrendingSeries from './TrendingSeries.js';




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

  const filteredResults = searchResults.filter((movie) => movie.poster_path);

  return (
    <div className='homepage'>
      <Top handleSearchQuery={handleSearchChange} />
      {searchQuery ? (
        <SearchResults filteredResults={filteredResults}/>
       
      ) : (
        <>
            <Trending/>
            <TopRated/>
            <TopRatedSeries/>
            <TrendingSeries/>
            
        </>
      )}
    </div>
  );
}

export default Homepage;
