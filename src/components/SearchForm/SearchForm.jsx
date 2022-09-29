import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form" name="search">
        <input placeholder="Фильм" name="movie" type="text" className="search__input" />
        <button type="submit" name="submit" className="search__button">Поиск</button>
      </form>
      <label className="search__label" htmlFor="short">
        <input className="search__short-checkbox" type="checkbox" name="short" id="short" />
        <span className="search__short-span">Короткометражки</span>
      </label>
    </section>
  );
}

export default SearchForm;