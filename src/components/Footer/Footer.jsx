import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copy">&copy; 2022</p>
        <ul className="footer__socials">
          <li><a target="_blank" rel="noreferrer" href="https://practicum.yandex.ru" className="footer__links">Яндекс.Практикум</a></li>
          <li><a target="_blank" rel="noreferrer" href="https://github.com/0R8-9dzcl" className="footer__links">Github</a></li>
          <li><a target="_blank" rel="noreferrer" href="https://t.me/Foodfox_EVGENIY_ALEKSEEV" className="footer__links">Telegram</a></li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
