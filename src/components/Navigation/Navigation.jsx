import './Navigation.css';
import {
  Link,
  NavLink,
  Route,
} from 'react-router-dom';
import closedBurger from '../../images/nav__close-burger.svg';

function Navigator({ loggedIn, onClose, burgerOpen }) {
  const userRoutes = ['/', '/movies', '/saved-movies', '/profile'];
  const closeBurger = () => {
    onClose(false);
  };
  return (
    <nav
      className={
        `nav${!loggedIn ? '' : ' nav_type_logged'}${burgerOpen ? ' nav_type_burger-menu' : ''}`
      }
    >
      <div className="nav__container">
        <Route exact path={userRoutes}>
          <button type="button" className="nav__close-burger" onClick={closeBurger}>
            <img src={closedBurger} alt="кнопка закрытия выпадающего меню" className="nav__close-burger-icon" />
          </button>
          <ul className="nav__films">
            <li>
              <NavLink
                className="link nav__film nav__link_type_main"
                activeClassName="nav__link_type_active"
                exact
                to="/"
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                className="link nav__film"
                activeClassName="nav__link_type_active"
                to="/movies"
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                className="link nav__film"
                activeClassName="nav__link_type_active"
                to="/saved-movies"
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          {!loggedIn ? (
            <ul className="nav__list">
              <li>
                <Link className="link nav__link nav__link_type_land" to="/signup">Регистрация</Link>
              </li>
              <li>
                <Link className="link nav__link nav__link_type_land nav__link_type_login" to="/signin">Войти</Link>
              </li>
            </ul>
          ) : (
            <ul className="nav__list">
              <li>
                <NavLink
                  className="link nav__link nav__link_type_profile"
                  activeClassName="nav__link_type_active"
                  to="/profile"
                >
                  Аккаунт
                </NavLink>
              </li>
            </ul>
          )}
        </Route>
      </div>
    </nav>

  );
}

export default Navigator;
