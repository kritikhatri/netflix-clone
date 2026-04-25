import { useState, useEffect } from 'react';
import Navbar    from '../../components/Navbar/Navbar';
import Banner    from '../../components/Banner/Banner';
import MovieRow  from '../../components/MovieRow/MovieRow';
import Footer    from '../../components/Footer/Footer';
import { endpoints } from '../../services/tmdb';
import './Home.css';

// All movie row sections with their TMDB endpoints
const ROWS = [
  { id: 'trending',    title: '🔥 Trending Now',         endpoint: endpoints.trending,         isLarge: true },
  { id: 'originals',  title: '🎬 Netflix Originals',     endpoint: endpoints.netflixOriginals, isLarge: true },
  { id: 'popular',    title: '👑 Popular on Netflix',     endpoint: endpoints.popular },
  { id: 'top_rated',  title: '⭐ Top Rated',              endpoint: endpoints.topRated },
  { id: 'action',     title: '💥 Action & Adventure',     endpoint: endpoints.actionMovies },
  { id: 'horror',     title: '👻 Horror',                 endpoint: endpoints.horrorMovies },
  { id: 'comedy',     title: '😂 Comedy',                 endpoint: endpoints.comedyMovies },
  { id: 'romance',    title: '💕 Romance',                endpoint: endpoints.romanceMovies },
  { id: 'tv',         title: '📺 TV Shows',               endpoint: endpoints.tvShows },
  { id: 'docs',       title: '🎙 Documentaries',          endpoint: endpoints.documentaries },
];

const Home = () => {
  const [showIntro, setShowIntro] = useState(
    () => !sessionStorage.getItem('intro_shown')
  );

  useEffect(() => {
    if (showIntro) {
      const t = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem('intro_shown', '1');
      }, 2600);
      return () => clearTimeout(t);
    }
  }, [showIntro]);

  if (showIntro) {
    return (
      <div className="intro-screen">
        <svg className="intro-logo" viewBox="0 0 111 30" aria-label="Netflix">
          <path
            d="M105.06 0l-9.44 26.43L86.18 0H76.6v30h7.14V7.82L93.9 30h7.5l10.16-22.18V30H119V0zM55.84 0v30h7.13V16.76L74.66 30h9.1L71.3 13.41 83.1 0h-8.9L63.13 13.57V0zm-28.37 7.08V30h7.14V7.08h10.17V0H17.3v7.08zM0 0v30h21.45v-7.08H7.13V0z"
            fill="#E50914"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="home">
      <Navbar />
      <Banner />

      <main className="home__rows">
        {ROWS.map(row => (
          <MovieRow
            key={row.id}
            title={row.title}
            endpoint={row.endpoint}
            isLarge={row.isLarge}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default Home;