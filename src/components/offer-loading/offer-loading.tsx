import './loader.css';

export default function OfferLoading(): JSX.Element {

  return (
    <div>
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active" href="/:city">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="/login">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="page__main page__main--offer">
          <section className="offer">

            <div className="offer__container offer__container--loading container">
              <div className="offer__wrapper offer__wrapper--loading">
                <span className="loader"></span>
                <b className="offer__status">Loading...</b>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
