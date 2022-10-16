import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  allMovies, movies, pathname, onCheckBox, shortCheckbox,
  onSort, sortMovie, sortPhrase, saveMovie, deleteMovie, checkSaved,
}) {
  return (
    <main>
      <SearchForm
        allMovies={allMovies}
        onCheckBox={onCheckBox}
        shortCheckbox={shortCheckbox}
        onSort={onSort}
        sortMovie={sortMovie}
        sortPhrase={sortPhrase}
      />
      <MoviesCardList
        movies={movies}
        pathname={pathname}
        saveMovie={saveMovie}
        checkSaved={checkSaved}
        deleteMovie={deleteMovie}
      />
    </main>
  );
}
export default SavedMovies;
