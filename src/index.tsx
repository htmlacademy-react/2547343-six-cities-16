import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { data } from './components/settings/settings';
import { favoritesMocks } from './mocks/favorites';
import { reviewMocks } from './mocks/reviews';
import { cityCoordinatesMocks } from './mocks/city-coordinates';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        cities={data.cities}
        favoritesData={favoritesMocks}
        citiesData={cityCoordinatesMocks}
        reviewData={reviewMocks}
      />
    </Provider>
  </React.StrictMode>
);
