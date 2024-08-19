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
import { AppRoute, AuthorizationStatus } from '../constants';
import PrivateRoute from './private-route/private-route';
import { FavoritesDataType, ReviewItemType } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectOffers } from '../store/slices/offer-slices';
import { selectAutorizationStatus } from '../store/slices/authorization-slice';
import { fetchOffersAction, checkAuthAction } from '../services/api-actions';

type AppProps = {
  cities: { id: string; name: string }[];
  favoritesData: FavoritesDataType[];
  reviewData: ReviewItemType[];
}

function App({ cities, favoritesData, reviewData }: AppProps): JSX.Element {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(checkAuthAction());
  }, [dispatch]);
  const offers = useAppSelector(selectOffers);
  const authStatus = useAppSelector(selectAutorizationStatus);
  console.log('authStatus ', authStatus)
  const isAutorized = authStatus === AuthorizationStatus.Auth;

  const router = createBrowserRouter([
    {
      path: AppRoute.Main,
      element:
        <MainScreen cities={cities} hasNavigation offersData={offers} isAuthorized={isAutorized} />,
      errorElement: <ErrorScreen isAuthorized={isAutorized} />,
    },
    {
      path: AppRoute.Login,
      element:
        <LoginScreen hasNavigation={false} isAuthorized={isAutorized} />
    },
    {
      path: AppRoute.Favorites,
      element:
        <PrivateRoute authorizationStatus={authStatus}>
          <FavoritesScreen favoritesData={favoritesData} hasNavigation isAuthorized={isAutorized} />
        </PrivateRoute>
    },
    {
      path: AppRoute.Offer,
      element:
        <OfferScreen hasNavigation reviewsData={reviewData} isAuthorized={isAutorized} />
    }
  ]);

  return <RouterProvider router={router} />;

}

export default App;
