import Header from '../components/header/header.tsx';
import FavoritesCard from '../components/favorites-card/favorites-card.tsx';
import Footer from '../components/footer/footer';
import { OfferType } from '../types.ts';
import { useAppSelector } from '../hooks/index.ts';
import { selectFavorite, selectFavoriteLoadingStatus } from '../store/slices/favorite-slice.ts';
import { Link } from 'react-router-dom';

type FavoriteScreenProps = {
  hasNavigation: boolean;
}

function FavoritesScreen({ hasNavigation }: FavoriteScreenProps): JSX.Element {

  const favoriteData = useAppSelector(selectFavorite);
  const favoriteGroupedByCity = Object.groupBy(favoriteData, (data) => data.city.name);

  const isFavoriteLoading = useAppSelector(selectFavoriteLoadingStatus);

  const list = [];

  for (const city in favoriteGroupedByCity) {
    if (favoriteGroupedByCity[city] !== undefined) {
      list.push(
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {favoriteGroupedByCity[city].map((offer: OfferType) => (
              <FavoritesCard offerData={offer} key={offer.id} />
            ))}
          </div>
        </li>
      );
    }
  }

  let content;

  if (isFavoriteLoading) {
    content = (<div>Loading</div>);

  } else if (favoriteData.length) {
    content = (
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        {list}
      </section>
    );
  } else {
    content = (
      <section className="favorites favorites--empty">
        <h1 className="visually-hidden">Favorites (empty)</h1>
        <div className="favorites__status-wrapper">
          <b className="favorites__status">Nothing yet saved.</b>
          <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
        </div>
      </section>);
  }

  return (

    <div className="page">
      <Header hasNavigation={hasNavigation} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {content}
        </div>
      </main>
      <Footer />
    </div>
  );


}

export default FavoritesScreen;
