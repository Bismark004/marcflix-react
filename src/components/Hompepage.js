import React, { useState, useEffect } from 'react';
import './Homepage.css';
import Trending from './TrendingMovies';
import Top from './Top';
import TopRated from './TopRatedMovies.js';
import TrendingSeries from './TrendingSeries.js';
import TopRatedSeries from './TopRatedSeries.js';
import tmdbApi from '../Api/tmdbApi';
import { Link } from 'react-router-dom';


function Homepage(  { movie }) {
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
        <div className="search-results">
          {filteredResults.map((movie) => (
            <Link to={`/movie/${movie.id}`}>
            <div className='movie-grid' key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
            </Link>
          ))}
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
