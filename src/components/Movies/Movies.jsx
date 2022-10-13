import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
  movies, allMovies, pathname, onSearch, sortMovie,
  onCheckBox, shortCheckbox, onSort, sortInput, preloader,
}) {
  return (
    <main>
      <SearchForm
        onSearch={onSearch}
        allMovies={allMovies}
        onCheckBox={onCheckBox}
        shortCheckbox={shortCheckbox}
        onSort={onSort}
        sortInput={sortInput}
        sortMovie={sortMovie}
      />
      {preloader ? <Preloader /> : <MoviesCardList movies={movies} pathname={pathname} />}
    </main>
  );
}
export default Movies;
