import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { getDetails, getTrailerKey, getSimilar, imgURL } from '../../services/tmdb';
import MovieCard from '../../components/MovieCard/MovieCard';
import Navbar    from '../../components/Navbar/Navbar';
import { useList } from '../../context/ListContext';
import './Watch.css';

const Watch = () => {
  const { id }              = useParams();
  const [searchParams]      = useSearchParams();
  const mediaType           = searchParams.get('type') || 'movie';
  const navigate            = useNavigate();

  const [movie,    setMovie]    = useState(null);
  const [trailer,  setTrailer]  = useState(null);
  const [similar,  setSimilar]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [playing,  setPlaying]  = useState(false);

  const { isInList, addToList, removeFromList } = useList();
  const inList = movie && isInList(movie.id);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setPlaying(false);
      const [details, key, sim] = await Promise.all([
        getDetails(id, mediaType),
        getTrailerKey(id, mediaType),
        getSimilar(id, mediaType),
      ]);
      setMovie(details);
      setTrailer(key);
      setSimilar(sim);
      setLoading(false);
    };
    load();
    window.scrollTo(0, 0);
  }, [id, mediaType]);

  if (loading) return (
    <div className="watch-page watch-page--loading">
      <Navbar />
      <div className="watch-page__loader">
        <div className="watch-page__spinner" />
      </div>
    </div>
  );

  if (!movie) return null;

  const title     = movie.title || movie.name;
  const year      = (movie.release_date || movie.first_air_date)?.slice(0, 4);
  const runtime   = movie.runtime ? `${movie.runtime}m` : (movie.episode_run_time?.[0] ? `${movie.episode_run_time[0]}m` : '');
  const genres    = movie.genres?.map(g => g.name).join(', ');
  const cast      = movie.credits?.cast?.slice(0, 5).map(c => c.name).join(', ');

  return (
    <div className="watch-page">
      <Navbar />

      <div className="watch-page__inner">
        {/* Player section */}
        <div className="watch-page__player-wrap">
          {playing && trailer ? (
            <iframe
              className="watch-page__iframe"
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1&controls=1&modestbranding=1`}
              title={`${title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              className="watch-page__thumbnail"
              style={{ backgroundImage: `url(${imgURL(movie.backdrop_path || movie.poster_path)})` }}
            >
              <div className="watch-page__thumbnail-overlay" />
              <button
                className="watch-page__play-btn"
                onClick={() => trailer ? setPlaying(true) : null}
                title={trailer ? 'Play Trailer' : 'No trailer available'}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                {trailer ? 'Play Trailer' : 'No Trailer Available'}
              </button>
            </div>
          )}
        </div>

        {/* Movie details */}
        <div className="watch-page__content">
          <div className="watch-page__meta">
            <h1 className="watch-page__title">{title}</h1>

            <div className="watch-page__info">
              {year     && <span>{year}</span>}
              {runtime  && <span>{runtime}</span>}
              <span className="watch-page__rating">
                ⭐ {movie.vote_average?.toFixed(1)} / 10
              </span>
              {movie.adult && <span className="watch-page__age">18+</span>}
            </div>

            <p className="watch-page__overview">{movie.overview}</p>

            {genres && (
              <p className="watch-page__genres">
                <strong>Genres:</strong> {genres}
              </p>
            )}

            <div className="watch-page__actions">
              <button
                className="watch-page__btn watch-page__btn--play"
                onClick={() => trailer ? setPlaying(true) : null}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Play
              </button>

              <button
                className={`watch-page__btn watch-page__btn--list ${inList ? 'active' : ''}`}
                onClick={() => inList ? removeFromList(movie.id) : addToList(movie)}
              >
                {inList ? '✓ In My List' : '+ My List'}
              </button>
            </div>
          </div>
        </div>

        {/* Similar section */}
        {similar.length > 0 && (
          <section className="watch-page__similar">
            <h2 className="watch-page__similar-title">More Like This</h2>
            <div className="watch-page__similar-grid">
              {similar.map(m => (
                <MovieCard key={m.id} movie={{ ...m, media_type: mediaType }} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Watch;