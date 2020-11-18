import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import * as Router from "@reach/router";

import nock from "nock";

import store from "../../store/index";
import App from "../../Components/App/App";
import {
  MOVIES,
  LOCATIONS,
  SCREENINGS,
  SEATAVAILABILITY,
  ORDER,
} from "./fixtures/backend";

describe("Cinema CR tickets App", () => {
  beforeAll(() => {
    nock(`${process.env.REACT_APP_BASE_URL}`)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
        "access-control-allow-methods": "*",
      })
      .persist()
      .get(`/movies`)
      .reply(200, MOVIES)
      .get(`/locations`)
      .reply(200, LOCATIONS)
      .get(`/screenings`)
      .reply(200, SCREENINGS)
      .get(`/seatAvailability/5f9ac2480906e41755b3b439`)
      .reply(200, SEATAVAILABILITY.STOCKHOLM)
      .get(`/seatAvailability/5f9ac2480906e41755b3b451`)
      .reply(200, SEATAVAILABILITY.MALMO)
      .intercept("/order/ch_1HiCaI2eZvKYlo2CsnhbyVsJ", "OPTIONS")
      .reply(200, {
        "access-control-allow-origin": "*",
      })
      .patch(`/order/ch_1HiCaI2eZvKYlo2CsnhbyVsJ`)
      .reply(200, ORDER);
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

    test("user click a movie and go to movie details page", async () => {
      const { findAllByTestId, findByTestId, getByText } = renderWithRouter(
        <App />
      );
      const moviesItems = await findAllByTestId("movie-item");
      await fireEvent.click(moviesItems[0]);
      await findByTestId("movie-details");
      expect(getByText("Amanda Adolfsson")).toBeInTheDocument();
    });

    test("show modal when user click play to image and close modal when click X button", async () => {
      const { findAllByTestId, findByTestId, getByText } = renderWithRouter(
        <App />
      );
      const moviesItems = await findAllByTestId("movie-item");
      await fireEvent.click(moviesItems[0]);
      await findByTestId("movie-details");
      expect(getByText("Amanda Adolfsson")).toBeInTheDocument();
      const showModalButton = await findByTestId("show-modal");
      await fireEvent.click(showModalButton);
      const modal = await findByTestId("modal");
      expect(modal).toBeInTheDocument();
      const closeModal = await findByTestId("close-modal");
      await fireEvent.click(closeModal);
      expect(modal).not.toBeInTheDocument();
    });

    test("change the dates and hours when user select a different location", async () => {
      const { findAllByTestId, findByTestId, getByText } = renderWithRouter(
        <App />
      );
      const moviesItems = await findAllByTestId("movie-item");
      fireEvent.click(moviesItems[0]);
      await findByTestId("movie-details");
      expect(getByText("Amanda Adolfsson")).toBeInTheDocument();
      const dropdownLocations = await findByTestId("dropdown-location");
      fireEvent.change(dropdownLocations, {
        target: { value: "5f9936d9b06cca78a869c01d" },
      });
      const hourButton = await findByTestId("hour-button");
      expect(hourButton).toHaveTextContent("14:00");
    });

    test("change the hours when user select a different day", async () => {
      const { findAllByTestId, findByTestId, getByText } = renderWithRouter(
        <App />
      );
      const moviesItems = await findAllByTestId("movie-item");
      fireEvent.click(moviesItems[0]);
      await findByTestId("movie-details");
      expect(getByText("Amanda Adolfsson")).toBeInTheDocument();
      const dropdownDays = await findByTestId("dropdown-day");
      fireEvent.change(dropdownDays, {
        target: { value: "5f9ac2480906e41755b3b410" },
      });
      const hourButton = await findByTestId("hour-button");
      expect(hourButton).toHaveTextContent("13:00");
    });

    test("go to ticket counter page when user click buy tickets button", async () => {
      const { findAllByTestId, findByTestId, getByText } = renderWithRouter(
        <App />
      );
      const moviesItems = await findAllByTestId("movie-item");
      await fireEvent.click(moviesItems[0]);
      await findByTestId("movie-details");
      expect(getByText("Amanda Adolfsson")).toBeInTheDocument();
      const buyTikectButtons = await findAllByTestId("hour-button");
      await fireEvent.click(buyTikectButtons[0]);
      await findByTestId("decrement-button");
    });

    test("number of ticket and price increment/decrement when the increment/decrement button is clicked", async () => {
      const { findAllByTestId, findByTestId, getByText } = renderWithRouter(
        <App />
      );
      const moviesItems = await findAllByTestId("movie-item");
      fireEvent.click(moviesItems[0]);
      // movie details page------------
      await findByTestId("movie-details");
      expect(getByText("Amanda Adolfsson")).toBeInTheDocument();
      const buyTikectButtons = await findAllByTestId("hour-button");
      fireEvent.click(buyTikectButtons[0]);
      // tickect counter page------------
      await findByTestId("seats-available");
      const counter = await findByTestId("counter");
      expect(counter).toHaveTextContent("0");
      const totalPrice = await findByTestId("total-price");
      expect(totalPrice).toHaveTextContent("0");
      // increment
      const incrementButton = await findByTestId("increment-button");
      fireEvent.click(incrementButton);
      expect(counter).toHaveTextContent("1");
      expect(totalPrice).toHaveTextContent("10");
      // decrement
      const decrementButton = await findByTestId("decrement-button");
      fireEvent.click(decrementButton);
      expect(counter).toHaveTextContent("0");
      expect(totalPrice).toHaveTextContent("0");
    });

    test("go to ticket seats page when user add a ticket and click next", async () => {
      const { findAllByTestId, findByTestId, getByText } = renderWithRouter(
        <App />
      );
      const moviesItems = await findAllByTestId("movie-item");
      fireEvent.click(moviesItems[0]);
      // movie details page------------
      await findByTestId("movie-details");
      expect(getByText("Amanda Adolfsson")).toBeInTheDocument();
      const buyTikectButtons = await findAllByTestId("hour-button");
      fireEvent.click(buyTikectButtons[0]);
      // tickect counter page------------
      await findByTestId("seats-available");
      const counter = await findByTestId("counter");
      expect(counter).toHaveTextContent("0");
      const totalPrice = await findByTestId("total-price");
      expect(totalPrice).toHaveTextContent("0");
      // increment
      const incrementButton = await findByTestId("increment-button");
      fireEvent.click(incrementButton);
      expect(counter).toHaveTextContent("1");
      expect(totalPrice).toHaveTextContent("10");
      // next
      const nextButton = await findByTestId("goToSeats");
      fireEvent.click(nextButton);
      // seats------------
      await findAllByTestId("seat-grid");
    });

    test("go to register page when user choose the seats and click next", async () => {
      const { findAllByTestId, findByTestId, getByText } = renderWithRouter(
        <App />
      );
      const moviesItems = await findAllByTestId("movie-item");
      fireEvent.click(moviesItems[0]);
      // movie details page------------
      await findByTestId("movie-details");
      expect(getByText("Amanda Adolfsson")).toBeInTheDocument();
      const buyTikectButtons = await findAllByTestId("hour-button");
      fireEvent.click(buyTikectButtons[0]);
      // tickect counter page------------
      await findByTestId("seats-available");
      const counter = await findByTestId("counter");
      expect(counter).toHaveTextContent("0");
      const totalPrice = await findByTestId("total-price");
      expect(totalPrice).toHaveTextContent("0");
      // increment
      const incrementButton = await findByTestId("increment-button");
      fireEvent.click(incrementButton);
      expect(counter).toHaveTextContent("1");
      expect(totalPrice).toHaveTextContent("10");
      // next
      const nextButtonToSeats = await findByTestId("goToSeats");
      fireEvent.click(nextButtonToSeats);
      // seats------------
      await findAllByTestId("seat-grid");
      const seat3 = await await getByText("3");
      fireEvent.click(seat3);
      const setSelected = await findByTestId("seat-selected");
      expect(setSelected).toHaveTextContent("youSelectSeatSingular: 3");
      // already purchase
      const seat2 = await getByText("2");
      fireEvent.click(seat2);
      // unselect
      fireEvent.click(seat3);
      expect(await setSelected).not.toBeInTheDocument();
      // reselect
      fireEvent.click(seat3);

      const nextButtonToRegister = await findByTestId("goToRegister");
      fireEvent.click(nextButtonToRegister);
      // register------------
      const setSelectedInRegister = await findByTestId(
        "seatsSelectedinRegister"
      );
      expect(setSelectedInRegister).toHaveTextContent("3");
    });

    test("go to stripe checkout when user insert personal info and click Pay", async () => {
      const { findAllByTestId, findByTestId, getByText } = renderWithRouter(
        <App />
      );
      const moviesItems = await findAllByTestId("movie-item");
      fireEvent.click(moviesItems[0]);
      // movie details page------------
      await findByTestId("movie-details");
      expect(getByText("Amanda Adolfsson")).toBeInTheDocument();
      const buyTikectButtons = await findAllByTestId("hour-button");
      fireEvent.click(buyTikectButtons[0]);
      // tickect counter page------------
      await findByTestId("seats-available");
      const counter = await findByTestId("counter");
      expect(counter).toHaveTextContent("0");
      const totalPrice = await findByTestId("total-price");
      expect(totalPrice).toHaveTextContent("0");
      // increment
      const incrementButton = await findByTestId("increment-button");
      fireEvent.click(incrementButton);
      expect(counter).toHaveTextContent("1");
      expect(totalPrice).toHaveTextContent("10");
      // next
      const nextButtonToSeats = await findByTestId("goToSeats");
      fireEvent.click(nextButtonToSeats);
      // seats------------
      await findAllByTestId("seat-grid");
      const seat3 = await getByText("3");
      fireEvent.click(seat3);
      const setSelected = await findByTestId("seat-selected");
      expect(setSelected).toHaveTextContent("youSelectSeatSingular: 3");
      const nextButtonToRegister = await findByTestId("goToRegister");
      fireEvent.click(nextButtonToRegister);
      // register------------
      const setSelectedInRegister = await findByTestId(
        "seatsSelectedinRegister"
      );
      expect(setSelectedInRegister).toHaveTextContent("3");
      const inputName = await findByTestId("input-name");
      fireEvent.change(inputName, { target: { value: "Jane Doe" } });
      const inputEmail = await findByTestId("input-email");
      fireEvent.change(inputEmail, { target: { value: "jdoe@gmail.com" } });
      const inputPhone = await findByTestId("input-phone");
      fireEvent.change(inputPhone, { target: { value: "1234567890" } });
      const nextButtonToStripe = await findByTestId("goToStripe");
      expect(nextButtonToStripe).toBeInTheDocument();
      fireEvent.click(nextButtonToStripe);
    });

    test("user can view the order information in thanks page  when clicks pay in stripe", async () => {
      const {
        findByTestId,
        findAllByTestId,
        history: { navigate },
      } = renderWithRouter(<App />);
      await navigate("/thanks?session_id=ch_1HiCaI2eZvKYlo2CsnhbyVsJ");
      const finalOrderContainer = await findByTestId("thanks");
      expect(finalOrderContainer).toBeInTheDocument();

      const nextButtonToHome = await findByTestId("goToHome");
      fireEvent.click(nextButtonToHome);
      const movies = await findAllByTestId("movie-item");
      expect(movies[0]).toBeInTheDocument();
    });
  });
});
