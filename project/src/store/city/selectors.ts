import {NameSpace} from '../../constants/const';
import {State} from '../../types/state';

export const getCurrentCity = (state: State): string => state[NameSpace.City].currentCity;
