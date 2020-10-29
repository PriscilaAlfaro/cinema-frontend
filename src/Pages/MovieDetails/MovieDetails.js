/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from "react";
import ReactPlayer from "react-player";
import AppContext from "../../context/context";
import Footer from "../../Components/Footer/Footer";
import "./MovieDetails.css";

function MovieDetails() {
  const {
    movies,
    currentMovieIndex,
    locations,
    setSalesOrder,
    salesOrder,
    screenings,
  } = useContext(AppContext);
  const currentMovie = movies[currentMovieIndex];

  const formatDay = (date) => new Date(date).toLocaleDateString("se-SV");

  const currentScreening = screenings.find(
    (screen) =>
      screen.movie_id === currentMovie._id &&
      screen.location_id === salesOrder.location
  );

  const dates = currentScreening.dates.map((date) => {
    return {
      _id: date._id,
      day: formatDay(date.date),
      hours: date.hours,
    };
  });

  console.log("screenings", screenings);
  console.log("currentScreening", currentScreening);
  console.log("dates", dates);

  function handleLocationChange(e) {
    setSalesOrder({ ...salesOrder, location: e.target.value });
  }

  function handleDayChange(e) {
    setSalesOrder({ ...salesOrder, date_id: e.target.value });
  }

  return (
    <div className="container">
      {currentMovie && (
        <div>
          <div className="video">
            <ReactPlayer url={currentMovie.video} />
          </div>
          <div className="superior">
            <h1>{currentMovie.title}</h1>
            <h4>
              Clasification:&nbsp;
              {currentMovie.rated}
            </h4>
            <h4>
              Recomended:&nbsp;
              {currentMovie.minimunAge}
              &nbsp; years
            </h4>
            <h4>
              Duration:&nbsp;
              {currentMovie.duration}
            </h4>
          </div>

          <div className="inferior">
            <h4>{currentMovie.title}</h4>
            <h4>
              Director:&nbsp;
              {currentMovie.director}
            </h4>
            <h4>
              Sinopsis:&nbsp;
              {currentMovie.description}
            </h4>
          </div>
          <div className="tickets">
            <h1>Boka biljetter</h1>
            <div className="tickets_dropDownList">
              <label htmlFor="location">Choose a location:&nbsp;</label>
              <select
                name="location"
                id="location"
                onChange={handleLocationChange}
              >
                {locations.map((city) => (
                  <option value={city._id} key={city._id}>
                    {city.location}
                  </option>
                ))}
              </select>
            </div>

            <div className="days_dropDownList">
              <label htmlFor="days">Choose a day:&nbsp;</label>
              <select name="days" id="days" onChange={handleDayChange}>
                {dates.map((date) => (
                  <option value={date._id} key={date._id}>
                    {date.day}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
      {salesOrder.date_id && (
        <div className="hours">
          <p>Choose an hour:&nbsp;</p>
          {dates
            .find((date) => date._id === salesOrder.date_id)
            .hours.map((hour) => (
              <button className="hour-button" type="button">
                {hour}
                &nbsp; BUY TIKECTS
              </button>
            ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
export default MovieDetails;
