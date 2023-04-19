import { currentCityData } from './city';
import { setCurrentCity } from './city';
import { makeFakeCity } from '../../utils/mocks';

const mockCity = makeFakeCity();

describe('Reducer: city', () => {
  const state = {currentCity: 'Paris'}

  it('without additional parameters should return initial state', () => {
    expect(currentCityData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ currentCity: 'Paris' })
  })

  it('should update current city', () => {
    expect(currentCityData.reducer(state, setCurrentCity({currentCity: mockCity.currentCity})))
      .toEqual({ currentCity: mockCity.currentCity })
  })
  
})
