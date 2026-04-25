import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imgURL } from '../../services/tmdb';
import { useList } from '../../context/ListContext';
import './MovieCard.css';

const MovieCard = ({ movie, isLarge = false }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { isInList, addToList, removeFromList } = useList();

  const title      = movie.title || movie.name || 'Unknown';
  const posterPath = movie.poster_path || movie.backdrop_path;
  const mediaType  = movie.media_type || (movie.title ? 'movie' : 'tv');
  const inList     = isInList(movie.id);
  const rating     = movie.vote_average?.toFixed(1);
  const year       = (movie.release_date || movie.first_air_date)?.slice(0, 4);

  if (!posterPath) return null;

  return (
    <div
      className={`card ${isLarge ? 'card--large' : ''} ${hovered ? 'card--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Poster image */}
      <div className="card__poster-wrap">
        <img
          className="card__poster"
          src={imgURL(posterPath)}
          alt={title}
          loading="lazy"
        />

        {/* Hover overlay */}
        {hovered && (
          <div className="card__overlay">
            <div className="card__info">
              <p className="card__title">{title}</p>
              <div className="card__meta">
                {rating && <span className="card__rating">⭐ {rating}</span>}
                {year   && <span className="card__year">{year}</span>}
              </div>
              <p className="card__overview">
                {movie.overview?.slice(0, 100)}
                {movie.overview?.length > 100 ? '...' : ''}
              </p>
            </div>

            <div className="card__actions">
              {/* Play */}
              <button
                className="card__btn card__btn--play"
                onClick={() => navigate(`/watch/${movie.id}?type=${mediaType}`)}
                aria-label={`Play ${title}`}
                title="Play"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </button>

              {/* My List toggle */}
              <button
                className={`card__btn card__btn--list ${inList ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  inList ? removeFromList(movie.id) : addToList(movie);
                }}
                aria-label={inList ? 'Remove from My List' : 'Add to My List'}
                title={inList ? 'Remove from My List' : 'Add to My List'}
              >
                {inList ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                )}
              </button>

              {/* More info */}
              <button
                className="card__btn card__btn--info"
                onClick={() => navigate(`/watch/${movie.id}?type=${mediaType}`)}
                aria-label="More Info"
                title="More Info"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;