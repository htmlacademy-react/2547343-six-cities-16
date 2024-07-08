import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const placeCardsCount = 5;

root.render(
  <React.StrictMode>
    <App placeCardsCount={placeCardsCount} />
  </React.StrictMode>
);
