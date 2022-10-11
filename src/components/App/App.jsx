import React from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../../CustomHoocks/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import getMovies from '../../utils/MoviesApi';
import errText from '../../utils/errText';

function App() {
  const { pathname, key, hash } = useLocation();
  const history = useHistory();
  const [burgerOpen, setBurgerOpen] = React.useState(false); // стейт бургера
  const [profileEdit, setProfileEdit] = React.useState(false); // стейт редактирования профиля
  // currenUser
  const [currentUser, setCurrentUser] = React.useState({ _id: '', email: '', name: '' });
  const [loggedIn, setLoggedIn] = React.useState(undefined);// стейт логина
  // стейт ошибки запроса
  const [reqError, setReqError] = React.useState('');
  // стейты фильмов
  const [moviesData, setMoviesData] = React.useState([]);
  // роуты где отбражется хэдер
  const headRoutes = ['/movies', '/saved-movies', '/profile', '/', '/signup', '/signin'];
  const footRoutes = ['/movies', '/saved-movies', '/']; // роуты где отбражется футер
  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getUser()
        .then((userInfo) => {
          setCurrentUser(userInfo.data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, history]);
  // провеарка токена
  const tokenCheck = () => {
    mainApi.getUser()
      .then((data) => {
        if (data) {
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      });
  };
  React.useEffect(() => {
    tokenCheck();
  }, []);
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
  // очистить ошибку сабмита при переходе
  React.useEffect(() => {
    setReqError('');
  }, [pathname]);
  // логин пользователя
  const handleLogin = (email, password) => {
    mainApi.login(email, password)
      .then((user) => {
        setCurrentUser(user.data);
        setReqError('');
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        if (err === 401) {
          setReqError(errText.incorrectData);
        }
        if (err === 500) {
          setReqError(errText.serverError);
        }
        console.log(err);
      });
  };
  // регистрация пользователя
  const handleRegister = (name, email, password) => {
    mainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        if (err === 400) {
          setReqError(errText.registerError);
        }
        if (err === 409) {
          setReqError(errText.conflicrEmail);
        }
        if (err === 500) {
          setReqError(errText.serverError);
        }
        console.log(err);
      });
  };
  // выход пользователя
  const handleLogout = () => {
    mainApi.logout()
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          setCurrentUser({ _id: '', email: '', name: '' });
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // редактирование профиля
  const editUser = () => {
    setProfileEdit(true);
  };
  const saveUser = (name, email) => {
    mainApi.patchUser(name, email)
      .then((user) => {
        if (user) {
          setCurrentUser(user.data);
          setReqError('');
          setProfileEdit(false);
        }
      })
      .catch((err) => {
        if (err === 400) {
          setReqError(errText.patchUserError);
        }
        if (err === 409) {
          setReqError(errText.conflicrEmail);
        }
        if (err === 500) {
          setReqError(errText.serverError);
        }
        console.log(err);
      });
  };
  const goBack = () => {
    history.goBack();
  };

  // Фильмецы
  const getAllMovies = () => {
    getMovies()
      .then((moviesArray) => {
        setMoviesData(moviesArray);
      })
      .catch((err) => console.log(err));
  };
  if (loggedIn === undefined) {
    return <Preloader />;
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Route exact path={headRoutes}>
        <Header
          loggedIn={loggedIn}
          onOpen={openBurger}
          onClose={closeBurger}
          burgerOpen={burgerOpen}
          pathname={pathname}
        />
      </Route>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/signin">
          <Login pathname={pathname} onSubmit={handleLogin} reqError={reqError} />
        </Route>
        <Route path="/signup">
          <Register pathname={pathname} onSubmit={handleRegister} reqError={reqError} />
        </Route>
        <ProtectedRoute
          path="/movies"
          component={Movies}
          getAllMovies={getAllMovies}
          loggedIn={loggedIn}
          movies={moviesData}
          pathname={pathname}
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
          movies={moviesData}
          pathname={pathname}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          loggedIn={loggedIn}
          editUser={editUser}
          saveUser={saveUser}
          profileEdit={profileEdit}
          pathname={pathname}
          onLogout={handleLogout}
          reqError={reqError}
        />
        <ProtectedRoute
          exact
          path="/*"
          component={PageNotFound}
          loggedIn={loggedIn}
          onGoBack={goBack}
        />
      </Switch>
      <Route exact path={footRoutes}>
        <Footer />
      </Route>
    </CurrentUserContext.Provider>
  );
}

export default App;
