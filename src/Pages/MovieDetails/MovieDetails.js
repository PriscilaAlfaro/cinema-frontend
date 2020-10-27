import React, { useContext } from "react";
import ReactPlayer from "react-player";
import AppContext from "../../context/context";
import Footer from "../../Components/Footer/Footer";
import "./MovieDetails.css";

function MovieDetails() {
  const { movies, currentMovieIndex } = useContext(AppContext);
  const movie = movies[currentMovieIndex];
  // eslint-disable-next-line no-debugger
  //   debugger;
  return (
    <div className="container">
      {movie && (
        <div>
          <div className="video">
            <ReactPlayer url={movie.video} />
          </div>
          <div className="superior">
            <h1>{movie.title}</h1>
            <h4>
              Clasification:&nbsp;
              {movie.rated}
            </h4>
            <h4>
              Recomended:&nbsp;
              {movie.minimunAge}
              &nbsp; years
            </h4>
            <h4>
              Duration:&nbsp;
              {movie.duration}
            </h4>
          </div>

          <div className="inferior">
            <h4>{movie.title}</h4>
            <h4>
              Director:&nbsp;
              {movie.director}
            </h4>
            <h4>
              Sinopsis:&nbsp;
              {movie.description}
            </h4>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default MovieDetails;
