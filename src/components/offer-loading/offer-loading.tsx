export default function OfferLoading(): JSX.Element {

  return (
    <div>
      <div className="page" style={{
        filter: 'blur(6px)',
      }}
      >
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
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                <div className="offer__image-wrapper">
                  <img className="offer__image" src="../../img/apartment-01.jpg" alt="Photo studio" />
                </div>
                <div className="offer__image-wrapper">
                  <img className="offer__image" src="../../img/apartment-02.jpg" alt="Photo studio" />
                </div>
                <div className="offer__image-wrapper">
                  <img className="offer__image" src="../../img/apartment-03.jpg" alt="Photo studio" />
                </div>
                <div className="offer__image-wrapper">
                  <img className="offer__image" src="../../img/apartment-01.jpg" alt="Photo studio" />
                </div>
                <div className="offer__image-wrapper">
                  <img className="offer__image" src="../../img/apartment-02.jpg" alt="Photo studio" />
                </div>
                <div className="offer__image-wrapper">
                  <img className="offer__image" src="../../img/apartment-03.jpg" alt="Photo studio" />
                </div>
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">Loft Studio in the Central Area</h1>
                  <button className="offer__bookmark-button button" type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33"><use href="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">In bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: '34%' }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">1.7</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">apartment</li>
                  <li className="offer__feature offer__feature--bedrooms">5 Bedrooms</li><li className="offer__feature offer__feature--adults">Max 3 adults</li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">156</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What{'&apos;'}s inside</h2>
                  <ul className="offer__inside-list">
                    <li className="offer__inside-item">Heating</li>
                    <li className="offer__inside-item">Kitchen</li>
                    <li className="offer__inside-item">Towels</li>
                    <li className="offer__inside-item">Breakfast</li>
                    <li className="offer__inside-item">Fridge</li>
                    <li className="offer__inside-item">Wi-Fi</li>
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper"><img className="offer__avatar user__avatar" src="../../img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">Angelina</span>
                    <span className="offer__user-status"></span>
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
