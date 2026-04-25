import { useState, useEffect } from 'react';
import { fetchMovies } from '../services/tmdb';

/**
 * Hook to fetch a list of movies from a TMDB endpoint.
 * Returns { movies, loading, error }
 */
const useMovies = (endpoint) => {
  const [movies,  setMovies]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    let cancelled = false; // prevent state update on unmounted component

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await fetchMovies(endpoint);
        if (!cancelled) setMovies(results);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [endpoint]);

  return { movies, loading, error };
};

export default useMovies;