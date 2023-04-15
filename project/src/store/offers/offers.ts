import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants/const';
import { OffersData } from '../../types/state';
import { fetchOffersAction } from '../asyncActions';

const initialState: OffersData = {
  offers: [],
  areOffersLoading: false,
  error: false,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.areOffersLoading = true;
        state.error = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.areOffersLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.areOffersLoading = false;
        state.error = true;
      });
  },
});

export const { clearError } = offersData.actions;
