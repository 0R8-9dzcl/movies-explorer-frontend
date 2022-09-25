import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import NavTab from '../NavTab/NavTab';
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';

function Main() {
  return (
    <main>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <Portfolio />
    </main>
  );
}

export default Main;
