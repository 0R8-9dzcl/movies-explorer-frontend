import useInput from '../../CustomHoocks/FormFalidator';
import UserForm from '../UserForm/UserForm';

function Register({
  pathname, onSubmit, reqMess, disableForm,
}) {
  const name = useInput('', {
    isEmpty: false, minLength: 2, maxLength: 30,
  });
  const email = useInput('', { isEmpty: false, isEmail: true });
  const password = useInput('', { isEmpty: false });
  const registerHandler = (e) => {
    e.preventDefault();
    onSubmit(name.value, email.value, password.value);
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
          reqMess={reqMess}
          disabledButton={
            !email.inputValid || !name.inputValid || !password.inputValid || disableForm
          }
        >
          <label htmlFor="name" className="profile__label profile__label_type_auth">
            <span className="profile__span profile__span_type_auth">Имя</span>
            <input
              name="name"
              placeholder="Имя"
              className={`profile__input profile__input_type_auth${
                !name.inputValid ? ' profile__input_type_error' : ''
              }`}
              type="text"
              minLength="2"
              maxLength="40"
              onFocus={(e) => name.onFocus(e)}
              onChange={(e) => name.onChange(e)}
              required
              noValidate
            />
            <span className={`profile__span profile__span_type_auth profile__span_type_hidden${
              !name.inputValid && name.isDirty ? ' profile__span_type_error' : ''
            }`}
            >
              {name.errText}
            </span>
          </label>
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
              {email.errText}
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
            <span className={`profile__span profile__span_type_auth profile__span_type_hidden${
              !password.inputValid && password.isDirty ? ' profile__span_type_error' : ''
            }`}
            >
              {password.errText}
            </span>
          </label>
        </UserForm>
      </section>
    </main>
  );
}
export default Register;
