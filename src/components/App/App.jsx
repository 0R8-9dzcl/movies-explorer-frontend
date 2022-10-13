/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import './App.css';
import isURL from 'validator/lib/isURL';
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
import { getMovies, MOVIES_URL } from '../../utils/MoviesApi';
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
  const [reqMess, setReqMess] = React.useState({ err: false, mess: '' });
  // стейты фильмов
  const [allMovies, setAllMovies] = React.useState({ isEmpty: true, movies: [] });
  const [searchedMovies, setSearchedMovies] = React.useState({ isEmpty: true, movies: [], text: 'Нет фильмов' });
  const [savedMovies, setSavedMovies] = React.useState({ isEmpty: true, movies: [], text: 'Нет сохранённых фильмов' });
  const [lastSearch, setLastSearch] = React.useState({
    isFirst: true, isEmpty: true, movies: [], text: '', shortCheckbox: false, sortPhrase: '',
  });
  const [preloader, setPreloader] = React.useState(false);
  const [sortPhrase, setSortPhrase] = React.useState('');
  const [shortCheckbox, setShortCheckbox] = React.useState(false);
  // роуты где отбражется хэдер
  const headRoutes = ['/movies', '/saved-movies', '/profile', '/', '/signup', '/signin'];
  const footRoutes = ['/movies', '/saved-movies', '/']; // роуты где отбражется футер
  // проверка токена
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
    setReqMess({ err: false, mess: '' });
  }, [pathname]);
  // логин пользователя
  const handleLogin = (email, password) => {
    mainApi.login(email, password)
      .then((user) => {
        setCurrentUser(user.data);
        setReqMess({ err: false, mess: '' });
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        if (err === 401) {
          setReqMess({ err: true, mess: errText.incorrectData });
        }
        if (err === 500) {
          setReqMess({ err: true, mess: errText.serverError });
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
          setReqMess({ err: true, mess: errText.registerError });
        }
        if (err === 409) {
          setReqMess({ err: true, mess: errText.conflicrEmail });
        }
        if (err === 500) {
          setReqMess({ err: true, mess: errText.serverError });
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
          localStorage.clear();
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
          setReqMess({ err: false, mess: 'Сохранено успешно' });
          setProfileEdit(false);
        }
      })
      .catch((err) => {
        if (err === 400) {
          setReqMess({ err: true, mess: errText.patchUserError });
        }
        if (err === 409) {
          setReqMess({ err: true, mess: errText.conflicrEmail });
        }
        if (err === 500) {
          setReqMess({ err: true, mess: errText.serverError });
        }
        console.log(err);
      });
  };
  const goBack = () => {
    history.goBack();
  };

  // Фильмецы
  // получаем все фильмы из сервиса
  const getAllMovies = () => {
    getMovies()
      .then((moviesArray) => {
        console.log(allMovies);
        const newMoviesArray = moviesArray.map((movie) => ({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: MOVIES_URL + movie.image.url,
          trailerLink: isURL(movie.trailerLink) ? movie.trailerLink
            : `https://www.youtube.com/results?search_query=${movie.nameEN.replace(/ /g, '+')}+trailer`,
          thumbnail: MOVIES_URL + movie.image.formats.thumbnail.url,
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        }));
        console.log(newMoviesArray);
        localStorage.setItem('allMovies', JSON.stringify(newMoviesArray));
        setAllMovies({ isEmpty: false, movies: newMoviesArray });
      })
      .catch((err) => {
        console.log(err);
        setAllMovies({ isEmpty: false, movies: [], text: '' });
      })
      .finally(() => {
        setPreloader(false);
      });
  };
  // сохряняю все фильмы в стейт
  const saveAllMovies = () => {
    const localAllMovies = localStorage.getItem('allMovies');
    if (!localAllMovies) {
      getAllMovies();
    } else {
      setAllMovies({ isEmpty: false, movies: JSON.parse(localAllMovies) });
      setPreloader(false);
    }
  };
  // сортировка
  const sortMovie = () => {
    console.log(shortCheckbox);
    const sortedMovie = allMovies.movies
      .filter((m) => (shortCheckbox ? m.duration <= 50
        && (m.nameRU.toLowerCase().includes(sortPhrase.toLowerCase())
      || m.nameEN.toLowerCase().includes(sortPhrase.toLowerCase()))
        : m.nameRU.toLowerCase().includes(sortPhrase.toLowerCase())
      || m.nameEN.toLowerCase().includes(sortPhrase.toLowerCase())));
    console.log(sortedMovie);
    if (sortedMovie.length > 0) {
      setSearchedMovies({ isEmpty: false, movies: sortedMovie });
      setLastSearch({
        isEmpty: false, movies: sortedMovie, text: '', shortCheckbox, sortPhrase,
      });
    } else {
      setSearchedMovies({ isEmpty: true, movies: sortedMovie, text: `Фильмы по запросу '${sortPhrase}' не найдены` });
      setLastSearch({
        isEmpty: true, movies: [], text: `Фильмы по запросу '${sortPhrase}' не найдены`, shortCheckbox, sortPhrase,
      });
    }
  };
  console.log(lastSearch);
  // меняем статус чекбокса
  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setShortCheckbox(true);
    } else {
      setShortCheckbox(false);
    }
  };
  // значение поля поиска
  const handleSortInput = (e) => {
    setSortPhrase(e.target.value);
  };
  React.useEffect(() => {
    if (!allMovies.isEmpty) {
      sortMovie();
    }
  }, [allMovies, shortCheckbox]);
  // сохраняем последний поиск в хранилище
  React.useEffect(() => {
    if (!lastSearch.isFirst) {
      localStorage.setItem('lastSearch', JSON.stringify(lastSearch));
      console.log('cj[hghg');
    }
  }, [lastSearch]);
  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getUser().then((userInfo) => {
        setCurrentUser(userInfo.data);
      })
        .catch((err) => console.log(err));
      const currentSearch = JSON.parse(localStorage.getItem('lastSearch'));
      // setShortCheckbox(currentSearch.shortCheckbox);
      if (currentSearch) {
        console.log(currentSearch);
        setSearchedMovies(currentSearch);
        setSortPhrase(currentSearch.sortPhrase);
        setShortCheckbox(currentSearch.shortCheckbox);
      }
    }
  }, [loggedIn, history]);
  // не отрисовываем приложение пока не прошёл запрос токена
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
          <Login pathname={pathname} onSubmit={handleLogin} reqMess={reqMess} />
        </Route>
        <Route path="/signup">
          <Register pathname={pathname} onSubmit={handleRegister} reqMess={reqMess} />
        </Route>
        <ProtectedRoute
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
          movies={searchedMovies}
          pathname={pathname}
          onCheckBox={handleCheckbox}
          shortCheckbox={shortCheckbox}
          preloader={preloader}
          onSort={handleSortInput}
          sortPhrase={sortPhrase}
          onSearch={saveAllMovies}
          allMovies={allMovies}
          sortMovie={sortMovie}
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
          movies={savedMovies}
          pathname={pathname}
          onCheckBox={handleCheckbox}
          shortCheckbox={shortCheckbox}
          preloader={preloader}
          onSort={handleSortInput}
          sortPhrase={sortPhrase}
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
          reqMess={reqMess}
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
