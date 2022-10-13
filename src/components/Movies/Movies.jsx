import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
  movies, allMovies, pathname, onSearch, setSearchedMovies,
  onCheckBox, shortCheckbox, onSort, sortInput, preloader,
}) {
  return (
    <main>
      <SearchForm
        allMovies={allMovies}
        onSearch={onSearch}
        onCheckBox={onCheckBox}
        shortCheckbox={shortCheckbox}
        onSort={onSort}
        sortInput={sortInput}
        setSearchedMovies={setSearchedMovies}
      />
      {preloader ? <Preloader /> : <MoviesCardList movies={movies} pathname={pathname} />}
    </main>
  );
}
export default Movies;
