import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { citiesData } from './constants';
import { Provider } from 'react-redux';
import { store } from './store';
import { HelmetProvider } from 'react-helmet-async';
import { checkAuthAction } from './services/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App
          cities={citiesData.cities}
        />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
