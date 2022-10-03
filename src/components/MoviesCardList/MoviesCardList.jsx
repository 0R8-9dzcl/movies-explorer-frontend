import './MoviesCardList.css';
import { Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
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
            />
          ))
        }
      </ul>
      <Route path="/movies">
        <div className="movies__more">
          <button type="button" className="button movies__more-button">Ещё</button>
        </div>
      </Route>
    </section>
  );
}
export default MoviesCardList;
