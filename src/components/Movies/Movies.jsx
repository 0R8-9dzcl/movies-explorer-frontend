import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movies, pathname }) {
  return (
    <main>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList movies={movies} pathname={pathname} />
    </main>
  );
}
export default Movies;
