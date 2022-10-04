import UserForm from '../UserForm/UserForm';

function Register({ pathname }) {
  return (
    <main>
      <section className="profile profile_type_auth">
        <UserForm
          boolean
          title="Добро пожаловать!"
          submitText="Зарегистрироваться"
          question="Уже зарегистрированы?"
          route="/signin"
          linkText="Войти"
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
              required
            />
            <span className="profile__span profile__span_type_auth profile__span_type_hidden">Ошибка</span>
          </label>
          <label htmlFor="email" className="profile__label profile__label_type_auth">
            <span className="profile__span profile__span_type_auth">Пароль</span>
            <input
              name="password"
              placeholder="Пароль"
              className="profile__input profile__input_type_auth profile__input_type_error"
              type="password"
              required
            />
            <span className="profile__span profile__span_type_auth profile__span_type_error profile__span_type_hidden">Что-то пошло не так...</span>
          </label>
        </UserForm>
      </section>
    </main>
  );
}
export default Register;
