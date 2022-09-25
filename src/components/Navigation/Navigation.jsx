import {
  Link,
  NavLink,
  Route, useLocation,
} from 'react-router-dom';
import './Navigation.css';
import closedBurger from '../../images/nav__close-burger.svg';

function Navigator({ onClose, burgerOpen }) {
  const userRoutes = ['/movies', '/saved-movies', '/profile'];
  const location = useLocation();
  const closeBurger = () => {
    onClose(false);
  };
  return (
    <nav
      className={
        `nav${location.pathname === '/' ? '' : ' nav_type_logged'}${burgerOpen ? ' nav_type_burger-menu' : ''}`
      }
    >
      <Route exact path={userRoutes}>
        <button type="button" className="nav__close-burger" onClick={closeBurger}>
          <img src={closedBurger} alt="кнопка закрытия выпадающего меню" className="nav__close-burger-icon" />
        </button>
        <ul className="nav__films">
          <li>
            <NavLink
              className="nav__film nav__link_type_main"
              activeClassName="nav__link_type_active"
              exact
              to="/"
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav__film"
              activeClassName="nav__link_type_active"
              to="/movies"
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav__film"
              activeClassName="nav__link_type_active"
              to="/saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
      </Route>
      <ul className="nav__list">
        <Route exact path="/">
          <li>
            <Link className="nav__link nav__link_type_land" to="/sign-up">Регистрация</Link>
          </li>
          <li>
            <Link className="nav__link nav__link_type_land nav__link_type_login" to="/sign-in">Войти</Link>
          </li>
        </Route>
        <Route exact path={userRoutes}>
          <li>
            <NavLink
              className="nav__link nav__link_type_profile"
              activeClassName="nav__link_type_active"
              to="/profile"
            >
              Аккаунт
            </NavLink>
          </li>
        </Route>
      </ul>
    </nav>

  );
}

export default Navigator;
