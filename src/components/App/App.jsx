// import React from 'react';
import { Route } from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

const headerRoutes = ['/movies', '/saved-movies', '/profile', '/'];
// const footerRoutes = ['/movies', '/saved-movies', '/profile', '/'];
function App() {
  return (
    <>
      <Route exact path={headerRoutes}>
        <Header />

      </Route>
      <main>
        <Main />
      </main>
      <Footer />

    </>
  );
}

export default App;
