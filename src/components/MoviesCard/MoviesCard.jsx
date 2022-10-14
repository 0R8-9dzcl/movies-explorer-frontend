import './MoviesCard.css';

function MoviesCard({
  movie, imgUrl, title, duration, pathname,
}) {
  // рандомный активатор лайков
  const isLiked = () => {
    if (Math.floor(Math.random() * 10) < 5) {
      return ' movie__saved_type_active';
    }
    return '';
  };
  const transDuration = () => {
    const hour = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hour}ч${minutes}м`;
  };
  const kickToTrailer = () => {
    window.open(movie.trailerLink, '_blank').focus();
  };
  return (
    <li className="movie">
      <button className="button movie__trailer" type="button" onClick={kickToTrailer}>
        <img src={imgUrl} alt={title} className="movie__img" />
      </button>
      <div className="movie__container">
        <h2 className="movie__title">{title}</h2>
        <p className="movie__duration">{transDuration()}</p>
        <button
          type="button"
          aria-label="сохр. фильм"
          className={`button movie__saved${pathname === '/movies'
            ? isLiked() : ' movie__saved_type_delete'}`}
        />
      </div>
    </li>
  );
}
export default MoviesCard;
