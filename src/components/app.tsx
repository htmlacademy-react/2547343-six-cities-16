import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { useEffect } from 'react';
import MainScreen from '../pages/main';
import LoginScreen from '../pages/login';
import FavoritesScreen from '../pages/favorites';
import OfferScreen from '../pages/offer';
import ErrorScreen from '../pages/error';
import { AppRoute } from '../constants';
import PrivateRoute from './private-route/private-route';
import { FavoritesDataType } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectOffers } from '../store/slices/offer-slice';
import { fetchOffersAction } from '../services/api-actions';

type AppProps = {
  cities: { id: string; name: string }[];
  favoritesData: FavoritesDataType[];
}

function App({ cities, favoritesData }: AppProps): JSX.Element {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);
  const offers = useAppSelector(selectOffers);

  const router = createBrowserRouter([
    {
      path: AppRoute.Main,
      element:
        <MainScreen cities={cities} hasNavigation offersData={offers} />,
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
        <PrivateRoute>
          <FavoritesScreen favoritesData={favoritesData} hasNavigation />
        </PrivateRoute>
    },
    {
      path: AppRoute.Offer,
      element:
        <OfferScreen hasNavigation />
    },
    {
      path: AppRoute.Error,
      element:
        <ErrorScreen />
    }
  ]);

  return <RouterProvider router={router} />;

}

export default App;
