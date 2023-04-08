import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {reviews} from './mocks/reviews';
import {store} from './store';
import {fetchOffersAction} from './store/asyncActions';
import {ToastContainer} from 'react-toastify';

store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App reviews={reviews} />
    </Provider>
  </React.StrictMode>
);
