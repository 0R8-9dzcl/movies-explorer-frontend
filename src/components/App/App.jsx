import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import moviesData from '../../utils/movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';

function App() {
  const [burgerOpen, setBurgerOpen] = React.useState(false);
  const headRoutes = ['/movies', '/saved-movies', '/profile', '/']; // роуты где отбражется хэдер
  const footRoutes = ['/movies', '/saved-movies', '/']; // роуты где отбражется футер
  const openBurger = () => {
    setBurgerOpen(true);
  };
  const closeBurger = () => {
    setBurgerOpen(false);
  };
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
  return (
    <>
      <Route exact path={headRoutes}>
        <Header onOpen={openBurger} onClose={closeBurger} burgerOpen={burgerOpen} />
      </Route>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/movies">
        <Movies movies={moviesData} />
      </Route>
      <Route path="/saved-movies">
        <SavedMovies movies={moviesData} />
      </Route>
      <Route exact path={footRoutes}>
        <Footer />
      </Route>

    </>
  );
}

export default App;
