import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Row from "./components/Row";
import "./index.css";

export default function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Banner />
      <Row title="Trending Now" />
      <Row title="Top Rated" />
      <Row title="Action Movies" />
    </div>
  );
}