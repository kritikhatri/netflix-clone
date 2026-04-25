import { useState, useEffect } from "react";

 
const API_KEY = "f32dd59daa91e44dcaecf8b04a864170"; 
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/original";
 
const SHOW_ID = 278573; 
 
export default function Banner() {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
  
    fetch(`${BASE_URL}/tv/${SHOW_ID}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch show:", err);
        setLoading(false);
      });
  }, []);
  if (loading) return <div className="banner banner--loading" />;
  if (!show) return null;
 
  const title = show.name;
  const backdrop = `${IMG_URL}${show.backdrop_path}`;
  const rating = show.vote_average?.toFixed(1);
  const year = (show.first_air_date || "").slice(0, 4);
  const seasons = show.number_of_seasons;
  const genres = show.genres?.map((g) => g.name).join(" • ");
 
  return (
    <div className="banner" style={{ backgroundImage: `url(${backdrop})` }}>
 
      <div className="banner__overlay" />
      <div className="banner__overlay-bottom" />
 
      <div className="banner__content">
 
     
        <div className="banner__badge">
          <span className="banner__badge-n">N</span>
          Series
        </div>
 
  
        <h1 className="banner__title">{title}</h1>
 
  
        <div className="banner__meta">
          <span className="banner__rating">⭐ {rating}</span>
          <span className="banner__dot">•</span>
          <span>{year}</span>
          {seasons && (
            <>
              <span className="banner__dot">•</span>
              <span>{seasons} Season{seasons > 1 ? "s" : ""}</span>
            </>
          )}
        </div>
 
       
        {genres && <p className="banner__genres">{genres}</p>}
 
    
        <p className="banner__overview">{show.overview}</p>
 

        <div className="banner__buttons">
          <button className="banner__btn banner__btn--play">
            <PlayIcon />
            Play
          </button>
          <button className="banner__btn banner__btn--info">
            <InfoIcon />
            More Info
          </button>
        </div>
 
      </div>
      <div className="banner__age-rating">U/A 16+</div>
 
    </div>
  );
}
 
function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}
 
function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
 
