import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {Approute} from '../../constants/const';
import MainScreen from '../../pages/main-screen/main-screen';
import Login from '../../pages/login/Login';
import Room from '../../pages/room/Room';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

type AppScreenProps = {
  placesCount: number;
}

function App({placesCount}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Approute.Main} element={<MainScreen placesCount={placesCount}/>} />
        <Route path={Approute.Login} element={<Login />} />
        <Route path={Approute.Room} element={<Room />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
