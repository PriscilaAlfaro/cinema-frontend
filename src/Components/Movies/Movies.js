import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import AppContext from "../../context/context";
import MovieItem from "../MovieItem/MovieItem";
import "./Movies.css";

function Movies() {
  const { movies, handleMovieClick } = useContext(AppContext);

  const navigate = useNavigate();

  const goToMovieDetail = (index) => {
    handleMovieClick(index);
    navigate("/movie-details");
  };

  return (
    <div className="movie-container">
      {movies.map((movie, index) => {
        return (
          <div key={movie._id} onClick={() => goToMovieDetail(index)}>
            <MovieItem movie={movie} />
          </div>
        );
      })}
    </div>
  );
}

export default Movies;
