import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlayCircle,
  faAngleDoubleRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import Footer from "../../Components/Footer/Footer";
import formatDay from "../../utils/utils";
import Modal from "../../Components/Modal/Modal";
import Header from "../../Components/Header/Header";
import "./MovieDetails.css";

library.add(faPlayCircle, faAngleDoubleRight, faClock);

function MovieDetails() {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const { currentMovie, locations, salesOrder, screenings, showModal } = state;

  const navigate = useNavigate();

  // When location change is saved in sales Order and also screnning should change
  const currentScreeningFromSalesOrder = screenings.find(
    (screen) =>
      screen.movie_id === salesOrder.movie_id &&
      screen.location_id === salesOrder.location_id
  );
  // Used to change date and hour from specific movie/location
  const newDates = currentScreeningFromSalesOrder.dates.map((date) => {
    return {
      day_id: date._id,
      day: formatDay(date.date),
      screening: date.screening, // array
    };
  });

  const handleSelectedLocation = (e) => {
    const newLocation = locations.find(
      (location) => e.target.value === location._id
    );
    // We need to change the screening information for this new location
    const newLocationScreening = screenings.find(
      (screening) =>
        screening.movie_id === salesOrder.movie_id &&
        screening.location_id === newLocation._id
    );
    const dates = newLocationScreening.dates.map((date) => {
      return {
        day_id: date._id,
        day: formatDay(date.date),
        screening: date.screening, // array
      };
    });
    dispatch({
      type: "setSalesOrder",
      data: {
        location_id: e.target.value,
        location: newLocation.location,
        salong: newLocation.salong,
        place: newLocation.place,
        mapUrl: newLocation.mapUrl,
        price: newLocation.price,
        totalSeats: newLocation.totalSeats,
        date_id: dates[0].day_id, // new dates for new location
        date: dates[0].day,
      },
    });
  };

  const handleSelectedDay = (e) => {
    dispatch({
      type: "setSalesOrder",
      data: {
        date_id: e.target.value,
        date: newDates.find((date) => e.target.value === date.day_id).day,
      },
    });
  };

  const handleSelectedHour = (e) => {
    dispatch({
      type: "setSalesOrder",
      data: {
        screening_id: e.target.value,
        screening: newDates
          .find((date) => salesOrder.date_id === date.day_id)
          .screening.find((screening) => screening._id === e.target.value).hour,
      },
    });
    navigate("/tickets");
  };

  const handleOpenModal = () => {
    dispatch({ type: "setShowModal", data: true });
  };

  const currentLanguage = i18n.language;

  return (
    <div className="container">
      <Header />
      {/* Movie details ----------------------------------- */}
      {currentMovie && (
        <div data-testid="movie-details" className="movie-details">
          <figure className="movie-general-image">
            <div className="poster">
              <img alt="poster" src={currentMovie.poster} />
            </div>
            {showModal && <Modal />}
          </figure>
          <button
            className="watch-trailer"
            type="button"
            onClick={handleOpenModal}
            aria-label="play"
            data-testid="show-modal"
          >
            <h1>
              {t("watchTrailer")}
              &nbsp;
            </h1>
            <FontAwesomeIcon
              icon="play-circle"
              size="lg"
              className="play-container"
            />
          </button>
          <div className="superior">
            <h1>{currentMovie.title}</h1>

            <h4>
              {t("clasification")}
              :&nbsp;
              {currentMovie.rated[currentLanguage]}
            </h4>
            <h4>
              {t("recomendation")}
              :&nbsp;
              {currentMovie.minimunAge}
              &nbsp;
              {t("years")}
            </h4>
            <h4>
              {t("duration")}
              :&nbsp;
              {currentMovie.duration}
            </h4>
          </div>

          <div className="inferior">
            <h1>{currentMovie.title}</h1>
            <h3 className="subtitle">
              {t("clasification")}
              :&nbsp;
            </h3>
            <h4>{currentMovie.rated[currentLanguage]}</h4>
            <h3 className="subtitle">
              {t("director")}
              :&nbsp;
            </h3>
            <h4>{currentMovie.director}</h4>
            {currentMovie.actors && (
              <>
                <h3 className="subtitle">
                  {t("cast")}
                  :&nbsp;
                </h3>
                <h4>{currentMovie.actors}</h4>
              </>
            )}

            <h3 className="subtitle">
              {t("synopsis")}
              :&nbsp;
            </h3>
            <h4>{currentMovie.description[currentLanguage]}</h4>
          </div>
        </div>
      )}
      {/* Tickets ----------------------------------- */}
      <div className="tickets">
        <h1>{t("reservationTickects")}</h1>
        {/* Locations ----------------------------------- */}
        {locations && (
          <div className="location_dropDownList">
            <label htmlFor="location">
              <h4>
                {t("selectLocation")}
                :&nbsp;
              </h4>
            </label>
            <select
              data-testid="dropdown-location"
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
              <h4>
                {" "}
                {t("selectDay")}
                :&nbsp;
              </h4>
            </label>
            <select
              data-testid="dropdown-day"
              name="days"
              className="days"
              onChange={handleSelectedDay}
            >
              {newDates.map((date) => (
                <option value={date.day_id} key={date.day_id}>
                  {date.day}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* -----------------map------------------ */}
        {locations && (
          <div className="map-iframe">
            <h4>
              {t("place")}
              :&nbsp;
              {salesOrder.place}
            </h4>
            <iframe
              title="map"
              src={salesOrder.mapUrl}
              width="600"
              height="450"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
            />
          </div>
        )}
        {/*  ------------------hours----------------- */}
        {newDates && (
          <div className="hours">
            <h4>
              {t("selectHour")}
              :&nbsp;
            </h4>
            {newDates
              .find((date) => date.day_id === salesOrder.date_id)
              .screening.map((hour) => (
                <button
                  data-testid="hour-button"
                  className="hour-button"
                  type="button"
                  key={hour._id}
                  value={hour._id}
                  onClick={handleSelectedHour}
                >
                  <FontAwesomeIcon icon="clock" size="lg" />
                  &nbsp; &nbsp;
                  {hour.hour}
                  &nbsp; &nbsp;
                  {t("screen")}
                  :&nbsp;
                  {salesOrder.salong}
                  &nbsp; &nbsp;
                  {t("buyTickects")}
                  &nbsp;
                  <FontAwesomeIcon icon="angle-double-right" size="lg" />
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
