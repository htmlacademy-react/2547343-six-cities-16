import { useRef, FormEvent, ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/header/header.tsx';
import { useAppSelector, useAppDispatch } from '../hooks/index.ts';
import { selectCity } from '../store/slices/city-slice.ts';
import { loginAction } from '../services/api-actions.ts';
import { AppRoute } from '../constants.ts';

const warningNoteStyle: React.CSSProperties = {
  position: 'absolute',
  left: '2px',
  marginTop: '-20px',
  color: '#b06758',
  fontSize: '12px',
};

type LoginScreenProps = {
  hasNavigation: boolean;
}

const regexForPassword = new RegExp(/(?=.*[0-9])(?=.*[a-z])/);

const passwordValidation = (pass: string): boolean => pass.length <= 2 || !regexForPassword.test(pass);


function LoginScreen({ hasNavigation }: LoginScreenProps): JSX.Element {
  const currentCity = useAppSelector(selectCity);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [warningVisible, setWarningVisible] = useState(false);

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.replace(/\s+/g, '');

    evt.target.value = value;
    if (passwordValidation(value)) {
      setWarningVisible(true);
    } else {
      setWarningVisible(false);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null
      && passwordRef.current !== null) {

      if (
        loginRef.current.value !== ''
        && !passwordValidation(passwordRef.current.value)
      ) {
        dispatch(loginAction({
          email: loginRef.current.value,
          password: passwordRef.current.value
        }));
        navigate(AppRoute.Main);
      } else {
        passwordRef.current.value = '';
      }

    }

  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Six cities. Login.</title>
      </Helmet>
      <Header hasNavigation={hasNavigation} />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                  required
                  onChange={handlePasswordChange}
                />
                {warningVisible && <div style={warningNoteStyle}>Password must contain 3 or more letters and numbers!</div>}
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.Main} className="locations__item-link">
                <span>{currentCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
