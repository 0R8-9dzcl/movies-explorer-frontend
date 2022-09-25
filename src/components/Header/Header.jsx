import './Header.css';
import { Link, useLocation, Route } from 'react-router-dom';
import Navigator from '../Navigation/Navigation';
import logo from '../../images/header__logo.svg';
import burgeIcon from '../../images/header__burger.svg';

function Header({ onOpen, onClose, burgerOpen }) {
  const userRoutes = ['/movies', '/saved-movies', '/profile'];
  const location = useLocation();
  const openBurger = () => {
    onOpen(true);
  };
  return (
    <header
      className={`header${location.pathname === '/' ? ' header_theme_dark' : ''}`}
    >
      <div className="header__container">
        <Link className="header__logo-button" to="/">
          <img className="header__logo" src={logo} alt="логотип сайта" />
        </Link>
        <Route exact path={userRoutes}>
          <button type="button" className="header__burger" onClick={openBurger}>
            <img src={burgeIcon} alt="кнопка откртия выпадающего меню" className="header__burger-icon" />
          </button>
        </Route>
        <Navigator onClose={onClose} burgerOpen={burgerOpen} />
      </div>
    </header>
  );
}

export default Header;
