import CityItem from '../city-item/CityItem';

type CitiesListProps = {
  cities: string[];
};

function CitiesList ({ cities }: CitiesListProps) {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <CityItem city={city} key={city} />
      ))}
    </ul>
  );
}

export default CitiesList;
