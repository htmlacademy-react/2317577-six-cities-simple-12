import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {Approute} from '../../constants/const';
import {Reviews} from '../../types/reviews';
import {Cities} from '../../types/cities';
import MainScreen from '../../pages/main-screen/main-screen';
import Login from '../../pages/login/Login';
import Room from '../../pages/room/Room';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

type AppScreenProps = {
  placesCount: number;
  reviews: Reviews;
  cities: Cities;
};

function App({placesCount, reviews, cities}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Approute.Main} element={<MainScreen placesCount={placesCount} reviews={reviews} cities={cities} />} />
        <Route path={Approute.Room} element={<Room reviews={reviews} />} />
        <Route path={Approute.Login} element={<Login />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
