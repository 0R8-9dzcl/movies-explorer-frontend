import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ movies }) {
  return (
    <main>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList movies={movies} />
    </main>
  );
}
export default SavedMovies;
