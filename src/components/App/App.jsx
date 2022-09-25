import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
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
    const closeByEvent = (evt) => {
      if (evt.key === 'Escape') {
        setBurgerOpen(false);
      }
      if (evt.target.classList.contains('nav_type_logged:before')) {
        setBurgerOpen(false);
      }
    };
    document.addEventListener('click', closeByEvent);
    return () => document.removeEventListener('click', closeByEvent);
  }, []);
  return (
    <>
      <Route exact path={headRoutes}>
        <Header onOpen={openBurger} onClose={closeBurger} burgerOpen={burgerOpen} />
      </Route>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/movies" />
      <Route exact path={footRoutes}>
        <Footer />
      </Route>

    </>
  );
}

export default App;
