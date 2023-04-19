import { offersData, clearError, setFilterOptions } from "./offers";
import { initialState } from "./offers";
import {
  fetchNearbyOffersAction,
  fetchOffersAction,
  fetchSingleOfferAction,
} from "../asyncActions";
import { makeMockOffers, makeMockOffer, makeMockFilterOptions } from "../../utils/mocks";
import { Offer, Offers } from "../../types/offers";
import { FilterOptions } from "../../types/filterOptions";

const mockOffers: Offers = makeMockOffers();
const mockOffer: Offer = makeMockOffer();
const mockFilterOptions: FilterOptions = makeMockFilterOptions();

describe("Reducer: offersData", () => {
  it("Without additional parameters should return initial state", () => {
    expect(offersData.reducer(undefined, { type: "UNKNOWN_ACTION" })).toEqual(
      initialState
    );
  });

  // Offers loading
  it('Should make "areOffersLoadingState" true', () => {
    const state = initialState;
    expect(
      offersData.reducer(state, { type: fetchOffersAction.pending.type })
    ).toEqual({
      offers: [],
      error: false,
      areOffersLoading: true,
      singleOffer: undefined,
      isSingleOfferLoading: false,
      notFoundSingleOfferError: false,
      nearbyOffers: [],
      areNearbyOffersLoading: false,
      filterOptions: {
        name: "popular",
        type: "rating",
        order: "asc",
      },
    });
  });

  it('Should update offers by loading them. And "areOffersLoading" = false', () => {
    const state = initialState;
    expect(
      offersData.reducer(state, {
        type: fetchOffersAction.fulfilled.type,
        payload: mockOffers,
      })
    ).toEqual({
      offers: mockOffers,
      error: false,
      areOffersLoading: false,
      singleOffer: undefined,
      isSingleOfferLoading: false,
      notFoundSingleOfferError: false,
      nearbyOffers: [],
      areNearbyOffersLoading: false,
      filterOptions: {
        name: "popular",
        type: "rating",
        order: "asc",
      },
    });
  });

  it('Should set "error" flag true, if request is rejected', () => {
    const state = initialState;
    expect(
      offersData.reducer(state, { type: fetchOffersAction.rejected.type })
    ).toEqual({
      offers: [],
      error: true,
      areOffersLoading: false,
      singleOffer: undefined,
      isSingleOfferLoading: false,
      notFoundSingleOfferError: false,
      nearbyOffers: [],
      areNearbyOffersLoading: false,
      filterOptions: {
        name: "popular",
        type: "rating",
        order: "asc",
      },
    });
  });

  // Single offer

  it('Should make "isSingleOfferLoading" true', () => {
    const state = initialState;
    expect(
      offersData.reducer(state, { type: fetchSingleOfferAction.pending.type })
    ).toEqual({
      offers: [],
      error: false,
      areOffersLoading: false,
      singleOffer: undefined,
      isSingleOfferLoading: true,
      notFoundSingleOfferError: false,
      nearbyOffers: [],
      areNearbyOffersLoading: false,
      filterOptions: {
        name: "popular",
        type: "rating",
        order: "asc",
      },
    });
  });

  it('Should update "singleOffer" by loading it. And "isSingleOfferLoading" = false', () => {
    const state = initialState;
    expect(
      offersData.reducer(state, {
        type: fetchSingleOfferAction.fulfilled.type,
        payload: mockOffer,
      })
    ).toEqual({
      offers: [],
      error: false,
      areOffersLoading: false,
      singleOffer: mockOffer,
      isSingleOfferLoading: false,
      notFoundSingleOfferError: false,
      nearbyOffers: [],
      areNearbyOffersLoading: false,
      filterOptions: {
        name: "popular",
        type: "rating",
        order: "asc",
      },
    });
  });

  it('Should set "notFoundSingleOfferError" flag true, if request is rejected', () => {
    const state = initialState;
    expect(
      offersData.reducer(state, { type: fetchSingleOfferAction.rejected.type })
    ).toEqual({
      offers: [],
      error: false,
      areOffersLoading: false,
      singleOffer: undefined,
      isSingleOfferLoading: false,
      notFoundSingleOfferError: true,
      nearbyOffers: [],
      areNearbyOffersLoading: false,
      filterOptions: {
        name: "popular",
        type: "rating",
        order: "asc",
      },
    });
  });

  // Nearby offers loading
  it('Should make "areNearbyOffersLoading" true', () => {
    const state = initialState;
    expect(
      offersData.reducer(state, { type: fetchNearbyOffersAction.pending.type })
    ).toEqual({
      offers: [],
      error: false,
      areOffersLoading: false,
      singleOffer: undefined,
      isSingleOfferLoading: false,
      notFoundSingleOfferError: false,
      nearbyOffers: [],
      areNearbyOffersLoading: true,
      filterOptions: {
        name: "popular",
        type: "rating",
        order: "asc",
      },
    });
  });

  it('Should update nearby offers by loading them. And "areNearbyOffersLoading" = false', () => {
    const state = initialState;
    expect(
      offersData.reducer(state, {
        type: fetchNearbyOffersAction.fulfilled.type,
        payload: mockOffers,
      })
    ).toEqual({
      offers: [],
      error: false,
      areOffersLoading: false,
      singleOffer: undefined,
      isSingleOfferLoading: false,
      notFoundSingleOfferError: false,
      nearbyOffers: mockOffers,
      areNearbyOffersLoading: false,
      filterOptions: {
        name: "popular",
        type: "rating",
        order: "asc",
      },
    });
  });

  it('Should set "error" flag true, if request is rejected', () => {
    const state = initialState;
    expect(
      offersData.reducer(state, { type: fetchNearbyOffersAction.rejected.type })
    ).toEqual({
      offers: [],
      error: true,
      areOffersLoading: false,
      singleOffer: undefined,
      isSingleOfferLoading: false,
      notFoundSingleOfferError: false,
      nearbyOffers: [],
      areNearbyOffersLoading: false,
      filterOptions: {
        name: "popular",
        type: "rating",
        order: "asc",
      },
    });
  });

  // Clear Error
  it('Should set "error" flag to false', () => {
    const state = initialState;
    expect(offersData.reducer(state, clearError)).toEqual({
      offers: [],
      error: false,
      areOffersLoading: false,
      singleOffer: undefined,
      isSingleOfferLoading: false,
      notFoundSingleOfferError: false,
      nearbyOffers: [],
      areNearbyOffersLoading: false,
      filterOptions: {
        name: "popular",
        type: "rating",
        order: "asc",
      },
    });
  });

  // setFilterOptions

  it('Should set Filter options', () => {
    const state = initialState;
    expect(offersData.reducer(state, setFilterOptions(mockFilterOptions)))
      .toEqual({
        offers: [],
        error: false,
        areOffersLoading: false,
        singleOffer: undefined,
        isSingleOfferLoading: false,
        notFoundSingleOfferError: false,
        nearbyOffers: [],
        areNearbyOffersLoading: false,
        filterOptions: mockFilterOptions,
      })
  })
});
