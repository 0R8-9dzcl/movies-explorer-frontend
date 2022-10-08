import { useState } from 'react';
import UserForm from '../UserForm/UserForm';

function Register({ pathname, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdateName = (e) => {
    setName(e.target.value);
  };
  const handleUpdateEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleUpdatePassword = (e) => {
    setPassword(e.target.value);
  };
  const registerHandler = (e) => {
    e.preventDefault();
    onSubmit(name, email, password);
  };
  return (
    <main>
      <section className="profile profile_type_auth">
        <UserForm
          formName="register"
          boolean
          title="Добро пожаловать!"
          submitText="Зарегистрироваться"
          question="Уже зарегистрированы?"
          route="/signin"
          linkText="Войти"
          onSubmit={registerHandler}
          pathname={pathname}
        >
          <label htmlFor="name" className="profile__label profile__label_type_auth">
            <span className="profile__span profile__span_type_auth">Имя</span>
            <input
              name="name"
              placeholder="Имя"
              className="profile__input profile__input_type_auth"
              type="text"
              minLength="2"
              maxLength="40"
              onChange={handleUpdateName}
              required
            />
            <span className="profile__span profile__span_type_auth profile__span_type_hidden">Ошибка</span>
          </label>
          <label htmlFor="email" className="profile__label profile__label_type_auth">
            <span className="profile__span profile__span_type_auth">E-mail</span>
            <input
              name="email"
              placeholder="E-mail"
              className="profile__input profile__input_type_auth"
              type="email"
              onChange={handleUpdateEmail}
              required
            />
            <span className="profile__span profile__span_type_auth profile__span_type_hidden">Ошибка</span>
          </label>
          <label htmlFor="email" className="profile__label profile__label_type_auth">
            <span className="profile__span profile__span_type_auth">Пароль</span>
            <input
              name="password"
              placeholder="Пароль"
              className="profile__input profile__input_type_auth"
              type="password"
              onChange={handleUpdatePassword}
              required
            />
            <span className="profile__span profile__span_type_auth profile__span_type_hidden">Что-то пошло не так...</span>
          </label>
        </UserForm>
      </section>
    </main>
  );
}
export default Register;
