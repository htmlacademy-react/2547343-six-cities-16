import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUserEmail, selectAutorizationStatus } from '../../store/slices/authorization-slice';
import { AuthorizationStatus } from '../../constants';
import { logoutAction } from '../../services/api-actions';

function HeaderNavigation(): JSX.Element {

  const email = useAppSelector(selectUserEmail);
  const authStatus = useAppSelector(selectAutorizationStatus);
  const isAuthorized = authStatus === AuthorizationStatus.Auth;

  // добавила тут loguot для тестирования
  // потом уберу
  const dispatch = useAppDispatch();
  const handleClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    < nav className="header__nav" >
      <ul className="header__nav-list">
        {isAuthorized &&
          <li className="header__nav-item user">
            <a onClick={handleClick} className="header__nav-link header__nav-link--profile" href="#">
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__user-name user__name">{email}</span>
              <span className="header__favorite-count">3</span>
            </a>
          </li>}

        {!isAuthorized &&
          <li className="header__nav-item user">
            <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile" >
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>}
      </ul>
    </nav >
  );
}

export default HeaderNavigation;
