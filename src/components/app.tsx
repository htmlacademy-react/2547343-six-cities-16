import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import MainScreen from '../pages/main';
import LoginScreen from '../pages/login';
import FavoritesScreen from '../pages/favorites';
import OfferScreen from '../pages/offer';
import ErrorScreen from '../pages/error';
import { AppRoute, AuthorizationStatus } from '../constants';
import PrivateRoute from './private-route/private-route';
import { FavoritesDataType, CityDataType, ReviewItemType } from '../types';
import { store, setOffers, selectOffers } from '../store';
import { offerMocks } from '../mocks/offer';

type AppProps = {
  cities: { id: string; name: string }[];
  favoritesData: FavoritesDataType[];
  citiesData: CityDataType[];
  reviewData: ReviewItemType[];
}

function App({ cities, favoritesData, citiesData, reviewData }: AppProps): JSX.Element {

  // Лектор на разборе домашней работы сделал загрузку данных через useEffect,
  // но что так, что так данные перезгружаются на любое движение,
  // это не важно потому что потом мы будем их выгружать с сервера и это исправим
  // или это сейчас уже надо было сделать иначе?

  const dispatch = store.dispatch;
  dispatch(setOffers(offerMocks));

  const router = createBrowserRouter([
    {
      path: AppRoute.Main,
      element:
        <MainScreen cities={cities} hasNavigation offersData={selectOffers(store.getState())} citiesData={citiesData} />,
      errorElement: <ErrorScreen />,
    },
    {
      path: AppRoute.Login,
      element:
        <LoginScreen hasNavigation={false} />
    },
    {
      path: AppRoute.Favorites,
      element:
        <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
          <FavoritesScreen favoritesData={favoritesData} hasNavigation />
        </PrivateRoute>
    },
    {
      path: AppRoute.Offer,
      element:
        <OfferScreen hasNavigation reviewsData={reviewData} />
    }
  ]);

  return <RouterProvider router={router} />;

}

export default App;
