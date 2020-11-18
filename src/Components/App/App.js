import React, { useEffect, useReducer } from "react";
import "./App.css";
import { Router } from "@reach/router";
import store from "../../store/index";
import Home from "../../Pages/Home/Home";
import AppContext from "../../store/context";
import MovieDetails from "../../Pages/MovieDetails/MovieDetails";
import formatDay from "../../utils/utils";
import TicketsCounter from "../../Pages/TicketsCounter/TicketsCounter";
import Seats from "../../Pages/Seats/Seats";
import Register from "../../Pages/Register/Register";
import CancelledPay from "../../Pages/CancelledPay/CancelledPay";
import Thanks from "../../Pages/Thanks/Thanks";

const axios = require("axios");

function App() {
  const [state, dispatch] = useReducer(store.reducer, store.initialState);
  const { movies, locations, screenings } = state;

  const loadData = async (ismounted) => {
    const loc = await axios.get(`${process.env.REACT_APP_BASE_URL}/locations`);
    if (ismounted) {
      dispatch({ type: "setLocations", data: loc.data });
    }

    const scree = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/screenings`
    );

    if (ismounted) {
      dispatch({ type: "setScreenings", data: scree.data });
    }

    const mov = await axios.get(`${process.env.REACT_APP_BASE_URL}/movies`);
    if (ismounted) {
      dispatch({ type: "setMovies", data: mov.data });
    }
  };

  useEffect(() => {
    let ismounted = true;
    if (ismounted) {
      loadData(ismounted);
    }

    return () => {
      ismounted = false;
    };
  }, []);

  function handleMovieClick(index) {
    dispatch({ type: "setCurrentMovie", data: movies[index] });

    // screening from selected movie and location default
    const currentScreening = screenings.find(
      (screen) =>
        screen.movie_id === movies[index]._id &&
        screen.location_id === locations[0]._id // default location
    );

    // 1 screening per movie
    const dateTimes = currentScreening.dates.map((date) => {
      return {
        day_id: date._id,
        day: formatDay(date.date),
        screening: date.screening, // array
      };
    });

    dispatch({
      type: "setSalesOrder",
      data: {
        movie_id: movies[index]._id,
        movie: movies[index].title,
        location_id: locations[0]._id, // default info
        location: locations[0].location,
        price: locations[0].price,
        salong: locations[0].salong,
        place: locations[0].place,
        mapUrl: locations[0].mapUrl,
        totalSeats: locations[0].totalSeats,
        date_id: dateTimes[0].day_id,
        date: dateTimes[0].day,
      },
    });
  }

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          handleMovieClick,
          state,
          dispatch,
        }}
      >
        <Router>
          <Home path="/" />
          <MovieDetails path="/movie-details" />
          <TicketsCounter path="/tickets" />
          <Seats path="/seats" />
          <Register path="/register" />
          <CancelledPay path="/cancelled" />
          <Thanks path="/thanks" />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
