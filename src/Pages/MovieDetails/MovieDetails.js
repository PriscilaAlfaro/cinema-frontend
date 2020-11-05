/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from "react";
// import ReactPlayer from "react-player";
import { useNavigate } from "@reach/router";
import AppContext from "../../context/context";
import Footer from "../../Components/Footer/Footer";
import formatDay from "../../utils/utils";
import Modal from "../../Components/Modal/Modal";
import "./MovieDetails.css";

function MovieDetails() {
  const {
    currentMovie,
    locations,
    setSalesOrder,
    salesOrder,
    screenings,
    setShowModal,
    showModal,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const currentScreeningFromSalesOrder = screenings.find(
    (screen) =>
      screen.movie_id === salesOrder.movie_id &&
      screen.location_id === salesOrder.location_id
  );

  const newDates = currentScreeningFromSalesOrder.dates.map((date) => {
    return {
      day_id: date._id,
      day: formatDay(date.date),
      screening: date.screening, // array
    };
  });

  function handleSelectedLocation(e) {
    const newLocation = locations.find((loc) => e.target.value === loc._id);

    const newLocationScreening = screenings.find(
      (screen) =>
        screen.movie_id === salesOrder.movie_id &&
        screen.location_id === newLocation._id
    );

    const dates = newLocationScreening.dates.map((date) => {
      return {
        day_id: date._id,
        day: formatDay(date.date),
        screening: date.screening, // array
      };
    });

    /*
    OJO, Se debe inicializar una hora al igual que se hizo la primera vez en App.js
    Para poder pintar las horas adecuadas a este location y date
    date_id: dateTimes[0].day_id,
    date: dateTimes[0].day,
    */

    // PENDIENTE: 1. cambiar todos los videos de la base de datos a embed
    // 2. Darle formato a la imagen para que quede con sombra hacia adentro
    // 3. incluir en cada movie una  imagen grande para ponerla en movie details

    setSalesOrder({
      ...salesOrder,
      location_id: e.target.value,
      location: newLocation.location,
      price: newLocation.price,
      totalSeats: newLocation.totalSeats,
      date_id: dates[0].day_id, // new default values
      date: dates[0].day,
    });
  }

  function handleSelectedDay(e) {
    setSalesOrder({
      ...salesOrder,
      date_id: e.target.value,
      date: newDates.find((date) => e.target.value === date.day_id).day,
    });
  }

  function handleSelectedHour(e) {
    setSalesOrder({
      ...salesOrder,
      screening_id: e.target.value,
      screening: newDates
        .find((date) => salesOrder.date_id === date.day_id)
        .screening.find((screening) => screening._id === e.target.value).hour,
    });
    navigate("/tickets");
  }
  function handleOpenModal() {
    setShowModal(true);
  }
  return (
    <div className="container">
      {/* Movie details ----------------------------------- */}
      {currentMovie && (
        <div>
          <figure className="movie-general-image">
            <img
              alt=" "
              src="https://image.tmdb.org/t/p/original/4LuJCO1edIbLVGx99uv7luDoIJt.jpg"
            />
            {showModal && <Modal />}
            <div className="play-container" onClick={handleOpenModal}>
              <span>
                <img
                  className="play"
                  alt=" "
                  src="https://icons-for-free.com/iconfiles/png/512/control+media+multimedia+music+options+play+play+button+player-1320185653542985681.png"
                />
              </span>
            </div>
          </figure>
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
          <div className="location_dropDownList">
            <label htmlFor="location">
              <h4>Choose a location:&nbsp;</h4>
            </label>
            <select
              name="location"
              className="location"
              onChange={handleSelectedLocation}
            >
              {locations.map((city) => (
                <option value={city._id} key={city._id}>
                  {city.location}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* -----------------days------------------ */}
        {newDates && (
          <div className="days_dropDownList">
            <label htmlFor="days">
              <h4>Choose a day:&nbsp;</h4>
            </label>
            <select name="days" className="days" onChange={handleSelectedDay}>
              {newDates.map((date) => (
                <option value={date.day_id} key={date.day_id}>
                  {date.day}
                </option>
              ))}
            </select>
          </div>
        )}
        {/*  ------------------hours----------------- */}
        {newDates && (
          <div className="hours">
            <h4>Choose an hour:&nbsp;</h4>
            {newDates
              .find((date) => date.day_id === salesOrder.date_id)
              .screening.map((hour) => (
                <button
                  className="hour-button"
                  type="button"
                  key={hour._id}
                  value={hour._id}
                  onClick={handleSelectedHour}
                >
                  {hour.hour}
                  &nbsp; BUY TIKECTS &nbsp; &gt;
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
