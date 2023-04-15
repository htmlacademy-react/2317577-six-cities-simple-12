import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants/const';
import { CurrentCityData } from '../../types/state';

const initialState: CurrentCityData = {
  currentCity: 'Paris',
};

export const currentCityData = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<CurrentCityData>) => {
      state.currentCity = action.payload.currentCity;
    }
  }
});

export const { setCurrentCity } = currentCityData.actions;
