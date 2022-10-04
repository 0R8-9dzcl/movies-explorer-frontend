import React from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
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
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

function App() {
  const { pathname, key, hash } = useLocation();
  const history = useHistory();
  const [burgerOpen, setBurgerOpen] = React.useState(false); // стейт бургера
  const [profileEdit, setProfileEdit] = React.useState(false); // стейт редактирования профиля
  // currenUser
  const [currentUser, setCurrentUser] = React.useState({ _id: '', email: '', name: '' });
  const [loggedIn, setLoggedIn] = React.useState(false);// стейт логина
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
  }, [loggedIn]);
  // провеарка токена
  const tokenCheck = () => {
    mainApi.getUser()
      .then((data) => {
        if (data) {
          setLoggedIn(true);
        }
      })
      .catch((err) => {
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
  // регистрация пользователя
  const handleRegister = (name, email, password) => {
    mainApi.register(name, email, password)
      .then((res) => {
        history.push('/signin');
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // логин пользователя
  const handleLogin = (email, password) => {
    mainApi.login(email, password)
      .then((user) => {
        setCurrentUser(user.data);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
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
          setProfileEdit(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        {/* хэдер отобажается  на всех роутах кроме 404 поэтому здесь свич */}
        <Route exact path={headRoutes}>
          <Header
            loggedIn={loggedIn}
            onOpen={openBurger}
            onClose={closeBurger}
            burgerOpen={burgerOpen}
            pathname={pathname}
          />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/movies">
        <Movies movies={moviesData} pathname={pathname} />
      </Route>
      <Route path="/saved-movies">
        <SavedMovies movies={moviesData} pathname={pathname} />
      </Route>
      <Route path="/profile">
        <Profile
          editUser={editUser}
          saveUser={saveUser}
          profileEdit={profileEdit}
          pathname={pathname}
          onLogout={handleLogout}
        />
      </Route>
      <Route path="/signin">
        <Login pathname={pathname} onSubmit={handleLogin} />
      </Route>
      <Route path="/signup">
        <Register pathname={pathname} onSubmit={handleRegister} />
      </Route>
      <Route exact path={footRoutes}>
        <Footer />
      </Route>
    </CurrentUserContext.Provider>
  );
}

export default App;
