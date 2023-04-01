import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeCity } from '../../store/action';
import { City } from '../../types/cities';

type CityItemProps = {
  city: City;
};

function CityItem({ city }: CityItemProps) {
  const currentCity = useAppSelector((state) => state.currentCity);

  const dispatch = useAppDispatch();

  const onCityItemClick = () => {
    dispatch(changeCity({ currentCity: city }));
  };

  return (
    <li
      className={`locations__item ${
        currentCity.title === city.title ? 'locations--current' : ''
      }`}
      onClick={onCityItemClick}
    >
      <div className="locations__item-link tabs__item">
        <span>{city.title}</span>
      </div>
    </li>
  );
}

export default CityItem;
