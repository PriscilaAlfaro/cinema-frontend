import React, { useContext}from 'react';
import AppContext from "../../context/context";
import './MovieDetails.css';
import ReactPlayer from "react-player";

function MovieDetails() {
    const { movies, currentMovieIndex } = useContext(AppContext);
    const movie = movies[currentMovieIndex];
    console.log(movie);
    
    return (
    <div className="container">
{movie && <div className="superior">
<ReactPlayer url='https://www.youtube.com/watch?v=P9A6hOg9QQ0'/>
    <h1>{movie.title}</h1>
    <h4>Clasification: {movie.rated}  </h4>
    <h4>Recomended: {movie.minimunAge} years</h4>  
    </div>}
    <div className="inferior">
        <h4>{movie.title}</h4>
        <h4>Director: {movie.director}</h4>
        <h4>Sinopsis: {movie.description}</h4>

        </div>
    </div>
    );
}

export default MovieDetails;