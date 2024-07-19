import Header from '../components/header/header.tsx';
import FavoritesCard from '../components/favorites-card/favorites-card.tsx';
import Footer from '../components/footer/footer';
import { FavoritesDataType, OfferCardType } from '../types.ts';

type FavoriteScreenProps = {
  favoritesData: FavoritesDataType[];
  hasNavigation: boolean;
}
function FavoritesScreen({ favoritesData, hasNavigation }: FavoriteScreenProps): JSX.Element {
  return (

    <div className="page">
      <Header hasNavigation={hasNavigation} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {favoritesData.map((data: FavoritesDataType) => (
                <li className="favorites__locations-items" key={data.city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{data.city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {data.offers.map((offer: OfferCardType) => (

                      <FavoritesCard offerData={offer} key={offer.id} />
                    ))}
                  </div>
                </li>
              )
              )}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesScreen;
