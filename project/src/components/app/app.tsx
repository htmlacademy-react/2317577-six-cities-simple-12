import { Route, Routes } from 'react-router-dom';
import { Approute } from '../../constants/const';
import { useAppSelector } from '../../hooks/redux';
import MainScreen from '../../pages/main-screen/main-screen';
import Login from '../../pages/login/Login';
import Room from '../../pages/room/Room';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import LoadingScreen from '../../pages/loading-screen/LoadingScreen';
import { getOffersLoadingStatus } from '../../store/offers/selectors';

function App(): JSX.Element {
  const areOffersLoading = useAppSelector(getOffersLoadingStatus);

  if (areOffersLoading) {
    return <LoadingScreen />;
  }

  return (
      <Routes>
        <Route path={Approute.Main} element={<MainScreen />} />
        <Route path={Approute.Room} element={<Room />} />
        <Route path={Approute.Login} element={<Login />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
  );
}

export default App;
