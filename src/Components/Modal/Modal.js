import React, { useContext } from "react";
import AppContext from "../../store/context";
import "./Modal.css";

function Modal() {
  const { state, dispatch } = useContext(AppContext);
  const { currentMovie } = state;
  // const { setShowModal, currentMovie } = useContext(AppContext);

  const handleCloseModal = () => {
    dispatch({ type: "setShowModal", data: false });
  };

  return (
    <div className="modal" onClick={handleCloseModal}>
      <section className="modal-content">
        <button
          data-testid="close-modal"
          type="button"
          onClick={handleCloseModal}
        >
          X
        </button>
        <iframe
          data-testid="modal"
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
