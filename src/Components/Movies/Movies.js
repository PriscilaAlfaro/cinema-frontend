import React, { useContext}from 'react';
import AppContext from "../../context/context";
import MovieItem from  "../MovieItem/MovieItem"
import './Movies.css';


function Movies(){
    const { movies, handleClick, currentImageIndex: currentMovieIndex } = useContext(AppContext);
 
    return (
        <div className="movie-container">
            {movies.map((movie, i) => {
                return <MovieItem 
                movie={movie} 
                onClick={()=>handleClick(i)}
                key={movie._id}
                selected={currentMovieIndex === i}/>}) }
        </div>
    );
}

export default Movies;