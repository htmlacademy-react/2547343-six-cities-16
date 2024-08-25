import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { data } from './components/settings/settings';
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
      />
    </Provider>
  </React.StrictMode>
);
