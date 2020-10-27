import React from 'react';
import './MovieItem.css';
import { useNavigate } from "@reach/router"



function MovieItem({movie, onClick, selected}){
    const navigate = useNavigate();

const goToMovieDetail=()=>{
    console.log('goToMovieDetail before onClick');
    onClick();
    console.log('goToMovieDetail before redirect'); 
    navigate('/movies', { replace: true })
}
 
    return (
        <div className="movie_item" onClick={goToMovieDetail} >
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