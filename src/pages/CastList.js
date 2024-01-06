import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../Api/tmdbApi'; // Update the path as needed

const CastList = (props) => {
  const { category } = useParams();

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const response = await tmdbApi.credits(category, props.id);
        setCasts(response.cast.slice(0, 5));
      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    };

    getCredits();
  }, [category, props.id]);

  return (
    <div className="casts">
      {casts.map((item, i) => (
        <div key={i} className="casts__item">
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.profile_path})`,
            }}
          ></div>
          <p className="casts__item__name">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
