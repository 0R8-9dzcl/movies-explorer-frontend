import './SearchForm.css';

function SearchForm({
  onSearch, allMovies, onCheckBox, shortCheckbox, onSort, sortPhrase, sortMovie,
}) {
  const handleCheckbox = (e) => {
    onCheckBox(e);
  };
  const handleSortInput = (e) => {
    onSort(e);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (allMovies.isEmpty) {
      onSearch();
    }
    sortMovie(allMovies);
  };
  return (
    <section className="search" onSubmit={handleSearch}>
      <form className="search__form" name="search">
        <input placeholder="Фильм" name="movie" type="text" onChange={handleSortInput} value={sortPhrase} className="search__input" required />
        <button type="submit" name="submit" className="button search__button">Поиск</button>
        <label className="search__label" htmlFor="short">
          <input className="search__short-checkbox" type="checkbox" onChange={handleCheckbox} name="short" id="short" checked={shortCheckbox} />
          <span className="search__short-span">Короткометражки</span>
        </label>
      </form>
    </section>
  );
}

export default SearchForm;
