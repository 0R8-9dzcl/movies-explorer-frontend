import './UserForm.css';
import { Link } from 'react-router-dom';

function UserForm({
  formName,
  children,
  onSubmit,
  boolean,
  title,
  submitText,
  question,
  route,
  linkText,
  pathname,
  disabledButton,
  reqMess,
}) {
  const checkLocation = (pathname === '/profile');
  return (
    <form className={`profile__form${checkLocation ? '' : ' profile__form_type_auth'}`} name={formName} onSubmit={onSubmit}>
      <h2 className={`profile__title${checkLocation ? '' : ' profile__title_type_auth'}`}>{title}</h2>
      {children}
      <div className="profile__button-container">
        <span className={`profile__span profile__span_type_submit${
          reqMess.err ? ' profile__span_type_err-submit' : ''}`}
        >
          {reqMess.mess}
        </span>
        <button
          className={`button profile__button profile__button_type_submit ${
            boolean ? ' profile__button_type_active' : ''
          }`}
          type="submit"
          name="submit"
          disabled={disabledButton}
        >
          {submitText}
        </button>
        {question && (
          <p className="profile__question">
            {question}
            <Link className="link profile__link" to={route}>{linkText}</Link>
          </p>
        )}
      </div>
    </form>
  );
}

export default UserForm;
