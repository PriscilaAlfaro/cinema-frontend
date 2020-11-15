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
  {
    _id: "UNKNOWN_1",
    title: "Trolls 2: Världsturnén",
    director: "Walt Dohrn,David P. Smith",
    actors: null,
    rated: "Familj",
    duration: "1 tim 31 min",
    minimunAge: 7,
    poster: "https://miro.medium.com/max/5760/1*A0tzaUmQLj_bHW_sy-vnRQ.jpeg",
    video: "https://www.youtube.com/embed/P9A6hOg9QQ0",
    image:
      "https://catalog.cinema-api.com/cf/images/ncg-images/68bfeef55ada4e7ab0606db2af0f40ad.jpg?width=240&version=EA2E80EE161E5DA161C6E26487054C9F&format=webp",
    description:
      "Poppy och Kvist ger sig ut på ett äventyr som kommer att föra dem långt bortom den verklighet de förut känt till. Under resans gång kommer de att upptäcka att de tillhör bara ett av de sex olika sorters trollfolk som bor utspridda över sex olika länder och som är hängivna sex olika sorters musik: Funk, Country, Techno, Klassiskt, Pop och Rock. Deras värld kommer att bli väldigt mycket större, och väldigt mycket högljuddare, än förut. En medlem av hårdrockens kungafamilj, drottning Barb, vill, med hjälp av sin far kung Thrash, förgöra alla andra sorters musik så att hårdrocken ensam kan regera. Världens öde står på spel och Poppy, Kvist, Biggie, Chenille, Satin, Cooper och Guy Diamond ger sig iväg så att de tillsammans kan hindra Barb från att ta över hela scenen.",
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
    _id: "UNKNOWN_1",
    location: "Malmö",
    price: 10,
    totalSeats: 25,
    salong: 1,
  },
  {
    _id: "UNKNOWN_2",
    location: "Göteborg",
    price: 10,
    totalSeats: 25,
    salong: 1,
  },
];

export const SCREENINGS = [
  {
    movie_id: "5f97eae8b06cca78a869a6a5",
    location_id: "5f9936d9b06cca78a869c01c",
    dates: [
      {
        _id: "5f9ac2480906e41755b3b438",
        date: "2020-11-15",
        screening: [
          {
            _id: "5f9ac2480906e41755b3b438",
            hour: "17:00",
          },
          {
            _id: "5f9ac2480906e41755b3b438",
            hour: "20:30",
          },
        ],
      },
    ],
  },
];
