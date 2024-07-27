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
import { OfferCardType, FavoritesDataType, MapDataType } from '../types';

type AppProps = {
  cities: { id: string; name: string }[];
  offersData: OfferCardType[];
  favoritesData: FavoritesDataType[];
  mapData: MapDataType;
}

function App({ cities, offersData, favoritesData, mapData }: AppProps): JSX.Element {
  const router = createBrowserRouter([
    {
      path: AppRoute.Main,
      element:
        <MainScreen cities={cities} hasNavigation offersData={offersData} mapData={mapData} />,
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
        <OfferScreen hasNavigation mapData={mapData} />
    }
  ]);

  return <RouterProvider router={router} />;

}

export default App;
