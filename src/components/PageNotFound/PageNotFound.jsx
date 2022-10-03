import './PageNotFound.css';

function PageNotFound() {
  return (
    <main>
      <section className="losted">
        <div className="losted__container">
          <h2 className="losted__title">404</h2>
          <p className="losted__text">Страница не найдена</p>
        </div>
        <button type="button" className="button losted__back">Назад</button>
      </section>
    </main>
  );
}
export default PageNotFound;
