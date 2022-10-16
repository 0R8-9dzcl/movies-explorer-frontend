/* eslint-disable no-underscore-dangle */
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
import params from '../../utils/params';

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
  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [sortedSavedMovies, setSortedSavedMovies] = React.useState([]);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [lastSearch, setLastSearch] = React.useState({
    isFirst: true, movies: [], shortCheckbox: false, sortPhrase: '',
  });
  const [preloader, setPreloader] = React.useState(false);
  const [sortPhrase, setSortPhrase] = React.useState('');
  const [shortCheckbox, setShortCheckbox] = React.useState(false);
  const [sortSavePhrase, setSaveSortPhrase] = React.useState('');
  const [shortSaveCheckbox, setSaveShortCheckbox] = React.useState(false);
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
          setAllMovies([]);
          setSavedMovies([]);
          setSortedSavedMovies([]);
          setSearchedMovies([]);
          setLastSearch({
            isFirst: true, movies: [], shortCheckbox: false, sortPhrase: '',
          });
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
    setPreloader(true);
    getMovies()
      .then((moviesArray) => {
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
        localStorage.setItem('allMovies', JSON.stringify(newMoviesArray));
        setAllMovies(newMoviesArray);
      })
      .catch((err) => {
        console.log(err);
        setAllMovies([]);
      })
      .finally(() => {
        setPreloader(false);
      });
  };
  // сохряняю все фильмы в стейт
  const saveAllMovies = () => {
    if (allMovies < 1) {
      const localAllMovies = JSON.parse(localStorage.getItem('allMovies'));
      if (!localAllMovies) {
        getAllMovies();
      } else {
        setAllMovies(localAllMovies);
        setPreloader(false);
      }
    }
  };
  // сохраняем искомые фильмы
  const rememberSearch = (sortedMovie) => {
    setSearchedMovies(sortedMovie);
    setLastSearch({
      isFirst: false, movies: sortedMovie, shortCheckbox, sortPhrase,
    });
  };
  const rememberSavedSearch = (sortedMovie) => {
    setSortedSavedMovies(sortedMovie);
  };
  // сортировка
  const sortMovie = (movies, remember, checkbox, input) => {
    const sortedMovie = movies.filter((m) => (checkbox ? m.duration <= params.shortDuration
        && (m.nameRU.toLowerCase().includes(input.toLowerCase())
      || m.nameEN.toLowerCase().includes(input.toLowerCase()))
      : m.nameRU.toLowerCase().includes(input.toLowerCase())
      || m.nameEN.toLowerCase().includes(input.toLowerCase())));
    remember(sortedMovie);
  };
  const handleAllMoviesSearch = () => {
    saveAllMovies();
    sortMovie(allMovies, rememberSearch, shortCheckbox, sortPhrase);
  };
  const handleSavedMoviesSearch = () => {
    sortMovie(savedMovies, rememberSavedSearch, shortSaveCheckbox, sortSavePhrase);
  };
  // меняем статус чекбокса
  const handleCheckbox = () => setShortCheckbox(!shortCheckbox);
  // значение поля поиска
  const handleSortInput = (e) => setSortPhrase(e.target.value);
  // меняем статус чекбокса
  const handleSaveCheckbox = () => setSaveShortCheckbox(!shortSaveCheckbox);
  // значение поля поиска
  const handleSaveSortInput = (e) => setSaveSortPhrase(e.target.value);
  // проверка лайка
  const checkSaved = (movie) => savedMovies
    .some((savedMovie) => (savedMovie.movieId === movie.movieId));
  // сохраниние фильма
  const handleSaveMovie = (movie) => {
    mainApi.postMovie(movie)
      .then((savedMovie) => {
        if (savedMovie) {
          setSortedSavedMovies([...sortedSavedMovies, savedMovie.data]);
          setSavedMovies([...savedMovies, savedMovie.data]);
        }
      })
      .catch((err) => console.log(err));
  };
  // удаление фильма
  const handleDeleteMovie = (movie) => {
    const deletingMovie = savedMovies.find((m) => m.movieId === movie.movieId);
    mainApi.deleteMovie(deletingMovie._id)
      .then(() => {
        setSavedMovies((item) => item.filter((m) => m.movieId !== movie.movieId));
        setSortedSavedMovies((item) => item.filter((m) => m._id !== movie._id));
      })
      .catch((err) => console.log(err));
  };
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
  // поиск кликом по чекбоксу или при первом поиске при записи всех фильмов
  React.useEffect(() => {
    if (allMovies.length > 1) {
      handleAllMoviesSearch();
    }
  }, [shortCheckbox || allMovies]);
  // при обновлении всех фильмов
  React.useEffect(() => {
    handleSavedMoviesSearch();
  }, [shortSaveCheckbox]);
  // сохраняем последний поиск в хранилище
  React.useEffect(() => {
    if (!lastSearch.isFirst) {
      localStorage.setItem('lastSearch', JSON.stringify(lastSearch));
    }
  }, [lastSearch]);
  // получаем данные пользователя и сохранённые фильмы и последний поиск
  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUser(), mainApi.getSavedMovies()])
        .then(([userInfo, moviesList]) => {
          setCurrentUser(userInfo.data);
          setSavedMovies(moviesList.data);
          setSortedSavedMovies(moviesList.data);
        })
        .catch((err) => console.log(err));
      const currentSearch = JSON.parse(localStorage.getItem('lastSearch'));
      if (currentSearch) {
        setSearchedMovies(currentSearch.movies);
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
        <ProtectedRoute
          path="/signin"
          component={Login}
          loggedIn={!loggedIn}
          redirrectPath="/"
          pathname={pathname}
          onSubmit={handleLogin}
          reqMess={reqMess}
        />
        <ProtectedRoute
          path="/signup"
          component={Register}
          loggedIn={!loggedIn}
          redirrectPath="/"
          pathname={pathname}
          onSubmit={handleRegister}
          reqMess={reqMess}
        />
        <ProtectedRoute
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
          redirrectPath="/signin"
          allMovies={allMovies}
          movies={searchedMovies}
          pathname={pathname}
          onCheckBox={handleCheckbox}
          shortCheckbox={shortCheckbox}
          preloader={preloader}
          onSort={handleSortInput}
          sortPhrase={sortPhrase}
          sortMovie={handleAllMoviesSearch}
          saveMovie={handleSaveMovie}
          deleteMovie={handleDeleteMovie}
          checkSaved={checkSaved}
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
          redirrectPath="/signin"
          allMovies={savedMovies}
          movies={sortedSavedMovies}
          pathname={pathname}
          onCheckBox={handleSaveCheckbox}
          shortCheckbox={shortSaveCheckbox}
          preloader={preloader}
          onSort={handleSaveSortInput}
          sortPhrase={sortSavePhrase}
          sortMovie={handleSavedMoviesSearch}
          saveMovie={handleSaveMovie}
          deleteMovie={handleDeleteMovie}
          checkSaved={checkSaved}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          loggedIn={loggedIn}
          redirrectPath="/signin"
          editUser={editUser}
          saveUser={saveUser}
          profileEdit={profileEdit}
          pathname={pathname}
          onLogout={handleLogout}
          reqMess={reqMess}
        />
        <Route exact path="/*">
          <PageNotFound
            loggedIn={loggedIn}
            onGoBack={goBack}
          />
        </Route>
      </Switch>
      <Route exact path={footRoutes}>
        <Footer />
      </Route>
    </CurrentUserContext.Provider>
  );
}

export default App;
