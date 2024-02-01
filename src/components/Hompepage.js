// Homepage.js

import React, { useState, useEffect } from 'react';
import './Homepage.css';
import Top from './Top';
import tmdbApi from '../Api/tmdbApi';
import SearchResults from './SearchResults.js';
import TopTrending from './Top-Trending.js';

function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      // Fetch both movies and TV series based on the search query
      tmdbApi
        .search('movie', searchQuery, { /* additional search parameters if needed */ })
        .then((movieResponse) => {
          // Fetch TV series as well
          tmdbApi.search('tv', searchQuery, { /* additional search parameters if needed */ })
            .then((tvResponse) => {
              // Combine movie and TV series results
              setSearchResults([...movieResponse.results, ...tvResponse.results]);
            })
            .catch((tvError) => {
              console.error('Error fetching TV series search results:', tvError);
            });
        })
        .catch((movieError) => {
          console.error('Error fetching movie search results:', movieError);
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
        <SearchResults SearchResults={searchResults} />
      ) : (
        <>
          <TopTrending />
        </>
      )}
    </div>
  );
}

export default Homepage; 
