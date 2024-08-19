import { useRef, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/header.tsx';
import { useAppSelector, useAppDispatch } from '../hooks/index.ts';
import { selectCity } from '../store/slices/city-slice.ts';
import { loginAction } from '../services/api-actions.ts';
import { AppRoute } from '../constants.ts';

type LoginScreenProps = {
  hasNavigation: boolean;
  isAuthorized: boolean;
}

function LoginScreen({ hasNavigation, isAuthorized }: LoginScreenProps): JSX.Element {
  const currentCity = useAppSelector(selectCity);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        email: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header hasNavigation={hasNavigation} isAuthorized={isAuthorized} />
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
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              // onClick={() => navigate(AppRoute.Main)}
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
