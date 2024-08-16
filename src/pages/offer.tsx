// import OfferList from '../components/offer-list/offer-list.tsx';
import ReviewList from '../components/review-list/review-list.tsx';
import Header from '../components/header/header.tsx';
import OfferImage from '../components/offer-image/offer-image.tsx';
import Map from '../components/map/map.tsx';
import { useParams, Navigate } from 'react-router-dom';
import { OfferType, ReviewItemType } from '../types.ts';
import { MapType } from '../constants.ts';
import { useAppSelector } from '../hooks/index.ts';
import { selectOffers } from '../store';
import { AppRoute } from '../constants.ts';

type OfferScreenProps = {
  hasNavigation: boolean;
  reviewsData: ReviewItemType[];
}

function OfferScreen({ hasNavigation, reviewsData }: OfferScreenProps): JSX.Element {
  const params = useParams();

  const offersData = useAppSelector(selectOffers);
  const offerData = offersData.find((offer) => offer.id === params.id);

  if (offerData !== undefined) {

    const restOfferData: OfferType[] = offersData.filter((el: OfferType) => {
      if (el.city.name === offerData.city.name && el.id !== params.id) {
        return el;
      }
    });

    const currentCityData = offerData.city;

    const ratingInStarsFormat: string = String(offerData.rating * 20);


    return (
      <div className="page">

        <Header hasNavigation={hasNavigation} />

        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">

                {Array.from({ length: 6 }, (_, index) => (
                  <OfferImage src="img/room.jpg" altName="Photo studio" key={index} />
                ))}

              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offerData.isPremium &&
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offerData.title}
                  </h1>
                  <button className="offer__bookmark-button button" type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${ratingInStarsFormat}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offerData.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offerData.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    3 Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max 4 adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">{offerData.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    <li className="offer__inside-item">
                      Wi-Fi
                    </li>
                    <li className="offer__inside-item">
                      Washing machine
                    </li>
                    <li className="offer__inside-item">
                      Towels
                    </li>
                    <li className="offer__inside-item">
                      Heating
                    </li>
                    <li className="offer__inside-item">
                      Coffee machine
                    </li>
                    <li className="offer__inside-item">
                      Baby seat
                    </li>
                    <li className="offer__inside-item">
                      Kitchen
                    </li>
                    <li className="offer__inside-item">
                      Dishwasher
                    </li>
                    <li className="offer__inside-item">
                      Cabel TV
                    </li>
                    <li className="offer__inside-item">
                      Fridge
                    </li>
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      Angelina
                    </span>
                    <span className="offer__user-status">
                      Pro
                    </span>
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The
                      building is green and from 18th century.
                    </p>
                    <p className="offer__text">
                      An independent House, strategically located between Rembrand Square and National Opera, but where the
                      bustle of the city comes to rest in this alley flowery and colorful.
                    </p>
                  </div>
                </div>
                <ReviewList reviewsData={reviewsData} />
              </div>
            </div>
            <Map cityData={currentCityData} mapType={MapType.Offer} offers={restOfferData} selectedPoint={params.id!} />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">

                {/* <OfferList offersData={restOfferData} /> */}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  } else {
    return (< Navigate to={AppRoute.Main} />);
  }
}

export default OfferScreen;
