import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Change navbar background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      {/* Left side */}
      <div className="navbar__left">
        <Link to="/" className="navbar__logo">
          {/* SVG Netflix "N" */}
          <svg viewBox="0 0 111 30" className="navbar__logo-svg" aria-label="Netflix">
            <path
              d="M105.06 0l-9.44 26.43L86.18 0H76.6v30h7.14V7.82L93.9 30h7.5l10.16-22.18V30H119V0zM55.84 0v30h7.13V16.76L74.66 30h9.1L71.3 13.41 83.1 0h-8.9L63.13 13.57V0zm-28.37 7.08V30h7.14V7.08h10.17V0H17.3v7.08zM0 0v30h21.45v-7.08H7.13V0z"
              fill="#E50914"
            />
          </svg>
        </Link>

        <ul className="navbar__links">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/search">TV Shows</Link></li>
          <li><Link to="/search">Movies</Link></li>
          <li><Link to="/search">New & Popular</Link></li>
          <li><Link to="/mylist">My List</Link></li>
        </ul>
      </div>

      {/* Right side */}
      <div className="navbar__right">
        {/* Search */}
        <form
          className={`navbar__search ${searchOpen ? 'navbar__search--open' : ''}`}
          onSubmit={handleSearch}
        >
          <button
            type="button"
            className="navbar__icon-btn"
            onClick={() => { setSearchOpen(!searchOpen); searchRef.current?.focus(); }}
            aria-label="Search"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <input
            ref={searchRef}
            type="text"
            placeholder="Titles, people, genres"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="navbar__search-input"
          />
        </form>

        {/* Notifications bell */}
        <button className="navbar__icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>

        {/* Profile dropdown */}
        <div className="navbar__profile" onClick={() => setProfileOpen(!profileOpen)}>
          <div className="navbar__avatar">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <svg
            className={`navbar__caret ${profileOpen ? 'navbar__caret--open' : ''}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>

          {profileOpen && (
            <div className="navbar__dropdown">
              <Link to="/mylist" className="navbar__dropdown-item">My List</Link>
              <Link to="/search" className="navbar__dropdown-item">Search</Link>
              <hr className="navbar__dropdown-divider"/>
              <button className="navbar__dropdown-item" onClick={handleLogout}>
                Sign out of Netflix
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;