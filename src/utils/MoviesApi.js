const MOVIES_URL = 'https://api.nomoreparties.co/';

function getMovies() {
  return fetch(MOVIES_URL, { method: 'GET' }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
}
export default getMovies;
