import './SearchForm.css';

function SearchForm({
  allMovies, onCheckBox, shortCheckbox,
  onSort, sortPhrase, sortMovie, rememberSearch,
}) {
  const handleCheckbox = (e) => {
    onCheckBox(e);
    sortMovie(allMovies, rememberSearch);
  };
  const handleSortInput = (e) => {
    onSort(e);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    sortMovie(allMovies, rememberSearch);
  };
  return (
    <section className="search" onSubmit={handleSearch}>
      <form className="search__form" name="search">
        <input placeholder="Фильм" name="movie" type="text" onChange={handleSortInput} value={sortPhrase} className="search__input" required />
        <button type="submit" name="submit" disabled={sortPhrase.length < 1} className="button search__button">Поиск</button>
        <label className="search__label" htmlFor="short">
          <input
            className="search__short-checkbox"
            type="checkbox"
            disabled={sortPhrase.length < 1 || allMovies < 1}
            onChange={handleCheckbox}
            name="short"
            id="short"
            noValidate
            checked={shortCheckbox}
          />
          <span className="search__short-span">Короткометражки</span>
        </label>
      </form>
    </section>
  );
}

export default SearchForm;
