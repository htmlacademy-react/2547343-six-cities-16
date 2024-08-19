import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks';
import { selectUserEmail } from '../../store/slices/authorization-slice';
type HeaderNavigationProps = {
  isAuthorized: boolean;
}

function HeaderNavigation({ isAuthorized }: HeaderNavigationProps): JSX.Element {

  const email = useAppSelector(selectUserEmail);
  console.log('email ', email)

  return (
    < nav className="header__nav" >
      <ul className="header__nav-list">
        {isAuthorized &&
          <li className="header__nav-item user">
            <a className="header__nav-link header__nav-link--profile" href="#">
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
