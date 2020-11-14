const reducer = (state, action) => {
  switch (action.type) {
    case "setMovies":
      return {
        ...state,
        movies: action.data,
      };
    case "setLocations":
      return {
        ...state,
        locations: action.data,
      };
    case "setScreenings":
      return {
        ...state,
        screenings: action.data,
      };
    case "setCurrentMovie":
      return {
        ...state,
        currentMovie: action.data,
      };
    case "setPurchasedSeats":
      return {
        ...state,
        purchasedSeats: action.data,
      };

    case "setSeatAvailability":
      return {
        ...state,
        seatAvailability: action.data,
      };
    case "setShowModal":
      return {
        ...state,
        showModal: action.data,
      };
    case "setSalesOrder":
      return {
        ...state,
        salesOrder: { ...state.salesOrder, ...action.data },
      };
    default:
      return state;
  }
};
export default reducer;
