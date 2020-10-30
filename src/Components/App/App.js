import React, { useEffect, useState } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Home from "../../Pages/Home/Home";
import AppContext from "../../context/context";
import MovieDetails from "../../Pages/MovieDetails/MovieDetails";
import formatDay from "../../utils/utils";
import TicketsCounter from "../../Pages/TicketsCounter/TicketsCounter";

const axios = require("axios");

function App() {
  const [movies, setMovies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [screenings, setScreenings] = useState([]);
  const [currentMovie, setCurrentMovie] = useState("");
  const [salesOrder, setSalesOrder] = useState({});
  const [dates, setDates] = useState({});

  useEffect(() => {
    async function fetchMoviesData() {
      const mov = await axios.get("http://localhost:4001/movies");
      setMovies(mov.data);
    }
    async function fetchLocationData() {
      const loc = await axios.get("http://localhost:4001/locations");
      setLocations(loc.data);
    }
    async function fetchScreeningData() {
      const scree = await axios.get("http://localhost:4001/screenings");
      setScreenings(scree.data);
    }
    fetchMoviesData();
    fetchLocationData();
    fetchScreeningData();
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
        _id: date._id,
        day: formatDay(date.date),
        hours: date.hours,
      };
    });
    setDates(dateTimes);
    setSalesOrder({
      movie_id: movies[index]._id,
      movie: movies[index].title,
      location_id: locations[0]._id,
      location: locations[0].location,
      date_id: dateTimes[0]._id,
      date: dateTimes[0].day,
      hour: dateTimes[0].hours[0],
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
        }}
      >
        <Router>
          <Home path="/" />
          <MovieDetails path="/movie" />
          <TicketsCounter path="/tickets" />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
