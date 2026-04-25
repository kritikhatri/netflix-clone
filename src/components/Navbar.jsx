import { useState, useEffect } from "react";

 
const NAV_LINKS = [
  "Home",
  "Shows",
  "Movies",
  "Games",
  "New & Popular",
  "My List",
  "Browse by Languages",
];
 
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
 
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
 

      <div className="navbar__left">
        <span className="navbar__logo">NETFLIX</span>
        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link} className="navbar__link-item">
              <span
                className={`navbar__link ${active === link ? "navbar__link--active" : ""}`}
                onClick={() => setActive(link)}
              >
                {link}
              </span>
            </li>
          ))}
        </ul>
      </div>
 
 
      <div className="navbar__right">
 

        <div className="navbar__search">
          {searchOpen && (
            <input
              autoFocus
              className="navbar__search-input"
              placeholder="Titles, people, genres"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => {
                if (!searchQuery) setSearchOpen(false);
              }}
            />
          )}
          <button
            className="navbar__icon-btn"
            onClick={() => setSearchOpen((prev) => !prev)}
          >
            <SearchIcon />
          </button>
        </div>
 

        <span className="navbar__children-text">Children</span>

        <div className="navbar__bell-wrapper">
          <button className="navbar__icon-btn">
            <BellIcon />
          </button>
          <span className="navbar__badge">3</span>
        </div>
 

        <div className="navbar__avatar-wrapper">
          <div className="navbar__avatar" />
          <span className="navbar__caret">▾</span>
        </div>
 
      </div>
    </nav>
  );
}
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
 
function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth="2" strokeLinecap="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
 
