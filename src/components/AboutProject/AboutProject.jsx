import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about" id="about-project">
      <h2 className="about__title">О проекте</h2>
      <ul className="about__list">
        <li>
          <h3 className="about__list-title">Дипломный проект включал 5 этапов</h3>
          <p className="about__paragraph">
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </li>
        <li>
          <h3 className="about__list-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about__schedule">
        <span className="about__schedule-span about__schedule-span_type_back">1 неделя</span>
        <span className="about__schedule-span about__schedule-span_type_front">4 недели</span>
        <span className="about__schedule-span">Back-end</span>
        <span className="about__schedule-span">Front-end</span>
      </div>
    </section>
  );
}
export default AboutProject;
