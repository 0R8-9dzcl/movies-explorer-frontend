// import { useEffect, useState } from 'react';
import './MoviesCardList.css';
import { Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
// import useWidth from '../../CustomHoocks/WidthListener';
// import widthParams from '../../utils/widthParams';

function MoviesCardList({
  allMovies, movies, pathname, sortPhrase, saveMovie, checkSaved, deleteMovie,
}) {
  // const [moviesQuantity, setMoviesQuanity] = useState(0);
  // const [moreMovies, setMoreMovies] = useState(0);
  // const screenWidth = useWidth();
  // useEffect(() => {
  //   if (pathname === '/movies') {
  //     if ((screenWidth) >= widthParams.desktop.width) {
  //       setMoviesQuanity(widthParams.desktop.startCards);
  //       setMoreMovies(widthParams.desktop.plusCard);
  //     }
  //     if (screenWidth <= widthParams.desktop.width && screenWidth > widthParams.mobile.width) {
  //       setMoviesQuanity(widthParams.tablet.startCards);
  //       setMoreMovies(widthParams.tablet.plusCard);
  //     }
  //     if (screenWidth <= widthParams.mobile.width) {
  //       setMoviesQuanity(widthParams.mobile.startCards);
  //       setMoreMovies(widthParams.mobile.plusCard);
  //     }
  //   }
  //   if (pathname === '/saved-movies') {
  //     setMoviesQuanity(movies.length);
  //   }
  // }, [pathname, movies, screenWidth, moreMovies, moviesQuantity]);

  // const getMoreCard = setMoviesQuanity((moviesQuantity + moreMovies) <= movies.length);
  // const sliceMovies = movies.slice(0, moviesQuantity);
  const sliceMovies = movies.slice(0, movies.length);
  return (
    <section className="movies">
      <div className={`movies__empty${
        movies.length === 0 ? ' movies__empty_type_visible' : ''
      }`}
      >
        <Route path="/movies">
          <p className="movies__empty__text">
            {
              ((!sortPhrase && allMovies.length === 0) && 'Нужно ввести ключевое слово')
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
          { movies.length < 1 && <button type="button" className="button movies__more-button">Ещё</button>}
        </Route>
      </div>
    </section>
  );
}
export default MoviesCardList;
