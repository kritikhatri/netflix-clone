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
