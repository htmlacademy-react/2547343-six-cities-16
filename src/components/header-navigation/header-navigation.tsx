import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUserEmail, selectAutorizationStatus } from '../../store/slices/authorization-slice';
import { AuthorizationStatus } from '../../constants';
import { fetchFavoriteAction, logoutAction } from '../../services/api-actions';
import { selectFavorite } from '../../store/slices/favorite-slice';

function HeaderNavigation(): JSX.Element {

  const email = useAppSelector(selectUserEmail);
  const authStatus = useAppSelector(selectAutorizationStatus);
  const isAuthorized = authStatus === AuthorizationStatus.Auth;

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isAuthorized) {
      console.log('dispatch favotires');
      dispatch(fetchFavoriteAction());
    }
  }, [isAuthorized]);

  const favoritesCount = useAppSelector(selectFavorite).length;

  const handleClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    < nav className="header__nav" >
      <ul className="header__nav-list">

        {/* пользователь авторизован */}
        {isAuthorized ?
          <React.Fragment>
            <li className="header__nav-item user">
              <a className="header__nav-link header__nav-link--profile" href="#">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <Link to={AppRoute.Favorites} className="header__user-name user__name">{email}</Link>
                <span className="header__favorite-count">{favoritesCount}</span>
              </a>
            </li>
            <li className="header__nav-item">
              <a onClick={handleClick} className="header__nav-link" href="#">
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </React.Fragment>
          :/*пользователь не авторизован*/
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
