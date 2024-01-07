import React, { useState, useEffect } from 'react';
import tmdbApi from '../Api/tmdbApi';

const VideoList = ({ category, id }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await tmdbApi.getVideos(category, id);
        setVideos(response.results.slice(0, 5));
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    getVideos();
  }, [category, id]);

  return (
    <div className="video-list">
      {videos.map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </div>
  );
};

const Video = ({ item }) => {
  const iframeRef = React.useRef(null);

  useEffect(() => {
    const setIframeHeight = () => {
      const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
      iframeRef.current.setAttribute('height', height);
    };

    setIframeHeight();
    window.addEventListener('resize', setIframeHeight);

    return () => {
      window.removeEventListener('resize', setIframeHeight);
    };
  }, []);

  return (
    <div className="video-item">
      <div className="video-item__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default VideoList;
