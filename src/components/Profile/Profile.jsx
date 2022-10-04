import UserForm from '../UserForm/UserForm';

function Profile({
  editUser, saveUser, profileEdit, pathname,
}) {
  const onEdit = () => {
    editUser();
  };
  const onSave = (e) => {
    e.preventDefault();
    saveUser();
  };
  return (
    <main>
      <section className="profile">
        <UserForm
          onSubmit={onSave}
          boolean={profileEdit}
          title="Привет, Виталий!"
          submitText="Сохранить"
          pathname={pathname}
        >
          <label htmlFor="name" className="profile__label">
            <span className="profile__span">Имя</span>
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
            <span className="profile__span">E-mail</span>
            <input
              name="email"
              placeholder="E-mail"
              className={`profile__input${profileEdit ? ' profile__input_type_active' : ''}`}
              type="email"
              required
            />
          </label>
          <ul className="profile__buttons">
            <li>
              <button
                className={`button profile__button profile__button_type_edit ${
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
                className={`button profile__button profile__button_type_logout ${
                  !profileEdit ? ' profile__button_type_active' : ''
                }`}
                type="button"
              >
                Выйти из аккаунта
              </button>
            </li>
          </ul>
        </UserForm>
      </section>
    </main>
  );
}

export default Profile;
