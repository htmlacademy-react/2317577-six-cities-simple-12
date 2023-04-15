import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants/const';
import { OffersData } from '../../types/state';
import { fetchOffersAction } from '../asyncActions';
import { FilterOptions } from '../../types/filterOptions';

const initialState: OffersData = {
  offers: [],
  areOffersLoading: false,
  error: false,
  filterOptions: {
    name: 'popular',
    type: 'rating',
    order: 'asc',
  },
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = false;
    },
    setFilterOptions: (state, action) => {
      const data: FilterOptions = action.payload;
      state.filterOptions = data;
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

export const { clearError, setFilterOptions } = offersData.actions;
