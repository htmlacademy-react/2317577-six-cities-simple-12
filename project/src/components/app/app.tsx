import { Route, Routes } from 'react-router-dom';
import { Approute } from '../../constants/const';
import { Reviews } from '../../types/reviews';
import { useAppSelector } from '../../hooks/redux';
import MainScreen from '../../pages/main-screen/main-screen';
import Login from '../../pages/login/Login';
import Room from '../../pages/room/Room';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import LoadingScreen from '../../pages/loading-screen/LoadingScreen';
import HistoryRouter from '../history-router/History-Router';
import browserHistory from '../../services/browser-history';
import { getOffersLoadingStatus } from '../../store/offers/selectors';

type AppScreenProps = {
  reviews: Reviews;
};

function App({ reviews }: AppScreenProps): JSX.Element {
  const areOffersLoading = useAppSelector(getOffersLoadingStatus);

  if (areOffersLoading) {
    return <LoadingScreen />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={Approute.Main} element={<MainScreen />} />
        <Route path={Approute.Room} element={<Room reviews={reviews} />} />
        <Route path={Approute.Login} element={<Login />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
