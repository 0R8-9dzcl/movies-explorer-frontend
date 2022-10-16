import useInput from '../../CustomHoocks/FormFalidator';
import UserForm from '../UserForm/UserForm';

function Login({
  pathname, onSubmit, reqMess, disableForm,
}) {
  const email = useInput('', { isEmpty: false, isEmail: true });
  const password = useInput('', { isEmpty: false });

  const loginHandler = (e) => {
    e.preventDefault();
    onSubmit(email.value, password.value);
  };
  return (
    <main>
      <section className="profile profile_type_auth">
        <UserForm
          formName="login"
          boolean
          title="Рады видеть!!"
          submitText="Войти"
          question="Ещё не зарегистрированы?"
          route="/signup"
          linkText="Регистрация"
          onSubmit={loginHandler}
          pathname={pathname}
          reqMess={reqMess}
          disabledButton={!email.inputValid || !password.inputValid || disableForm}
        >
          <label htmlFor="email" className="profile__label profile__label_type_auth">
            <span className="profile__span profile__span_type_auth">E-mail</span>
            <input
              name="email"
              placeholder="E-mail"
              className={`profile__input profile__input_type_auth${
                !email.inputValid ? ' profile__input_type_error' : ''
              }`}
              type="email"
              onFocus={(e) => email.onFocus(e)}
              onChange={(e) => email.onChange(e)}
              required
              noValidate
            />
            <span className={`profile__span profile__span_type_auth profile__span_type_hidden${
              !email.inputValid && email.isDirty ? ' profile__span_type_error' : ''
            }`}
            >
              {password.errText}
            </span>
          </label>
          <label htmlFor="email" className="profile__label profile__label_type_auth">
            <span className="profile__span profile__span_type_auth">Пароль</span>
            <input
              name="password"
              placeholder="Пароль"
              className={`profile__input profile__input_type_auth${
                !password.inputValid ? ' profile__input_type_error' : ''
              }`}
              type="password"
              onFocus={(e) => password.onFocus(e)}
              onChange={(e) => password.onChange(e)}
              required
              noValidate
            />
          </label>
          <span className={`profile__span profile__span_type_auth profile__span_type_hidden${
            !password.inputValid && password.isDirty ? ' profile__span_type_error' : ''
          }`}
          >
            {password.errText}
          </span>
        </UserForm>
      </section>
    </main>
  );
}
export default Login;
