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
  const [dates, setDates] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function loadData() {
      const loc = await axios.get("http://localhost:4001/locations");
      setLocations(loc.data);

      const scree = await axios.get("http://localhost:4001/screenings");
      setScreenings(scree.data);

      const mov = await axios.get("http://localhost:4001/movies");
      setMovies(mov.data);
    }
    loadData();
  }, []);

  function handleMovieClick(index) {
    setCurrentMovie(movies[index]);
    const currentScreening = screenings.find(
      (screen) =>
        screen.movie_id === movies[index]._id &&
        screen.location_id === locations[0]._id
    );
    const dateTimes = currentScreening.dates.map((date) => {
      return {
        day_id: date._id,
        day: formatDay(date.date),
        screening: date.screening,
      };
    });
    setDates(dateTimes);
    setSalesOrder({
      movie_id: movies[index]._id,
      movie: movies[index].title,
      location_id: locations[0]._id,
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
          dates,
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
