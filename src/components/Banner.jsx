import { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";

export default function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        // Set a random movie from the results
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
        return request;
      } catch (error) {
        console.error("Error fetching TMDB data:", error);
      }
    }
    fetchData();
  }, []);

  // Helper function to truncate long descriptions
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="relative h-[60vh] bg-cover bg-center flex flex-col justify-center px-6 text-white"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie?.backdrop_path ? `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")` : "url('https://via.placeholder.com/1200x600')",
        backgroundPosition: "center center",
      }}
    >
      <div className="relative z-10 pt-36">
        <h1 className="text-4xl font-bold mb-4 drop-shadow-md">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="space-x-3 mb-4">
          <button className="cursor-pointer bg-[rgba(51,51,51,0.5)] hover:bg-[#e6e6e6] hover:text-black transition-all text-white font-bold px-8 py-2 rounded">
            Play
          </button>
          <button className="cursor-pointer bg-[rgba(51,51,51,0.5)] hover:bg-[#e6e6e6] hover:text-black transition-all text-white font-bold px-8 py-2 rounded">
            My List
          </button>
        </div>
        <h1 className="w-[45rem] leading-snug pt-4 text-sm max-w-md drop-shadow-md font-medium">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 w-full h-[7.4rem] bg-gradient-to-t from-[#111] to-transparent pointer-events-none" />
    </header>
  );
}