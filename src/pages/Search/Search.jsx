import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import MovieCard from '../../components/MovieCard/MovieCard';
import Navbar    from '../../components/Navbar/Navbar';
import './Search.css';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const { results, loading } = useSearch(query);

  // Sync URL param with input
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
  }, [searchParams]);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="search-page">
      <Navbar />

      <div className="search-page__inner">
        {/* Search input */}
        <div className="search-page__bar-wrap">
          <div className="search-page__bar">
            <svg className="search-page__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search for movies, shows, actors..."
              value={query}
              onChange={handleChange}
              className="search-page__input"
              autoFocus
            />
            {query && (
              <button className="search-page__clear" onClick={() => { setQuery(''); setSearchParams({}); }}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {loading && (
          <div className="search-page__status">
            <div className="watch-page__spinner" />
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <div className="search-page__empty">
            <p className="search-page__empty-title">No results for "{query}"</p>
            <p className="search-page__empty-hint">
              Try a different title, genre, or actor.
            </p>
          </div>
        )}

        {!loading && !query && (
          <div className="search-page__prompt">
            <p>Start typing to search Netflix titles...</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            <p className="search-page__count">
              {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </p>
            <div className="search-page__grid">
              {results.map(m => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;