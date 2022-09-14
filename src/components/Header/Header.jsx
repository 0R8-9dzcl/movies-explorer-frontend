import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import Navigator from '../Navigation/Navigation';

function Header() {
  const location = useLocation();
  return (
    <header className={`header${
      location.pathname === '/' ? ' header__theme_dark' : ''
      }`}
    >
      <div className="header__container">
        <Link className="header__logo-button" to="/">
          <img className="header__logo" src={logo} alt="логотип сайта" />
        </Link>
        <Navigator />
      </div>
    </header>
  );
}

export default Header;
