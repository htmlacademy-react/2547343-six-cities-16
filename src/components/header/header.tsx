import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import HeaderNavigation from '../header-navigation/header-navigation';

type HeaderProps = {
  hasNavigation: boolean;
  isAuthorized: boolean;
}

function Header({ hasNavigation, isAuthorized }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {hasNavigation && <HeaderNavigation isAuthorized={isAuthorized} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
