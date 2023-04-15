import { createAction } from '@reduxjs/toolkit';
import { Approute } from '../constants/const';

export const Action = {
  REDIRECT_TO_ROUTE: 'REDIRECT_TO_ROUTE',
};

export const redirectToRoute = createAction<Approute>(Action.REDIRECT_TO_ROUTE);
