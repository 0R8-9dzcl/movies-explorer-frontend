import './MoviesCardList.css';
import { Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  movies, pathname, sortPhrase, saveMovie, checkSaved, deleteMovie,
}) {
  const sliceMovies = movies.slice(0, 16);
  return (
    <section className="movies">
      <div className={`movies__empty${
        movies.length === 0 ? ' movies__empty_type_visible' : ''
      }`}
      >
        <p className="movies__empty__text">
          {
            (pathname === '/saved-movies' && 'Нет сохранённых фильмов')
            || (movies.length === 0 && `Фильмы по запросу '${sortPhrase}' не найдены`)
          }
        </p>
      </div>
      <ul className={`movies__list${
        movies.length === 0 ? '' : ' movies__list_type_visible'
      }`}
      >
        {
          sliceMovies.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.movieId}
              pathname={pathname}
              saveMovie={saveMovie}
              checkSaved={checkSaved}
              deleteMovie={deleteMovie}
            />
          ))
        }
      </ul>
      <div className="movies__more">
        <Route path="/movies">
          { movies < 1 && <button type="button" className="button movies__more-button">Ещё</button>}
        </Route>
      </div>
    </section>
  );
}
export default MoviesCardList;
