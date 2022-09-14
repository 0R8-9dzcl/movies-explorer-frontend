import './Techs.css';

function Techs() {

  return (
    <section className='techs' id='techs'>
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__sub-title">7 технологий</h3>
      <p className="techs__paragraph">
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.
      </p>
      <ul className="techs__list">
        <li><p className="techs__item">HTML</p></li>
        <li><p className="techs__item">CSS</p></li>
        <li><p className="techs__item">JS</p></li>
        <li><p className="techs__item">React</p></li>
        <li><p className="techs__item">Git</p></li>
        <li><p className="techs__item">Express.js</p></li>
        <li><p className="techs__item">MongoDB</p></li>
      </ul>
    </section>
  )
}

export default Techs;
