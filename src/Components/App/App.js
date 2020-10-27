import React, { useEffect, useState } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Home from "../../Pages/Home/Home";
import AppContext from "../../context/context";
import MovieDetails from "../../Pages/MovieDetails/MovieDetails";

const axios = require("axios");

function App() {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("http://localhost:4001/movies");
      setMovies(result.data);
    }
    fetchData();
  }, []);

  function handleMovieClick(index) {
    setCurrentMovieIndex(index);
  }

  return (
    <div className="App">
      <AppContext.Provider
        value={{ movies, handleMovieClick, currentMovieIndex }}
      >
        <Router>
          <Home path="/home" />
          <MovieDetails path="/movie" />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
