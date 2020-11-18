export const MOVIES = [
  {
    _id: "5f97eae8b06cca78a869a6a5",
    title: "Nelly Rapp - Monsteragent",
    director: "Amanda Adolfsson",
    actors:
      "Matilda Gross, Johan Rheborg, Marianne Mörck, Björn Gustafsson, Lily Wahlsteen",
    rated: "Familj",
    duration: "1 tim 32 min",
    minimunAge: 11,
    poster:
      "https://image.tmdb.org/t/p/original/4LuJCO1edIbLVGx99uv7luDoIJt.jpg",
    video: "https://www.youtube.com/embed/Z7LQTZnaSzk",
    image:
      "https://catalog.cinema-api.com/cf/images/ncg-images/4fcc013a61e04db3888f03f187b0c6b7.jpg?width=240&version=1C7CCC78AD4FC41C08AB456DF0A59168&format=webp",
    description:
      "Nelly och hennes hund London ska tillbringa höstlovet hos sin morbror Hannibal. Men det visar sig att Hannibal inte lever det lugna liv som hon trott – han är en monsteragent! Nelly är snart omgiven av vampyrer, spöken, varulvar och Frankensteinare och dras in i ett gastkramande äventyr där allt hon tidigare trott på sätts på prov.",
  },
];

export const LOCATIONS = [
  {
    _id: "5f9936d9b06cca78a869c01c",
    location: "Stockholm",
    price: 10,
    totalSeats: 25,
    salong: 1,
  },
  {
    _id: "5f9936d9b06cca78a869c01d",
    location: "Malmö",
    price: 10,
    totalSeats: 25,
    salong: 1,
  },
  // {
  //   _id: "5f9936d9b06cca78a869c01e",
  //   location: "Göteborg",
  //   price: 10,
  //   totalSeats: 25,
  //   salong: 1,
  // },
];

export const SCREENINGS = [
  {
    movie_id: "5f97eae8b06cca78a869a6a5",
    location_id: "5f9936d9b06cca78a869c01c", // stockholm
    dates: [
      {
        _id: "5f9ac2480906e41755b3b438",
        date: "2020-12-04",
        screening: [
          {
            _id: "5f9ac2480906e41755b3b439",
            hour: "17:00",
          },
        ],
      },
      {
        _id: "5f9ac2480906e41755b3b410",
        date: "2020-12-06",
        screening: [
          {
            _id: "5f9ac2480906e41755b3b440",
            hour: "13:00",
          },
        ],
      },
    ],
  },
  {
    movie_id: "5f97eae8b06cca78a869a6a5",
    location_id: "5f9936d9b06cca78a869c01d", // malmo
    dates: [
      {
        _id: "5f9ac2480906e41755b3b335",
        date: "2020-12-05",
        screening: [
          {
            _id: "5f9ac2480906e41755b3b451",
            hour: "14:00",
          },
        ],
      },
    ],
  },
];

export const SEATAVAILABILITY = {
  STOCKHOLM: {
    purchasedSeats: [1, 2],
    screening_id: "5f9ac2480906e41755b3b439",
  },
  MALMO: {
    purchasedSeats: [1, 2],
    screening_id: "5f9ac2480906e41755b3b451",
  },
};

export const ORDER = {
  order: {
    name: "Jane Doe",
    email: "jdoe@gmail.com",
    location_id: "5f9936d9b06cca78a869c01c",
    location: "Stockholm",
    movie_id: "5f97eae8b06cca78a869a6a5",
    movie: "Nelly Rapp - Monsteragent",
    date_id: "5f9d5d2a7f933a1dcba88a27",
    date: "04/12/2020",
    screening_id: "5f9ac2480906e41755b3b439",
    screening: "17:00",
    salong: 1,
    place: "Mall of Scandinavia",
    price: 10,
    totalPrice: 10,
    seatNumber: [3],
    paymentReference: "ch_1HiCaI2eZvKYlo2CsnhbyVsJ",
    paymentStatus: "pending",
    purchaseDate: new Date().toISOString(),
  },
};
