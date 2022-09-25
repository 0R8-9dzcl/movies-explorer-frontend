import './NavTab.css';

function NavTab() {
  return (
    <section className="nav-land">
      <nav className="nav-land__container">
        <ul className="nav-land__list">
          <li>
            <a className="nav-land__link" href="#about-project">О проекте</a>
          </li>
          <li>
            <a className="nav-land__link" href="#techs">Технологии</a>
          </li>
          <li>
            <a className="nav-land__link" href="#about-me">Студент</a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
export default NavTab;
