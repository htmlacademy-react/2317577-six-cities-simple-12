import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setCurrentCity } from '../../store/city/city';
import { getCurrentCity } from '../../store/city/selectors';

type CityItemProps = {
  city: string;
};

function CityItem({ city }: CityItemProps) {
  const currentCity: string = useAppSelector(getCurrentCity);

  const dispatch = useAppDispatch();

  const onCityItemClick = () => {
    dispatch(setCurrentCity({currentCity: city}));
  };

  return (
    <li
      className={`locations__item ${
        currentCity === city ? 'locations--current' : ''
      }`}
      onClick={onCityItemClick}
    >
      <div className="locations__item-link tabs__item">
        <span>{city}</span>
      </div>
    </li>
  );
}

export default CityItem;
