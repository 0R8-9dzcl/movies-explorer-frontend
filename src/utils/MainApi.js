/* eslint class-methods-use-this: ["error", { "exceptMethods": ["#checkOk"] }] */
const BASE_URL = 'https://api.movies.explorer.nomoredomains.sbs';

class MainApi {
  constructor(selector) {
    this.url = selector.url;
    this.headers = selector.headers;
  }

  #checkOk = (res) => (res.ok ? res.json() : Promise.reject(res.status));

  // пользоваткельские запросы без куков
  register(name, email, password) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => this.#checkOk(res));
  }

  // запросы с куками
  login(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then((res) => this.#checkOk(res));
  }

  logout() {
    return fetch(`${this.url}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
    })
      .then((res) => this.#checkOk(res));
  }

  getUser() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    })
      .then((res) => this.#checkOk(res));
  }

  patchUser(name, email) {
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

  postMovie(movie) {
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify(movie),
    })
      .then((res) => this.#checkOk(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this.url}/movies/${movieId}`, {
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
    'Content-Type': 'application/json',
  },
});
export default mainApi;
