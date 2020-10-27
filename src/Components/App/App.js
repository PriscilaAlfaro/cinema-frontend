import React, { useEffect, useState } from "react";
import './App.css';
import Home from "../../Pages/Home/Home"
import AppContext from "../../context/context";
import MovieDetails from "../../Pages/MovieDetails/MovieDetails";
import { Router} from "@reach/router"

const axios = require('axios');


function App() {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentImageIndex] = useState("");

useEffect(()=>{
  async function fetchData(){
  const result = await axios.get("http://localhost:4001/movies");
  setMovies(result.data)
  }
  fetchData();
}, [])


  function handleClick(i) {
    setCurrentImageIndex(i);
  }

  return (
    <div className="App">
      <AppContext.Provider value={{ movies, handleClick, currentImageIndex: currentMovieIndex }}>
      <Router>
            <Home path="/home"/>
            <MovieDetails path="/movie"/>
      </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
