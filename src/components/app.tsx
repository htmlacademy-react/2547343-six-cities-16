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

type AppProps = {
  placeCardsCount: number;
  cities: { id: string; name: string }[];
}

function App({ placeCardsCount, cities }: AppProps): JSX.Element {
  const router = createBrowserRouter([
    {
      path: AppRoute.Main,
      element:
        <MainScreen placeCardsCount={placeCardsCount} cities={cities} hasNavigation />,
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
        <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
          <FavoritesScreen />
        </PrivateRoute>
    },
    {
      path: AppRoute.Offer,
      element:
        <OfferScreen hasNavigation />
    }
  ]);

  return <RouterProvider router={router} />;

}


export default App;
