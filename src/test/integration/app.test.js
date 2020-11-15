import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import * as Router from "@reach/router";
// import {
//   Router,
//   createHistory,
//   createMemorySource,
//   LocationProvider,
// } from "@reach/router";
import nock from "nock";
// import { act } from "react-dom/test-utils";
// import AppContext from "../../store/context";
import store from "../../store/index";
import App from "../../Components/App/App";
import { MOVIES, LOCATIONS, SCREENINGS } from "./fixtures/backend";

describe("Cinema CR tickets App", () => {
  beforeAll(() => {
    nock(`${process.env.REACT_APP_BASE_URL}`)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
      })
      .persist()
      .get(`/movies`)
      .reply(200, MOVIES)
      .get(`/locations`)
      .reply(200, LOCATIONS)
      .get(`/screenings`)
      .reply(200, SCREENINGS);
  });
  // afterAll(cleanup);

  const testState = {
    movies: [],
    locations: [],
    screenings: [],
    purchasedSeats: [],
    seatAvailability: null,
    currentMovie: null,
    salesOrder: {},
    showModal: false,
  };

  function renderWithRouter(
    ui,
    {
      route = "/",
      history = Router.createHistory(Router.createMemorySource(route)),
    } = {}
  ) {
    return {
      ...render(
        <Router.LocationProvider history={history}>
          {ui}
        </Router.LocationProvider>
      ),
      history,
    };
  }

  describe("render home page with all movies", () => {
    store.initialState = testState;

    test("user can view the list of movies avaliable", async () => {
      const { findAllByTestId } = renderWithRouter(<App />);
      await findAllByTestId("movie-item");
    });

    test("user click a movie and go to movie details", async () => {
      const { findAllByTestId, findByTestId, getByText } = renderWithRouter(
        <App />
      );
      const moviesItems = await findAllByTestId("movie-item");

      await fireEvent.click(moviesItems[0]);

      await findByTestId("movie-details");

      expect(getByText("Amanda Adolfsson")).toBeInTheDocument();
    });
  });
});
