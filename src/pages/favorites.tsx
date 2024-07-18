import Header from '../components/header/header.tsx';
import FavoritesCard from '../components/favorites-card/favorites-card.tsx';
import Footer from '../components/footer/footer';

type FavoriteScreenProps = {
  hasNavigation: boolean;
}
function FavoritesScreen({ hasNavigation }: FavoriteScreenProps): JSX.Element {
  return (

    <div className="page">
      <Header hasNavigation={hasNavigation} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <FavoritesCard />
                  <FavoritesCard />
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <FavoritesCard />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesScreen;
