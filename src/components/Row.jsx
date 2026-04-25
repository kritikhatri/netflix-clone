const movies = [
  { id: 1, title: "Inception", image: "https://via.placeholder.com/300x170" },
  { id: 2, title: "Stranger Things", image: "https://via.placeholder.com/300x170" },
  { id: 3, title: "Breaking Bad", image: "https://via.placeholder.com/300x170" },
  { id: 4, title: "The Witcher", image: "https://via.placeholder.com/300x170" },
  { id: 5, title: "Interstellar", image: "https://via.placeholder.com/300x170" },
];

export default function Row({ title }) {
  return (
    <div className="px-6 mt-6">
      <h2 className="text-white text-xl mb-2">{title}</h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={movie.image}
            alt={movie.title}
            className="w-[300px] rounded hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}
