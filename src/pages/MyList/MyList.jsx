import { useNavigate } from 'react-router-dom';
import { useList } from '../../context/ListContext';
import MovieCard from '../../components/MovieCard/MovieCard';
import Navbar    from '../../components/Navbar/Navbar';
import Footer    from '../../components/Footer/Footer';
import './MyList.css';

const MyList = () => {
  const { myList } = useList();
  const navigate   = useNavigate();

  return (
    <div className="mylist-page">
      <Navbar />

      <div className="mylist-page__inner">
        <h1 className="mylist-page__title">My List</h1>

        {myList.length === 0 ? (
          <div className="mylist-page__empty">
            <div className="mylist-page__empty-icon">🎬</div>
            <h2>Your list is empty</h2>
            <p>Save your favourite shows and movies here.</p>
            <button
              className="mylist-page__browse-btn"
              onClick={() => navigate('/')}
            >
              Browse Titles
            </button>
          </div>
        ) : (
          <>
            <p className="mylist-page__count">
              {myList.length} title{myList.length !== 1 ? 's' : ''} saved
            </p>
            <div className="mylist-page__grid">
              {myList.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyList;