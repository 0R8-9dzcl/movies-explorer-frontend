import { useContext, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useInput from '../../CustomHoocks/FormFalidator';
import UserForm from '../UserForm/UserForm';

function Profile({
  editUser, saveUser, profileEdit, pathname, onLogout, reqMess,
}) {
  const currentUser = useContext(CurrentUserContext);
  const name = useInput(currentUser.name, {
    isEmpty: false, minLength: 2, maxLength: 30,
  });
  const email = useInput(currentUser.email, { isEmpty: false, isEmail: true });
  // установим зеначения из конекста при изменении данных пользователя
  useEffect(() => {
    name.setValue(currentUser.name);
    email.setValue(currentUser.email);
  }, [currentUser]);

  const onEdit = () => {
    editUser();
  };
  // контроллер сабмита формы
  const updateHandler = (e) => {
    e.preventDefault();
    saveUser(name.value, email.value);
  };
  //  контроллер логаута
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
          title={`Привет, ${currentUser.name}!`}
          submitText="Сохранить"
          pathname={pathname}
          reqMess={reqMess}
          disabledButton={
            (!email.inputValid || !name.inputValid)
            || (name.value === currentUser.name && email.value === currentUser.email)
          }
        >
          <label htmlFor="name" className="profile__label">
            <span className="profile__span">Имя</span>
            <input
              name="name"
              placeholder="Имя"
              className={`profile__input${
                profileEdit ? ' profile__input_type_active' : ''}${
                !name.inputValid ? ' profile__input_type_error' : ''
              }`}
              type="text"
              maxLength={40}
              minLength={2}
              value={name.value}
              onFocus={(e) => name.onFocus(e)}
              onChange={(e) => name.onChange(e)}
              noValidate
            />
            <span className={`profile__span profile__span_type_auth profile__span_type_hidden${
              !name.inputValid && name.isDirty ? ' profile__span_type_error' : ''
            }`}
            >
              {name.errText}
            </span>
          </label>
          <label htmlFor="email" className="profile__label">
            <span className="profile__span">E-mail</span>
            <input
              name="email"
              placeholder="E-mail"
              className={`profile__input${profileEdit ? ' profile__input_type_active' : ''}${
                !email.inputValid ? ' profile__input_type_error' : ''
              }`}
              value={email.value}
              type="email"
              onFocus={(e) => email.onFocus(e)}
              onChange={(e) => email.onChange(e)}
              noValidate
            />
            <span className={`profile__span profile__span_type_auth profile__span_type_hidden${
              !email.inputValid && email.isDirty ? ' profile__span_type_error' : ''
            }`}
            >
              {email.errText}

            </span>
          </label>
          <ul className={`profile__buttons${
            profileEdit ? ' profile__buttons_type_active' : ''
          }`}
          >
            <li>
              <button
                className={`button profile__button profile__button_type_edit${
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
                className={`button profile__button profile__button_type_logout${
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
