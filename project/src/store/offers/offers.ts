import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants/const';
import { OffersData } from '../../types/state';
import { fetchNearbyOffersAction, fetchOffersAction, fetchSingleOfferAction } from '../asyncActions';
import { FilterOptions } from '../../types/filterOptions';

const initialState: OffersData = {
  offers: [],
  error: false,
  areOffersLoading: false,
  singleOffer: undefined,
  isSingleOfferLoading: false,
  notFoundSingleOfferError: false,
  nearbyOffers: [],
  areNearbyOffersLoading: false,
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
    setFilterOptions: (state, action: PayloadAction<FilterOptions>) => {
      const data = action.payload;
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
      })
      .addCase(fetchSingleOfferAction.pending, (state) => {
        state.isSingleOfferLoading = true;
        state.notFoundSingleOfferError = false;
      })
      .addCase(fetchSingleOfferAction.fulfilled, (state, action) => {
        state.isSingleOfferLoading = false;
        state.singleOffer = action.payload;
      })
      .addCase(fetchSingleOfferAction.rejected, (state) => {
        state.isSingleOfferLoading = false;
        state.notFoundSingleOfferError = true;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.areNearbyOffersLoading = true;
        state.error = false;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.areNearbyOffersLoading = false;
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.areNearbyOffersLoading = false;
        state.error = true;
      });
  },
});

export const { clearError, setFilterOptions } = offersData.actions;
