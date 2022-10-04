const BASE_URL = 'https://api.movies.explorer.nomoredomains.sbs';

class MainApi {
  constructor(selector) {
    this.url = selector.url;
    this.headers = selector.headers;
  }

  #checkOk = (res) => (res.ok ? this.res.json() : Promise.reject(res.status));

  // пользоваткельские запросы без куков
  register(name, email, password) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => this.#checkOk(res));
  }

  login(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    })
      .then((res) => this.#checkOk(res));
  }

  // запросы с куками
  logout() {
    return fetch(`${this.url}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
    })
      .then((res) => this.#checkOk(res));
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    })
      .then((res) => this.#checkOk(res));
  }

  setUserInfo(name, email) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name,
        email,
      }),
    })
      .then((res) => this.#checkOk(res));
  }

  // запросы сохраненных фильмов
  getSavedMovies() {
    return fetch(`${this.url}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    })
      .then((res) => this.#checkOk(res));
  }

  postMovie(name, link) {
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => this.#checkOk(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this.url}/cards/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers,
    })
      .then((res) => this.#checkOk(res));
  }
}
const mainApi = new MainApi({
  url: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
export default mainApi;
