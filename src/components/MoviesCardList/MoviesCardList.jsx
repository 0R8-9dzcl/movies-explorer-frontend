/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './MoviesCardList.css';
import { Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import useWidth from '../../CustomHoocks/WidthListener';
import params from '../../utils/params';

function MoviesCardList({
  allMovies, movies, pathname, saveMovie, checkSaved, deleteMovie,
}) {
  const screenWidth = useWidth();
  const [moviesQuantity, setMoviesQuanity] = useState(12); // количество фильмов
  const [moreMovies, setMoreMovies] = useState(3);
  const [sliceMovies, setSliceMovies] = useState([]);

  useEffect(() => {
    if (pathname === '/movies') {
      if ((screenWidth) >= params.widthParams.desktop.width) {
        setMoviesQuanity(params.widthParams.desktop.startCards);
        setMoreMovies(params.widthParams.desktop.plusCard);
      }
      if (screenWidth <= params.widthParams.desktop.width
        && screenWidth > params.widthParams.mobile.width) {
        setMoviesQuanity(params.widthParams.tablet.startCards);
        setMoreMovies(params.widthParams.tablet.plusCard);
      }
      if (screenWidth <= params.widthParams.mobile.width) {
        setMoviesQuanity(params.widthParams.mobile.startCards);
        setMoreMovies(params.widthParams.mobile.plusCard);
      }
    }
    if (pathname === '/saved-movies') {
      setMoviesQuanity(movies.length);
    }
  }, [pathname, movies, screenWidth]);
  const getMoreCard = () => ((moviesQuantity < movies.length)
    ? setMoviesQuanity(moviesQuantity + moreMovies) : movies.length);
  useEffect(() => {
    setSliceMovies(movies.slice(0, moviesQuantity));
  }, [movies, moviesQuantity, moreMovies]);
  return (
    <section className="movies">
      <div className={`movies__empty${
        movies.length === 0 ? ' movies__empty_type_visible' : ''
      }`}
      >
        <Route path="/movies">
          <p className="movies__empty__text">
            {
              ((movies.length === 0 && allMovies.length === 0) && 'Нужно ввести ключевое слово')
              || ((movies.length === 0 && allMovies.length > 0)
              && 'Фильмы по вашему запросу не найдены')
            }
          </p>
        </Route>
        <Route path="/saved-movies">
          <p className="movies__empty__text">
            {
                (allMovies.length === 0 && 'Нет сохранённых фильмов')
                || ((movies.length === 0 && allMovies.length > 0) && 'Фильмы по вашему запросу не найдены')
              }
          </p>
        </Route>
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
          { (movies.length >= moviesQuantity) && <button type="button" onClick={getMoreCard} className="button movies__more-button">Ещё</button>}
        </Route>
      </div>
    </section>
  );
}
export default MoviesCardList;
