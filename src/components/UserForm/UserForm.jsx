import './UserForm.css';
import { Link } from 'react-router-dom';

function UserForm({
  children,
  onSubmit,
  boolean,
  title,
  submitText,
  question,
  route,
  linkText,
  pathname,
}) {
  const checkLocation = (pathname === '/profile');
  return (
    <form className={`profile__form${checkLocation ? '' : ' profile__form_type_auth'}`} onSubmit={onSubmit}>
      <h2 className={`profile__title${checkLocation ? '' : ' profile__title_type_auth'}`}>{title}</h2>
      {children}
      <div className={`profile__button-container ${
        boolean ? ' profile__button-container_type_active' : ''
      }`}
      >
        <button
          className="button profile__button profile__button_type_submit"
          type="submit"
          name="submit"
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
