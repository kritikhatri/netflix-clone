import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, endpoints, backdropURL } from '../../services/tmdb';
import { useList } from '../../context/ListContext';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie]   = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isInList, addToList, removeFromList } = useList();

  useEffect(() => {
    const load = async () => {
      const movies = await fetchMovies(endpoints.trending);
      // Pick a random movie from top 10 for variety
      const pick = movies[Math.floor(Math.random() * Math.min(10, movies.length))];
      setMovie(pick);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="banner banner--skeleton" />;
  if (!movie)  return null;

  const title       = movie.title || movie.name || 'Unknown';
  const description = movie.overview?.slice(0, 200) + (movie.overview?.length > 200 ? '...' : '');
  const backdropSrc = backdropURL(movie.backdrop_path);
  const mediaType   = movie.media_type || 'movie';
  const inList      = isInList(movie.id);

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${backdropSrc})` }}
      role="banner"
    >
      {/* Overlays for depth */}
      <div className="banner__overlay-bottom" />
      <div className="banner__overlay-side" />

      <div className="banner__content">
        {/* Genre tags */}
        <div className="banner__tags">
          {movie.genre_ids?.slice(0, 3).map(id => (
            <span key={id} className="banner__tag">
              {genreMap[id] || 'Drama'}
            </span>
          ))}
        </div>

        <h1 className="banner__title">{title}</h1>

        {/* Rating + Year */}
        <div className="banner__meta">
          <span className="banner__rating">
            ⭐ {movie.vote_average?.toFixed(1)}
          </span>
          <span className="banner__year">
            {(movie.release_date || movie.first_air_date)?.slice(0, 4)}
          </span>
          {movie.adult && <span className="banner__badge">18+</span>}
        </div>

        <p className="banner__description">{description}</p>

        <div className="banner__buttons">
          <button
            className="banner__btn banner__btn--play"
            onClick={() => navigate(`/watch/${movie.id}?type=${mediaType}`)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Play
          </button>

          <button
            className={`banner__btn banner__btn--list ${inList ? 'banner__btn--list--active' : ''}`}
            onClick={() => inList ? removeFromList(movie.id) : addToList(movie)}
          >
            {inList ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                In My List
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                My List
              </>
            )}
          </button>

          <button
            className="banner__btn banner__btn--info"
            onClick={() => navigate(`/watch/${movie.id}?type=${mediaType}`)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

// TMDB genre ID map (partial)
const genreMap = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime',  99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
  53: 'Thriller', 10752: 'War', 37: 'Western',
};

export default Banner;