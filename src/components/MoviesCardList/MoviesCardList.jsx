import './MoviesCardList.css';
import { Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, pathname }) {
  const sliceMovies = movies.movies.slice(0, 16);
  return (
    <section className="movies">
      <div className={`movies__empty${
        movies.isEmpty ? ' movies__empty_type_visible' : ''
      }`}
      >
        <p className="movies__empty__text">{movies.text}</p>
      </div>
      <ul className={`movies__list${
        movies.isEmpty ? '' : ' movies__list_type_visible'
      }`}
      >
        {
          sliceMovies.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.movieId}
              imgUrl={movie.image}
              title={movie.nameRU}
              duration={movie.duration}
              pathname={pathname}
            />
          ))
        }
      </ul>
      <div className="movies__more">
        <Route path="/movies">
          { !movies.isEmpty && <button type="button" className="button movies__more-button">Ещё</button>}
        </Route>
      </div>
    </section>
  );
}
export default MoviesCardList;
