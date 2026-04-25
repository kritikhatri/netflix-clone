import axios from 'axios';

// Base axios instance with default config
const tmdb = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US',
  },
});

// ── Endpoint definitions ──────────────────────────────────────────
export const endpoints = {
  // Home page rows
  trending:        '/trending/all/week',
  netflixOriginals: '/discover/tv?with_networks=213',
  topRated:        '/movie/top_rated',
  actionMovies:    '/discover/movie?with_genres=28',
  comedyMovies:    '/discover/movie?with_genres=35',
  horrorMovies:    '/discover/movie?with_genres=27',
  romanceMovies:   '/discover/movie?with_genres=10749',
  documentaries:   '/discover/movie?with_genres=99',
  popular:         '/movie/popular',
  tvShows:         '/tv/popular',

  // Individual movie/show
  movieDetails:  (id)     => `/movie/${id}`,
  tvDetails:     (id)     => `/tv/${id}`,
  movieVideos:   (id)     => `/movie/${id}/videos`,
  tvVideos:      (id)     => `/tv/${id}/videos`,
  movieCredits:  (id)     => `/movie/${id}/credits`,
  similar:       (id, t)  => `/${t}/${id}/similar`,

  // Search
  search: (query) => `/search/multi?query=${encodeURIComponent(query)}`,
};

// ── Fetch helpers ─────────────────────────────────────────────────

/** Fetch a full page of movies from an endpoint */
export const fetchMovies = async (endpoint) => {
  try {
    const { data } = await tmdb.get(endpoint);
    return data.results || [];
  } catch (err) {
    console.error('TMDB fetch error:', err.message);
    return [];
  }
};

/** Search for movies/shows by query string */
export const searchMovies = async (query) => {
  if (!query.trim()) return [];
  try {
    const { data } = await tmdb.get(endpoints.search(query));
    return data.results || [];
  } catch (err) {
    console.error('Search error:', err.message);
    return [];
  }
};

/** Get trailer video key (YouTube) for a movie or TV show */
export const getTrailerKey = async (id, mediaType = 'movie') => {
  try {
    const ep = mediaType === 'tv' ? endpoints.tvVideos(id) : endpoints.movieVideos(id);
    const { data } = await tmdb.get(ep);
    const trailer = data.results?.find(
      v => v.type === 'Trailer' && v.site === 'YouTube'
    ) || data.results?.[0];
    return trailer?.key || null;
  } catch {
    return null;
  }
};

/** Get full movie/show details */
export const getDetails = async (id, mediaType = 'movie') => {
  try {
    const ep = mediaType === 'tv' ? endpoints.tvDetails(id) : endpoints.movieDetails(id);
    const { data } = await tmdb.get(ep);
    return data;
  } catch {
    return null;
  }
};

/** Get similar movies/shows */
export const getSimilar = async (id, mediaType = 'movie') => {
  try {
    const { data } = await tmdb.get(endpoints.similar(id, mediaType));
    return data.results?.slice(0, 12) || [];
  } catch {
    return [];
  }
};

// Image helpers
export const imgURL    = (path) => `${import.meta.env.VITE_IMAGE_BASE_URL}${path}`;
export const backdropURL = (path) => `${import.meta.env.VITE_TMDB_BACKDROP_URL}${path}`;

export default tmdb;