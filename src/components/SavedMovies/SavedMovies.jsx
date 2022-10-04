import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ movies, pathname }) {
  return (
    <main>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList movies={movies} pathname={pathname} />
    </main>
  );
}
export default SavedMovies;
