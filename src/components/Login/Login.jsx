import UserForm from '../UserForm/UserForm';

function Login() {
  return (
    <main>
      <section className="profile profile_type_auth">
        <UserForm
          boolean
          title="Рады видеть!!"
          submitText="Войти"
          question="Ещё не зарегистрированы?"
          route="/signup"
          linkText="Регистрация"
        >
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
              className="profile__input profile__input_type_auth"
              type="password"
              required
            />
          </label>
          <span className="profile__span profile__span_type_auth profile__span_type_hidden">Ошибка</span>
        </UserForm>
      </section>
    </main>
  );
}
export default Login;
