import './Portfolio.css';
import myPhoto from '../../images/my-photo.png';
function Portfolio() {
  return(
    <section className="portfolio" id='about-me'>
      <div className='portfolio__container'>
        <h2 className="portfolio__title">Студент</h2>
        <h3 className="portfolio__name">Евгений</h3>
        <p className="portfolio__profession">Фронтенд-разработчик, 25 лет</p>
        <p className="portfolio__about-me">
          Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
        </p>
        <ul className="portfolio__social-list">
          <li><a href="https://t.me/Foodfox_EVGENIY_ALEKSEEV" target="_blank" rel="noreferrer" className="portfolio__social-item">Telegram</a></li>
          <li><a href="https://github.com/0R8-9dzcl" target="_blank" rel="noreferrer" className="portfolio__social-item">Github</a></li>
        </ul>
        <img src={myPhoto} alt="моя фотография" className="portfolio__photo" />
        <h3 className="portfolio__works">Портфолио</h3>
        <ul className="portfolio__work-list">
          <li className="porfolio__work-item"><a target="_blank" rel="noreferrer">Статичный сайт</a></li>
          <li className="porfolio__work-item"><a target="_blank" rel="noreferrer">Адаптивный сайт</a></li>
          <li className="porfolio__work-item"><a target="_blank" rel="noreferrer">Одностраничное приложение</a></li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
