import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import moviesData from '../../utils/movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';

function App() {
  const { pathname, key, hash } = useLocation();
  const [burgerOpen, setBurgerOpen] = React.useState(false); // стейт бургера
  const [profileEdit, setProfileEdit] = React.useState(false); // стейт редактирования профиля
  // роуты где отбражется хэдер
  const headRoutes = ['/movies', '/saved-movies', '/profile', '/', '/signup', '/signin'];
  const footRoutes = ['/movies', '/saved-movies', '/']; // роуты где отбражется футер
  // открываем бургер меню
  const openBurger = () => {
    setBurgerOpen(true);
  };
  // закрываем бургер меню
  const closeBurger = () => {
    setBurgerOpen(false);
  };
  // вешаем слушатели на бургер меню
  React.useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === 'Escape') {
        setBurgerOpen(false);
      }
    };
    const closeByClick = (evt) => {
      if (evt.target.classList.contains('nav_type_logged')) {
        setBurgerOpen(false);
      }
    };
    window.addEventListener('keydown', closeByEsc);
    document.addEventListener('click', closeByClick);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
      document.removeEventListener('click', closeByClick);
    };
  }, []);
  // закрытие бургера при переходе
  React.useEffect(() => {
    setBurgerOpen(false);
  }, [pathname]);
  // перемешение к id
  React.useEffect(() => {
    if (hash) {
      const targetElement = document.getElementById(hash.substring(1));
      targetElement?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [key, hash]);
  // редактирование профиля
  const editUser = () => {
    setProfileEdit(true);
  };
  const saveUser = () => {
    setProfileEdit(false);
  };
  return (
    <>
      <Switch>
        <Route exact path={headRoutes}>
          <Header onOpen={openBurger} onClose={closeBurger} burgerOpen={burgerOpen} />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/movies">
        <Movies movies={moviesData} />
      </Route>
      <Route path="/saved-movies">
        <SavedMovies movies={moviesData} />
      </Route>
      <Route path="/profile">
        <Profile editUser={editUser} saveUser={saveUser} profileEdit={profileEdit} />
      </Route>
      <Route path="/signin">
        <Login />
      </Route>
      <Route path="/signup">
        <Register />
      </Route>
      <Route exact path={footRoutes}>
        <Footer />
      </Route>
    </>
  );
}

export default App;
