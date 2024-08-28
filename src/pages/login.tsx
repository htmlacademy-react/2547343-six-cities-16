import { useRef, FormEvent, ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/header/header.tsx';
import { useAppDispatch } from '../hooks/index.ts';
import { loginAction } from '../services/api-actions.ts';
import { AppRoute, CITIES_NAME_MAP } from '../constants.ts';

const warningNoteStyle: React.CSSProperties = {
  position: 'absolute',
  left: '2px',
  marginTop: '-20px',
  color: '#b06758',
  fontSize: '12px',
};

type LoginScreenProps = {
  hasNavigation: boolean;
};

const regexForPassword = new RegExp(/(?=.*[0-9])(?=.*[a-z])/);

const isPasswordInvalid = (pass: string) => pass.length <= 2 || !regexForPassword.test(pass);

function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomElement<T>(array: T[] | readonly T[]): T {
  return array[getRandomInteger(0, array.length - 1)];
}

const getRandomCity = () => {
  const key = getRandomElement(Object.keys(CITIES_NAME_MAP));

  return {
    key,
    name: CITIES_NAME_MAP[key as keyof typeof CITIES_NAME_MAP],
  };
};

function LoginScreen({ hasNavigation }: LoginScreenProps): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [warningVisible, setWarningVisible] = useState(false);

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.replace(/\s+/g, '');

    evt.target.value = value;
    if (isPasswordInvalid(value)) {
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
        && !isPasswordInvalid(passwordRef.current.value)
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

  const randomCity = getRandomCity();

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
              <Link to={`${AppRoute.Main}${randomCity.key}`} className="locations__item-link">
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
