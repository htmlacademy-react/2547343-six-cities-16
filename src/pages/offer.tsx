import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../hooks/index.ts';
import { fetchCommentsAction, fetchNearbyOffersAction, fetchOfferAction } from '../services/api-actions.ts';
import { selectComments, selectNearbyOffers, selectOffer, selectOfferLoadingStatus } from '../store/slices/offer-slice.ts';
import NearOffers from '../components/near-offers/near-offers.tsx';
import CommentsList from '../components/comments-list/comments-list.tsx';
import Header from '../components/header/header.tsx';
import OfferImage from '../components/offer-image/offer-image.tsx';
import Map from '../components/map/map.tsx';
import OfferLoading from '../components/offer-loading/offer-loading.tsx';
import FavoritesButton from '../components/favorite-button/favorite-button.tsx';
import { MapType, AppRoute } from '../constants.ts';
import { formatRating } from '../utils.ts';
import cn from 'classnames';

type OfferScreenProps = {
  hasNavigation: boolean;
}

function OfferScreen({ hasNavigation }: OfferScreenProps): JSX.Element {
  const params = useParams();
  const offerId = params.id!;

  const offerLoadingStatus = useAppSelector(selectOfferLoadingStatus);

  const comments = useAppSelector(selectComments);
  const dispatch = useAppDispatch();
  const offerData = useAppSelector(selectOffer);
  useEffect(() => {
    if (offerLoadingStatus === 'notLoaded'
      || (offerData !== null && offerData.id !== offerId)) {
      dispatch(fetchOfferAction(offerId));
      dispatch(fetchNearbyOffersAction(offerId));
      dispatch(fetchCommentsAction(offerId));
    }

  }, [dispatch, offerId, offerLoadingStatus]);

  const nearbyOffers = useAppSelector(selectNearbyOffers);

  if (offerLoadingStatus === 'notLoaded' || offerLoadingStatus === 'loading') {
    return (
      <OfferLoading />
    );
  } else if (offerLoadingStatus === 'loadingError') {

    return (
      <Navigate to={AppRoute.Error} />
    );

  } else {

    if (offerId !== undefined && offerData !== null) {

      const currentCityData = offerData.city;
      const ratingInStarsFormat: string = formatRating(offerData.rating);
      const bedroomLabel = offerData.bedrooms > 1
        ? `${offerData.bedrooms} Bedrooms`
        : '1 Bedroom';

      const adultsLabel = offerData.maxAdults > 1
        ? `Max ${offerData.maxAdults} adults`
        : 'Max 1 adilt';

      const nearbyOffersForMap = nearbyOffers.slice(0, 3);
      nearbyOffersForMap.push(offerData);

      return (
        <div className="page">
          <Helmet>
            <title>{offerData.title}</title>
          </Helmet>

          <Header hasNavigation={hasNavigation} />

          <main className="page__main page__main--offer">
            <section className="offer">
              <div className="offer__gallery-container container">
                <div className="offer__gallery">
                  {offerData.images.slice(0, 6).map((item) => (
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

                    <FavoritesButton offerData={offerData} type={'offer'} />

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
                      {bedroomLabel}
                    </li>
                    <li className="offer__feature offer__feature--adults">
                      {adultsLabel}
                    </li>
                  </ul>
                  <div className="offer__price">
                    <b className="offer__price-value">€{offerData.price}</b>
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
                      <div className={cn(
                        'offer__avatar-wrapper',
                        'user__avatar-wrapper',
                        { 'offer__avatar-wrapper--pro': offerData.host.isPro }
                      )}
                      >
                        <img className="offer__avatar user__avatar" src={offerData.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                      </div>
                      <span className="offer__user-name">
                        {offerData.host.name}
                      </span>
                      {offerData.host.isPro &&
                        <span className="offer__user-status">
                          Pro
                        </span>}
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
              <Map cityData={currentCityData} mapType={MapType.Offer} offers={nearbyOffersForMap} selectedPoint={offerData.id} />
            </section>
            <div className="container">

              <NearOffers offersData={nearbyOffers} />

            </div>
          </main>
        </div >
      );
    } else {

      return (
        <Navigate to={AppRoute.Error} />
      );
    }
  }
}

export default OfferScreen;
