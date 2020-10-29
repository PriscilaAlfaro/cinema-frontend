import React, { useEffect, useState } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Home from "../../Pages/Home/Home";
import AppContext from "../../context/context";
import MovieDetails from "../../Pages/MovieDetails/MovieDetails";

const axios = require("axios");

function App() {
  const [movies, setMovies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [screenings, setScreenings] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState("");
  const [salesOrder, setSalesOrder] = useState({});

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
    setCurrentMovieIndex(index);
    const stockholm = locations.find((city) => city.location === "Stockholm");
    setSalesOrder({ location: stockholm._id });
  }

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          movies,
          handleMovieClick,
          currentMovieIndex,
          locations,
          setSalesOrder,
          salesOrder,
          screenings,
        }}
      >
        <Router>
          <Home path="/" />
          <MovieDetails path="/movie" />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
