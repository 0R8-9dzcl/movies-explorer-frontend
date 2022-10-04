import { useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import UserForm from '../UserForm/UserForm';

function Profile({
  editUser, saveUser, profileEdit, pathname, onLogout,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdateName = (e) => {
    setName(e.target.value);
  };
  const handleUpdateEmail = (e) => {
    setEmail(e.target.value);
  };
  const onEdit = () => {
    editUser();
  };
  const updateHandler = (e) => {
    e.preventDefault();
    saveUser(name, email);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    onLogout();
  };
  return (
    <main>
      <section className="profile">
        <UserForm
          formName="profile"
          onSubmit={updateHandler}
          boolean={profileEdit}
          title={`Привет, ${currentUser.name}`}
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
              value={currentUser.name}
              onChange={handleUpdateName}
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
              value={currentUser.email}
              onChange={handleUpdateEmail}
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
                onClick={handleLogout}
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
