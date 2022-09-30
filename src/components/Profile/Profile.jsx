import './Profile.css';

function Profile({ editUser, saveUser, profileEdit }) {
  const onEdit = () => {
    editUser();
  };
  const onSave = () => {
    saveUser();
  };
  return (
    <section className="profile">
      <form className="profile__form">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <label htmlFor="name" className="profile__label">
          <span className="profile__input-name">Имя</span>
          <input
            name="name"
            placeholder="Имя"
            className={`profile__input${profileEdit ? ' profile__input_type_active' : ''}`}
            type="text"
            minLength="2"
            maxLength="40"
            required
          />
        </label>
        <label htmlFor="email" className="profile__label">
          <span className="profile__input-name">E-mail</span>
          <input
            name="email"
            placeholder="E-mail"
            className={`profile__input${profileEdit ? ' profile__input_type_active' : ''}`}
            type="email"
            required
          />
        </label>
        {/* тип кнопки поменяю во время работы над функциональностью */}

        <ul className="profile__buttons">
          <li>
            <button
              className={`profile__button profile__button_type_submit ${
                profileEdit ? ' profile__button_type_active' : ''
              }`}
              type="button"
              name="submit"
              onClick={onSave}
            >
              Сохранить
            </button>
          </li>
          <li>
            <button
              className={`profile__button profile__button_type_edit ${
                !profileEdit ? ' profile__button_type_active' : ''
              }`}
              type="button"
              onClick={onEdit}
            >
              Редактировать
            </button>
          </li>
          <li>
            <button
              className={`profile__button profile__button_type_logout ${
                !profileEdit ? ' profile__button_type_active' : ''
              }`}
              type="button"
            >
              Выйти из аккаунта
            </button>
          </li>
        </ul>
      </form>
    </section>
  );
}

export default Profile;
