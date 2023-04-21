import { createAPI } from "../services/api";
import MockAdapter from "axios-mock-adapter";
import { configureMockStore } from "@jedmao/redux-mock-store";
import { State } from "../types/state";
import thunk, { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { APIRoute } from "../constants/const";
import {
  checkAuthAction,
  fetchCommentsAction,
  fetchNearbyOffersAction,
  fetchOffersAction,
  fetchSingleOfferAction,
  loginAction,
  logoutAction,
} from "./asyncActions";
import { redirectToRoute } from "./action";
import { makeMockComments, makeMockOffer, makeMockOffers } from "../utils/mocks";

describe("Async actions", () => {
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('Should state Authorization status "auth" when server return 200', async () => {
    const store = mockStore();
    mockApi.onGet(APIRoute.Login).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it("Should dispatch dispatch loginAction, RedirectToRoute and checkAuthAction when POST /login", async () => {
    const fakeUser = {
      email: "test@test.ru",
      password: "12345",
    };

    mockApi.onPost(APIRoute.Login).reply(200, { token: "secret" });

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      checkAuthAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith("offers-token", "secret");
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockApi
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      redirectToRoute.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('offers-token');
  });

  it('should dispatch "fetchOffersAction" when GET /offers', async () => {
    const mockOffers = makeMockOffers();
    mockApi.onGet(APIRoute.Offers).reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });

  it('should dispatch "fetchSingleOfferAction" when GET /offer/:id', async () => {
    const mockOffer = makeMockOffer();
    mockApi.onGet(`${APIRoute.Offers}/${mockOffer.id}`).reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(fetchSingleOfferAction(String(mockOffer.id)));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSingleOfferAction.pending.type,
      fetchSingleOfferAction.fulfilled.type,
    ]);
  });

  it('should dispatch "fetchNearbyOffersAction" when GET /offer/:id/nearby', async () => {
    const mockOffers = makeMockOffers();
    mockApi.onGet(`${APIRoute.Offers}/${mockOffers[0].id}/nearby`).reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchNearbyOffersAction(String(mockOffers[0].id)));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchNearbyOffersAction.pending.type,
      fetchNearbyOffersAction.fulfilled.type,
    ]);
  });

  it('should dispatch "fetchCommentsAction" when GET /comments/:hotelId', async () => {
    const mockComments = makeMockComments();
    mockApi.onGet(`${APIRoute.Comments}/1`).reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(fetchCommentsAction('1'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type,
    ]);
  });
});
