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
