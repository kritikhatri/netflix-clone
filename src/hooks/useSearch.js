import { useState, useEffect } from 'react';
import { searchMovies } from '../services/tmdb';
import useDebounce from './useDebounce';

/**
 * Hook for live search with debouncing.
 */
const useSearch = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    let cancelled = false;

    const run = async () => {
      setLoading(true);
      const data = await searchMovies(debouncedQuery);
      if (!cancelled) {
        setResults(data.filter(r => r.poster_path || r.backdrop_path));
        setLoading(false);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [debouncedQuery]);

  return { results, loading };
};

export default useSearch;