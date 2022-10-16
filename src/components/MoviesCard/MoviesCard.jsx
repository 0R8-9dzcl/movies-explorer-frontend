import { Route } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({
  movie, saveMovie, checkSaved, deleteMovie,
}) {
  // рандомный активатор лайков
  const isSaved = checkSaved(movie);
  const transDuration = () => {
    const hour = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    return `${hour}ч${minutes}м`;
  };
  const kickToTrailer = () => {
    window.open(movie.trailerLink, '_blank').focus();
  };
  const onClickSave = () => (isSaved ? deleteMovie(movie) : saveMovie(movie));
  return (
    <li className="movie">
      <button className="button movie__trailer" type="button" onClick={kickToTrailer}>
        <img src={movie.image} alt={movie.nameRU} className="movie__img" />
      </button>
      <div className="movie__container">
        <h2 className="movie__title">{movie.nameRU}</h2>
        <p className="movie__duration">{transDuration()}</p>
        <Route path="/movies">
          <button
            type="button"
            aria-label="сохр. фильм"
            onClick={onClickSave}
            className={`button movie__saved${isSaved ? ' movie__saved_type_active' : ''}`}
          />
        </Route>
        <Route path="/saved-movies">
          <button
            type="button"
            aria-label="сохр. фильм"
            onClick={onClickSave}
            className="button movie__saved movie__saved_type_delete"
          />
        </Route>
      </div>
    </li>
  );
}
export default MoviesCard;
