import {Link} from 'react-router-dom';
import {Approute} from '../../constants/const';

function NotFoundScreen() {
  return (
    <div className="room">
      <div className="not-found__container">
        <div className="not-found__logo-wrapper">
          <a className="header__logo-link" href="main.html">
            <img
              className="header__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="81"
              height="41"
            />
          </a>
        </div>
        <div className="property__mark">
          <span>404</span>
        </div>
        <div className="property__name-wrapper">
          <h1 className="property__name">
            We are sorry the page you are looking for does not exist.
          </h1>
        </div>
        <Link to={Approute.Main} className="property__inside-title">
          Return to the main page.
        </Link>
      </div>
    </div>
  );
}

export default NotFoundScreen;
