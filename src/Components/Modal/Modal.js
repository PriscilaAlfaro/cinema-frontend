// see https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal

import React, { useContext } from "react";
import AppContext from "../../context/context";
import "./Modal.css";

function Modal() {
  const { setShowModal, currentMovie } = useContext(AppContext);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="modal" onClick={() => setShowModal(false)}>
      <section className="modal-content">
        <button type="button" onClick={() => setShowModal(false)}>
          X
        </button>
        <iframe
          title="movie"
          src={`${currentMovie.video}?autoplay=1`}
          frameBorder="0"
          allow=" accelerometer; autoplay;  clipboard-write; encrypted-media; gyroscope; picture-in-picture "
          allowFullScreen
          className="iframe"
        />
      </section>
    </div>
  );
}

export default Modal;
