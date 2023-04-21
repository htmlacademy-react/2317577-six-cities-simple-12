import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { configureMockStore } from "@jedmao/redux-mock-store";
import HistoryRouter from "../history-router/History-Router";
import { AuthorizationStatus, Approute } from "../../constants/const";
import App from "./app";

const mockStore = configureMockStore();

const store = mockStore({
  OFFERS: {
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
  },
  CITY: {
    currentCity: "Paris",
  },
  USER: {
    userInfo: undefined,
    authorizationStatus: AuthorizationStatus.Unknown,
  },
  COMMENTS: {
    comments: [],
    areCommentsLoading: false,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe("Application Routing", () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(Approute.Main);

    render(fakeApp);

    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("Cologne")).toBeInTheDocument();
    expect(screen.getByText("Brussels")).toBeInTheDocument();
    expect(screen.getByText("Amsterdam")).toBeInTheDocument();
    expect(screen.getByText("Hamburg")).toBeInTheDocument();
    expect(screen.getByText("Dusseldorf")).toBeInTheDocument();
    expect(screen.getByText("Cities")).toBeInTheDocument();
  });

  it('should render "Login" when user navigate to "/login"', () => {
    history.push(Approute.Login);

    render(fakeApp);

    const divElements = screen.getAllByText("Sign in");
    expect(divElements.length).toBe(2);

    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push("/non-existent-route");

    render(fakeApp);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We are sorry the page you are looking for does not exist."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Return to the main page.")).toBeInTheDocument();
  });
});
