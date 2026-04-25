import { useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import Skeleton  from '../Skeleton/Skeleton';
import useMovies from '../../hooks/useMovies';
import './MovieRow.css';

const MovieRow = ({ title, endpoint, isLarge = false }) => {
  const { movies, loading } = useMovies(endpoint);
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    const amount = sliderRef.current?.clientWidth * 0.85 || 600;
    sliderRef.current?.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className={`row ${isLarge ? 'row--large' : ''}`}>
      <h2 className="row__title">{title}</h2>

      <div className="row__container">
        {/* Left arrow */}
        <button
          className="row__arrow row__arrow--left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {/* Slider */}
        <div className="row__slider" ref={sliderRef}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} isLarge={isLarge} />
              ))
            : movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} isLarge={isLarge} />
              ))
          }
        </div>

        {/* Right arrow */}
        <button
          className="row__arrow row__arrow--right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default MovieRow;