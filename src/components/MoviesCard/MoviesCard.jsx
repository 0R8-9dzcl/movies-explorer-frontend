import './MoviesCard.css';

function Movie({ imgUrl, title, duration }) {
  const transDuration = () => {
    const hour = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hour}ч${minutes}м`;
  };
  return (
    <li className="movie">
      <img src={`https://api.nomoreparties.co/${imgUrl}`} alt={title} className="movie__img" />
      <div className="movie__container">
        <h2 className="movie__title">{title}</h2>
        <p className="movie__duration">{transDuration()}</p>
        <button type="button" aria-label="сохр. фильм" className="movie__saved" />
      </div>
    </li>
  );
}
export default Movie;
