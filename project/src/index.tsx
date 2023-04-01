import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {reviews} from './mocks/reviews';
import {store} from './store';
import {cities} from './mocks/cities';

const Settings = {
  placesCount: 5,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App placesCount={Settings.placesCount} reviews={reviews} cities={cities} />
    </Provider>
  </React.StrictMode>
);
