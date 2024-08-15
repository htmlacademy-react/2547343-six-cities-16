import Header from '../components/header/header.tsx';
import OfferList from '../components/offer-list/offer-list.tsx';
import LocationsList from '../components/locations-list/locations-list.tsx';
import Map from '../components/map/map.tsx';
import { useParams } from 'react-router-dom';
import { CityDataType, OfferType } from '../types.ts';
import { useState } from 'react';
import { MapType } from '../constants.ts';
import { DEFAULT_CITY, CITIES_NAME_MAP } from '../constants.ts';

type MainScreenProps = {
  cities: { id: string; name: string }[];
  hasNavigation: boolean;
  offersData: OfferType[];
  citiesData: CityDataType[];
}

function MainScreen({ cities, hasNavigation, offersData, citiesData }: MainScreenProps): JSX.Element {
  const params = useParams();
  const [activeOffer, setActiveOffer] = useState('');
  const selectedCity = DEFAULT_CITY.name;
  if (params.city !== undefined) {
    CITIES_NAME_MAP.get(params.city);
  }

  const filteredOffers = offersData.filter((offer) => offer.city.name === selectedCity);
  const hasOfferData: boolean = filteredOffers.length > 0;

  return (
    <div className="page page--gray page--main">

      <Header hasNavigation={hasNavigation} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">

          <LocationsList cities={cities} activeCity={selectedCity} />


        </div>

        {/* есть предожения */}
        {hasOfferData &&
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {selectedCity}</b>
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

              <div className="cities__right-section">
                <Map cityData={citiesData.find((city) => city.id === selectedCity)} mapType={MapType.Main} offers={offersData} selectedPoint={activeOffer} />

              </div>
            </div>
          </div>}

        {/* нет предложений */}
        {!hasOfferData &&
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {selectedCity}</p>
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
