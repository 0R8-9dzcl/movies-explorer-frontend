import './MoviesCardList.css';
import { Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, pathname }) {
  const sliceMovies = movies.slice(0, 16);
  return (
    <section className="movies">
      <ul className="movies__list">
        {
          sliceMovies.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id}
              imgUrl={movie.image.url}
              title={movie.nameRU}
              duration={movie.duration}
              pathname={pathname}
            />
          ))
        }
      </ul>
      <div className="movies__more">
        <Route path="/movies">
          <button type="button" className="button movies__more-button">Ещё</button>
        </Route>
      </div>
    </section>
  );
}
export default MoviesCardList;
