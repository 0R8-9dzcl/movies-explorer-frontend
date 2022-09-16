import './Navigation.css';
import { Link, Route } from 'react-router-dom';

function Navigator() {
 return(
  <Route exact path='/' >
    <nav className='nav'>
      <ul className="nav__list">
        <li>
          <Link className="nav__link nav__link_type_land" to="/sign-up">Регистрация</Link>
        </li>
        <li>
          <Link className="nav__link nav__link_type_land nav__link_type_login" to="/sign-in">Войти</Link>
        </li>
      </ul>
    </nav>
  </Route>
 )
}

export default Navigator;
