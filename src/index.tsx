import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { data } from './components/settings/settings';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      placeCardsCount={data.placeCardsCount}
      cities={data.cities}
      hasNavigation={data.hasNavigation}
    />
  </React.StrictMode>
);
