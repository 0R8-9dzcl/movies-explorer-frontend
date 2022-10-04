import './Header.css';
import { Link } from 'react-router-dom';
import Navigator from '../Navigation/Navigation';
import logo from '../../images/header__logo.svg';
import burgeIcon from '../../images/header__burger.svg';
import burgeIconDark from '../../images/header__burger_type_dark.svg';

function Header({
  loggedIn,
  onOpen,
  onClose,
  burgerOpen,
  pathname,
}) {
  const authRoutes = ['/signup', '/signin'];
  const openBurger = () => {
    onOpen(true);
  };
  return (
    <header className={`header${pathname === '/' ? ' header_theme_dark' : ''}`}>
      <div className={`header__container${
        authRoutes.includes(pathname) ? ' header__container_type_auth' : ''
      }`}
      >
        <Link
          className={`link header__logo-button${
            authRoutes.includes(pathname) ? ' header__logo-button_type_auth' : ''
          }`}
          to="/"
        >
          <img className="header__logo" src={logo} alt="логотип сайта" />
        </Link>
        <button type="button" className="button header__burger" onClick={openBurger}>
          <img src={pathname === '/' ? burgeIconDark : burgeIcon} alt="кнопка откртия выпадающего меню" className="header__burger-icon" />
        </button>
        <Navigator loggedIn={loggedIn} onClose={onClose} burgerOpen={burgerOpen} />
      </div>
    </header>
  );
}

export default Header;
