import Header from '../components/header/header.tsx';
import MainOffers from '../components/main-offers/main-offers.tsx';
import LocationsList from '../components/locations-list/locations-list.tsx';
import Map from '../components/map/map.tsx';
import { useParams } from 'react-router-dom';
import { OfferType, SortingType } from '../types.ts';
import { useState, useEffect } from 'react';
import { MapType } from '../constants.ts';
import { DEFAULT_CITY, CITIES_NAME_MAP } from '../constants.ts';
import { defaultCityCoordinates } from '../mocks/city-coordinates.ts';
import { setCity } from '../store/slices/city-slice.ts';
import { selectOffersLoadingStatus, selectSortingMode } from '../store/slices/offer-slice.ts';
import { useAppDispatch, useAppSelector } from '../hooks/index.ts';
import Loading from '../components/loading/loading.tsx';

type MainScreenProps = {
  cities: { id: string; name: string }[];
  hasNavigation: boolean;
  offersData: OfferType[];
}

type CityKey = keyof typeof CITIES_NAME_MAP;
const OFFERS_FALLBACK = [] as OfferType[];

const filterOffers = (offers: OfferType[], city: string) => offers.filter((offer) => offer.city.name === city);

const sortOffersBySortingMode = (offers: OfferType[], sortMode: SortingType) => {
  switch (sortMode.name) {
    case 'Popular':
      return offers;
    case 'PriceLTH':
      return offers.toSorted((a, b) => a.price - b.price);
    case 'PriceHTL':
      return offers.toSorted((a, b) => b.price - a.price);
    case 'Rating':
      return offers.toSorted((a, b) => b.rating - a.rating);
  }
};

function MainScreen({ cities, hasNavigation, offersData }: MainScreenProps): JSX.Element {
  const params = useParams();
  const cityFromParams = params.city as CityKey;
  const [activeOffer, setActiveOffer] = useState('');

  let selectedCity = DEFAULT_CITY.name;
  if (params.city !== undefined) {
    selectedCity = CITIES_NAME_MAP[cityFromParams] || selectedCity;
  }

  const sortingMode = useAppSelector(selectSortingMode);
  const isOffersLoading = useAppSelector(selectOffersLoadingStatus);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCity(selectedCity));
  }, [selectedCity]);

  const filteredOffers = filterOffers(offersData, selectedCity);
  const hasOfferData: boolean = filteredOffers.length > 0;

  const sortedOffers = sortOffersBySortingMode(filteredOffers, sortingMode) ?? OFFERS_FALLBACK;


  if (isOffersLoading) {
    return (
      <div className="page page--gray page--main">

        <Header hasNavigation={hasNavigation} />

        <main className="page__main page__main--index page__main--index-empty">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">

            <LocationsList cities={cities} activeCity={selectedCity} />

          </div>

          <Loading />

        </main>
      </div >
    );

  }
  if (hasOfferData) {

    const selectedCityLocation = filteredOffers.find((offer) => offer.city.name === selectedCity);
    const selectedCityData = selectedCityLocation !== undefined ? selectedCityLocation.city : defaultCityCoordinates;
    /* есть предожения */
    return (
      <div className="page page--gray page--main">

        <Header hasNavigation={hasNavigation} />

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">

            <LocationsList cities={cities} activeCity={selectedCity} />

          </div>

          <div className="cities">
            <div className="cities__places-container container">

              <MainOffers offersData={sortedOffers} setActiveOffer={setActiveOffer} activeCity={selectedCity} />

              <div className="cities__right-section">
                <Map cityData={selectedCityData} mapType={MapType.Main} offers={sortedOffers} selectedPoint={activeOffer} />

              </div>
            </div>
          </div>
        </main>
      </div >
    );
  } else {

    /* нет предложений */
    return (
      <div className="page page--gray page--main">

        <Header hasNavigation={hasNavigation} />

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">

            <LocationsList cities={cities} activeCity={selectedCity} />

          </div>
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
          </div>
        </main>
      </div >
    );
  }
}
export default MainScreen;
