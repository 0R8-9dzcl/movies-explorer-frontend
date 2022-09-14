import './Promo.css';
import promoLogo from '../../images/landing-logo.svg';

function Promo() {
  return (
    <section className="promo">
      <img className="promo__logo" src={promoLogo} alt="логотип буква П за решёткой" />
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
    </section>
  );
}

export default Promo;
