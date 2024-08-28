import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUserEmail, selectAutorizationStatus } from '../../store/slices/authorization-slice';
import { AuthorizationStatus } from '../../constants';
import { fetchFavoriteAction, logoutAction } from '../../services/api-actions';
import { selectFavorite, selectUserNameLoadedFor, setUserNameLoadedFor } from '../../store/slices/favorite-slice';

function HeaderNavigation(): JSX.Element {

  const email = useAppSelector(selectUserEmail);
  const authStatus = useAppSelector(selectAutorizationStatus);
  const userNameLoadedFor = useAppSelector(selectUserNameLoadedFor);
  const isAuthorized = authStatus === AuthorizationStatus.Auth;

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      authStatus === AuthorizationStatus.Auth
      && userNameLoadedFor === null
    ) {
      dispatch(fetchFavoriteAction());
      dispatch(setUserNameLoadedFor(email));
    }
  }, [dispatch, authStatus, userNameLoadedFor, email]);

  const favoritesCount = useAppSelector(selectFavorite).length;

  const handleClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">

        {/* пользователь авторизован */}
        {isAuthorized ?
          <React.Fragment>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{email}</span>
                <span className="header__favorite-count">{favoritesCount}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <a onClick={handleClick} className="header__nav-link">
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </React.Fragment>
          :/*пользователь не авторизован*/
          <li className="header__nav-item user">
            <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>}
      </ul>
    </nav>
  );
}

export default HeaderNavigation;
