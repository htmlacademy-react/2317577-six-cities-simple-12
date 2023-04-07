import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeCity } from '../../store/action';

type CityItemProps = {
  city: string;
};

function CityItem({ city }: CityItemProps) {
  const currentCity = useAppSelector((state) => state.currentCity);

  const dispatch = useAppDispatch();

  const onCityItemClick = () => {
    dispatch(changeCity(city));
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
