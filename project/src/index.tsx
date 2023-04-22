import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {store} from './store';
import {checkAuthAction, fetchOffersAction} from './store/asyncActions';
import HistoryRouter from './components/history-router/History-Router';
import browserHistory from './services/browser-history';

store.dispatch(fetchOffersAction());

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
