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
    const fetchSearchResults = async () => {
      try {
        if (searchQuery) {
          // Fetch both movies and TV series based on the search query
          const [movieResponse, tvResponse] = await Promise.all([
            tmdbApi.search('movie', searchQuery),
            tmdbApi.search('tv', searchQuery)
          ]);

          // Combine movie and TV series results
          setSearchResults([...movieResponse.results, ...tvResponse.results]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  // Handle search query changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='homepage'>
      <Top handleSearchQuery={handleSearchChange} />
      {searchQuery ? (
        <SearchResults searchResults={searchResults} />
      ) : (
        <TopTrending />
      )}
    </div>
  );
}

export default Homepage;
