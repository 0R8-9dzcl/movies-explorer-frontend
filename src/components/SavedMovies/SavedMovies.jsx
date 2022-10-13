import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  movies, pathname, onCheckBox, shortCheckbox, onSort, sortMovie,
}) {
  return (
    <main>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList
        movies={movies}
        pathname={pathname}
        onCheckBox={onCheckBox}
        shortCheckbox={shortCheckbox}
        onSort={onSort}
        sortMovie={sortMovie}
      />
    </main>
  );
}
export default SavedMovies;
