import "./error-popup.css";
import { MouseEvent, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setError } from "../../store/action";

function ErrorPopup(): JSX.Element | null {
  const error = useAppSelector((state) => state.error);

  const dispatch = useAppDispatch();

  const closePopup = () => dispatch(setError(''));

  const handleOverlayClose = (event:MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains('error')) {
      closePopup();
    }
  };

  const escFunction = useCallback((evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      closePopup();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return error ? (
    <div className="error" onClick={handleOverlayClose}>
      <div className="error__container">
        <svg
          className='error__exit-icon'
          onClick={closePopup}
          fill="#ffffff"
          width="30px"
          height="30px"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z" />
        </svg>
        <div className="error__item error__item_top">
          <svg
            width="80px"
            height="80px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="error__item error__item_bottom">
          <h1 className="error__title">Ooops! Something went wrong!</h1>
          <p className="error__text">{error}</p>
        </div>
      </div>
    </div>
  ) : null;
}

export default ErrorPopup;
