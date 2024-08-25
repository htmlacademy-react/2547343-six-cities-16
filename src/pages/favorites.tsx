import Header from '../components/header/header.tsx';
import FavoritesCard from '../components/favorites-card/favorites-card.tsx';
import Footer from '../components/footer/footer';
import { OfferType } from '../types.ts';
import { useAppSelector } from '../hooks/index.ts';
import { selectFavorite, selectFavoriteLoadingStatus } from '../store/slices/favorite-slice.ts';

type FavoriteScreenProps = {
  hasNavigation: boolean;
}

function FavoritesScreen({ hasNavigation }: FavoriteScreenProps): JSX.Element {

  const favoriteData = useAppSelector(selectFavorite);
  const favoriteGroupedByCity = Object.groupBy(favoriteData, (data) => data.city.name);

  const isFavoriteLoading = useAppSelector(selectFavoriteLoadingStatus);
  console.log('favoriteData ', favoriteData);
  console.log('favoriteGroupedByCity ', favoriteGroupedByCity);

  const list = [];
  for (const city in favoriteGroupedByCity) {
    if (favoriteGroupedByCity[city] !== undefined) {
      list.push(
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
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

  if (isFavoriteLoading) {
    return (
      <div>Loading</div>
    );
  } else {
    return (

      <div className="page">
        <Header hasNavigation={hasNavigation} />

        <main className="page__main page__main--favorites">
          {list}
        </main>
        <Footer />
      </div>
    );
  }
}

export default FavoritesScreen;
