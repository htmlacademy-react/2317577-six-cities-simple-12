import { NameSpace } from '../../constants/const';
import { State } from '../../types/state';
import { Offers } from '../../types/offers';
import { FilterOptions } from '../../types/filterOptions';

export const getOffers = (state: State): Offers => state[NameSpace.Offers].offers;
export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.Offers].areOffersLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Offers].error;
export const getFilterOptions = (state: State): FilterOptions => state[NameSpace.Offers].filterOptions;
