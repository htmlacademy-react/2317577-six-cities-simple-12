import { Cities } from '../../types/cities';
import CityItem from '../city-item/CityItem';

type CitiesListProps = {
  cities: Cities;
};

function CitiesList ({ cities }: CitiesListProps) {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <CityItem city={city} key={city.title} />
      ))}
    </ul>
  );
}

export default CitiesList;
