import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <section className="nav-land">
      <nav className="nav-land__container">
        <ul className="nav-land__list">
          <li>
            <Link
              className="link nav-land__link"
              to={{ pathname: '/', hash: '#about-project' }}
            >
              О проекте
            </Link>
          </li>
          <li>
            <Link
              className="link nav-land__link"
              to={{ pathname: '/', hash: '#techs' }}
            >
              Технологии
            </Link>
          </li>
          <li>
            <Link
              className="link nav-land__link"
              to={{ pathname: '/', hash: '#about-me' }}
            >
              Студент
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
export default NavTab;
