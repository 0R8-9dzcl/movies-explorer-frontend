import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
  movies, allMovies, pathname, saveAllMovies, sortMovie, saveMovie, deleteMovie,
  onCheckBox, shortCheckbox, onSort, sortPhrase, preloader, checkSaved,
}) {
  return (
    <main>
      <SearchForm
        saveAllMovies={saveAllMovies}
        allMovies={allMovies}
        onCheckBox={onCheckBox}
        shortCheckbox={shortCheckbox}
        onSort={onSort}
        sortPhrase={sortPhrase}
        sortMovie={sortMovie}
      />
      {preloader ? <Preloader />
        : (
          <MoviesCardList
            allMovies={allMovies}
            movies={movies}
            pathname={pathname}
            sortPhrase={sortPhrase}
            saveMovie={saveMovie}
            checkSaved={checkSaved}
            deleteMovie={deleteMovie}
          />
        )}
    </main>
  );
}
export default Movies;
