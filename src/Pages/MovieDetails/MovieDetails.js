/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "@reach/router";
import AppContext from "../../context/context";
import Footer from "../../Components/Footer/Footer";
import formatDay from "../../utils/utils";
import "./MovieDetails.css";

function MovieDetails() {
  const {
    currentMovie,
    locations,
    setSalesOrder,
    salesOrder,
    dates,
    screenings,
  } = useContext(AppContext);
  const navigate = useNavigate();
  function handleLocationChange(e) {
    setSalesOrder({
      ...salesOrder,
      location_id: e.target.value,
      location: locations.find((loc) => e.target.value === loc._id).location,
    });
  }

  function handleDayChange(e) {
    setSalesOrder({
      ...salesOrder,
      date_id: e.target.value,
      date: dates.find((dat) => e.target.value === dat._id).day,
    });
  }

  function handleHourChange(e) {
    setSalesOrder({ ...salesOrder, hour: e.target.value });
    navigate("/tickets");
  }

  // cambiar el nombre para poder pintar los nuevos dates actualizados cada vez que una persona elige un location nuevo
  // const currentScreening = screenings.find(
  //   (screen) =>
  //     screen.movie_id === salesOrder.movie_id &&
  //     screen.location_id === salesOrder.location_id
  // );

  // const dateTimes = currentScreening.dates.map((date) => {
  //   return {
  //     _id: date._id,
  //     day: formatDay(date.date),
  //     hours: date.hours,
  //   };
  // });

  return (
    <div className="container">
      {/* Movie details ----------------------------------- */}
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
        </div>
      )}
      {/* Tickets ----------------------------------- */}
      <div className="tickets">
        <h1>Boka biljetter</h1>
        {/* Locations ----------------------------------- */}
        {locations && (
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
        )}
        {/* dates ----------------------------------- */}
        {dates && (
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
        )}
        {/* hours ----------------------------------- */}
        {salesOrder.date && (
          <div className="hours">
            <p>Choose an hour:&nbsp;</p>
            {dates
              .find((date) => date._id === salesOrder.date_id)
              .hours.map((hour) => (
                <button
                  className="hour-button"
                  type="button"
                  value={hour}
                  onClick={handleHourChange}
                >
                  {hour}
                  &nbsp; BUY TIKECTS
                </button>
              ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
export default MovieDetails;
