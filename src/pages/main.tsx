import Header from '../components/header/header.tsx';
import OfferList from '../components/offer-list/offer-list.tsx';
import LocationsList from '../components/locations-list/locations-list.tsx';
import Map from '../components/map/map.tsx';
import { useParams } from 'react-router-dom';
import { MapDataType, OfferCardType } from '../types.ts';
import { useState } from 'react';

type MainScreenProps = {
  cities: { id: string; name: string }[];
  hasNavigation: boolean;
  offersData: OfferCardType[];
  mapData: MapDataType;
}

function MainScreen({ cities, hasNavigation, offersData, mapData }: MainScreenProps): JSX.Element {
  const params = useParams();
  const hasOfferData: boolean = offersData.length > 0;
  const [activeOffer, setActiveOffer] = useState('');

  return (
    <div className="page page--gray page--main">

      <Header hasNavigation={hasNavigation} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">

          <LocationsList cities={cities} activeCity={params.city || 'amsterdam'} />

        </div>

        {/* есть предожения */}
        {hasOfferData &&
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">312 places to stay in Amsterdam</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>

                <OfferList offersData={offersData} setActiveOffer={setActiveOffer} />

              </section>
              <Map mapData={mapData} points={offersData} selectedPoint={activeOffer} />

            </div>
          </div>}

        {/* нет предложений */}
        {!hasOfferData &&
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          </div>}
      </main>
    </div >
  );
}

export default MainScreen;
