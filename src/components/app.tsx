import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import { useEffect } from 'react';
import MainScreen from '../pages/main/main';
import LoginScreen from '../pages/login/login';
import FavoritesScreen from '../pages/favorites/favorites';
import OfferScreen from '../pages/offer/offer';
import ErrorScreen from '../pages/error/error';
import MainWrapper from './main-wrapper/main-wrapper';
import FavoritePrivateRoute from './favorite-private-route/favorite-private-route';
import LoginPublicRoute from './login-public-route/login-public-route';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectOffers } from '../store/slices/offers-slice';
import { fetchOffersAction } from '../services/api-actions';
import { selectAutorizationStatus } from '../store/slices/authorization-slice';
import { AppRoute } from '../constants';

type AppProps = {
  cities: { id: string; name: string }[];
}

function App({ cities }: AppProps): JSX.Element {

  const authStatus = useAppSelector(selectAutorizationStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch, authStatus]);
  const offers = useAppSelector(selectOffers);

  const router = createBrowserRouter([
    {
      path: AppRoute.Main,
      element:
        <MainScreen cities={cities} hasNavigation offersData={offers} />,
      errorElement: <ErrorScreen />
    },
    {
      path: AppRoute.MainWithParams,
      element:
        <MainWrapper>
          <MainScreen cities={cities} hasNavigation offersData={offers} />
        </MainWrapper>,
      errorElement: <ErrorScreen />,
    },
    {
      path: AppRoute.Login,
      element:
        <LoginPublicRoute>
          <LoginScreen hasNavigation={false} />
        </LoginPublicRoute>
    },
    {
      path: AppRoute.Favorites,
      element:
        <FavoritePrivateRoute>
          <FavoritesScreen hasNavigation />
        </FavoritePrivateRoute>
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
