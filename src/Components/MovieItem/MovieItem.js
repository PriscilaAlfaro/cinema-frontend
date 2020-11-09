import React from "react";
import "./MovieItem.css";

function MovieItem({ movie }) {
  return (
    <div className="movie_item" data-testid="movie-item">
      <div className="item_img">
        <img alt=" " src={movie.image} />
      </div>
      <div className="item_text">
        <p>{movie.title}</p>
      </div>
    </div>
  );
}

export default MovieItem;
