import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

const api = createAPI();
export const mockApi = new MockAdapter(api);

const middlewares = [thunk.withExtraArgument(api)];

export const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
