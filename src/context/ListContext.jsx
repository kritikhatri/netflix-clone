import { createContext, useContext, useState, useEffect } from 'react';

const ListContext = createContext(null);

/** Manages the user's "My List" using localStorage persistence */
export const ListProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);

  // Load saved list on mount
  useEffect(() => {
    const saved = localStorage.getItem('netflix_mylist');
    if (saved) setMyList(JSON.parse(saved));
  }, []);

  // Persist to localStorage whenever list changes
  useEffect(() => {
    localStorage.setItem('netflix_mylist', JSON.stringify(myList));
  }, [myList]);

  const addToList = (movie) => {
    setMyList(prev => {
      if (prev.find(m => m.id === movie.id)) return prev; // no duplicates
      return [...prev, movie];
    });
  };

  const removeFromList = (id) => {
    setMyList(prev => prev.filter(m => m.id !== id));
  };

  const isInList = (id) => myList.some(m => m.id === id);

  return (
    <ListContext.Provider value={{ myList, addToList, removeFromList, isInList }}>
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => {
  const ctx = useContext(ListContext);
  if (!ctx) throw new Error('useList must be inside ListProvider');
  return ctx;
};