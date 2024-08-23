import NearOffers from '../components/near-offers/near-offers.tsx';
import CommentsList from '../components/comments-list/comments-list.tsx';
import Header from '../components/header/header.tsx';
import OfferImage from '../components/offer-image/offer-image.tsx';
import Map from '../components/map/map.tsx';
import { useParams, Navigate } from 'react-router-dom';
import { MapType, AppRoute } from '../constants.ts';
import { useAppDispatch, useAppSelector } from '../hooks/index.ts';
import { formatRating } from '../utils.ts';
import { useEffect } from 'react';
import { fetchCommentsAction, fetchNearbyOffersAction, fetchOfferInDetailAction } from '../services/api-actions.ts';
import { selectComments, selectNearbyOffers, selectOffer, selectOfferLoadingStatus } from '../store/slices/offer-in-detail-slice.ts';
import cn from 'classnames';
import OfferLoading from '../components/offer-loading/offer-loading.tsx';

type OfferScreenProps = {
  hasNavigation: boolean;
}

function OfferScreen({ hasNavigation }: OfferScreenProps): JSX.Element {
  const params = useParams();
  const offerId = params.id;
  const dispatch = useAppDispatch();
  useEffect(() => {

    dispatch(fetchOfferInDetailAction(offerId));
    dispatch(fetchNearbyOffersAction(offerId));
    dispatch(fetchCommentsAction(offerId));
  }, [dispatch]);

  const isOfferLoading = useAppSelector(selectOfferLoadingStatus);
  const offerData = useAppSelector(selectOffer);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const comments = useAppSelector(selectComments);

  if (isOfferLoading) {
    return (
      <OfferLoading />
    );
  } else {
    if (offerId !== undefined && offerData !== null) {

      const currentCityData = offerData.city;

      const ratingInStarsFormat: string = formatRating(offerData.rating);


      return (
        <div className="page">

          <Header hasNavigation={hasNavigation} />

          <main className="page__main page__main--offer">
            <section className="offer">
              <div className="offer__gallery-container container">
                <div className="offer__gallery">
                  {offerData.images.map((item) => (
                    <OfferImage
                      src={item}
                      altName="Photo studio"
                      key={item}
                    />)
                  )}

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
                    <button
                      className={cn(
                        'offer__bookmark-button',
                        'button',
                        { 'offer__bookmark-button--active': offerData.isFavorite }
                      )}
                      type="button"
                    >
                      <svg className="offer__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">
                        {offerData.isFavorite ? 'To bookmarks' : 'In bookmarks'}
                      </span>
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
                      {`${offerData.bedrooms} Bedrooms`}
                    </li>
                    <li className="offer__feature offer__feature--adults">
                      {`Max ${offerData.maxAdults} adults`}
                    </li>
                  </ul>
                  <div className="offer__price">
                    <b className="offer__price-value">{offerData.price}</b>
                    <span className="offer__price-text">&nbsp;night</span>
                  </div>
                  <div className="offer__inside">
                    <h2 className="offer__inside-title">What&apos;s inside</h2>
                    <ul className="offer__inside-list">
                      {offerData.goods.map((item) => (
                        <li
                          className="offer__inside-item"
                          key={item}
                        >
                          {item}
                        </li>)
                      )}
                    </ul>
                  </div>
                  <div className="offer__host">
                    <h2 className="offer__host-title">Meet the host</h2>
                    <div className="offer__host-user user">
                      <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                        <img className="offer__avatar user__avatar" src={offerData.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                      </div>
                      <span className="offer__user-name">
                        {offerData.host.name}
                      </span>
                      <span className="offer__user-status">
                        {offerData.host.isPro}
                      </span>
                    </div>
                    <div className="offer__description">
                      <p className="offer__text">
                        {offerData.description}
                      </p>
                    </div>
                  </div>
                  <CommentsList comments={comments} />
                </div>
              </div>
              <Map cityData={currentCityData} mapType={MapType.Offer} offers={nearbyOffers} selectedPoint={offerData.id} />
            </section>
            <div className="container">

              <NearOffers offersData={nearbyOffers} />

            </div>
          </main>
        </div>
      );
    } else {
      return (
        <Navigate to={AppRoute.Error} />
      );
    }
  }
}

export default OfferScreen;
