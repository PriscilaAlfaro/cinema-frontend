import React, { useEffect, useState } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Home from "../../Pages/Home/Home";
import AppContext from "../../context/context";
import MovieDetails from "../../Pages/MovieDetails/MovieDetails";
import formatDay from "../../utils/utils";
import TicketsCounter from "../../Pages/TicketsCounter/TicketsCounter";
import Seats from "../../Pages/Seats/Seats";
import Register from "../../Pages/Register/Register";
import CancelledPay from "../../Pages/CancelledPay/CancelledPay";
import Thanks from "../../Pages/Thanks/Thanks";

const axios = require("axios");

function App() {
  const [movies, setMovies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [screenings, setScreenings] = useState([]);
  const [seatAvailability, setSeatAvailability] = useState(null);
  const [purchasedSeats, setPurchasedSeats] = useState([]);
  const [currentMovie, setCurrentMovie] = useState("");
  const [salesOrder, setSalesOrder] = useState({});
  // const [dates, setDates] = useState({});
  const [showModal, setShowModal] = useState(false);

  const loadData = async () => {
    const loc = await axios.get(`${process.env.REACT_APP_BASE_URL}/locations`);
    setLocations(loc.data);

    const scree = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/screenings`
    );
    setScreenings(scree.data);

    const mov = await axios.get(`${process.env.REACT_APP_BASE_URL}/movies`);
    setMovies(mov.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  function handleMovieClick(index) {
    setCurrentMovie(movies[index]);

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
    // setDates(dateTimes);
    setSalesOrder({
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
    });
  }

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          movies,
          handleMovieClick,
          currentMovie,
          locations,
          setSalesOrder,
          salesOrder,
          screenings,
          // dates,
          seatAvailability,
          setSeatAvailability,
          purchasedSeats,
          setPurchasedSeats,
          showModal,
          setShowModal,
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
