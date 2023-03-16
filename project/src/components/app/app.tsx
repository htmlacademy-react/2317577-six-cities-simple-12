import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {Approute} from '../../constants/const';
import {Offers} from '../../types/offers';
import {Reviews} from '../../types/reviews';
import MainScreen from '../../pages/main-screen/main-screen';
import Login from '../../pages/login/Login';
import Room from '../../pages/room/Room';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

type AppScreenProps = {
  placesCount: number;
  offers: Offers;
  reviews: Reviews;
};

function App({placesCount, offers, reviews}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Approute.Main} element={<MainScreen placesCount={placesCount} offers={offers} reviews={reviews}/>} />
        <Route path={Approute.Room} element={<Room offers={offers} reviews={reviews} />} />
        <Route path={Approute.Login} element={<Login />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
