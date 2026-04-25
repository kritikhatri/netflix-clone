export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-black text-white fixed w-full z-50">
      <h1 className="text-2xl font-bold text-red-600">NETFLIX</h1>
      <div className="space-x-4 hidden md:flex">
        <span>Home</span>
        <span>TV Shows</span>
        <span>Movies</span>
        <span>My List</span>
      </div>
    </div>
  );
}
