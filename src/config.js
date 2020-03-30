const searchLimit = 5;

const tripTypes = [
    {   
        id: 3,
        type: 'Road Trip',
        requiresReturn: false,
        icon: 'fa-car'
    },
    {   
        id: 0,
        type: 'Flight',
        requiresReturn: true,
        icon: 'fa-plane'
    },
    {   
        id: 1,
        type: 'Train',
        requiresReturn: true,
        icon: 'fa-train'
    },
    {   
        id: 2,
        type: 'Bus',
        requiresReturn: true,
        icon: 'fa-bus'
    },
]

const sampleTrips = [
  {
    "departure": {
      "date": new Date("2020-03-24T23:15:00.000Z"), 
      "place":{ 
        "id":"poi.910533070815",
        "placeName":"Aeropuerto Internacional de Maiquetía Simón Bolívar (CCS)",
        "detailedName":"Av. Intercomunal del Aeropuerto Internacional s/n, Vargas, Vargas, Venezuela",
        "coordinates":[-66.9981435,10.600434]
      },
      "comment":""
    },
    "arrival": {
      "date": new Date("2020-03-25T02:55:00.000Z"),
      "place": {
        "id":"region.10576407152235010",
        "placeName":"Florida",
        "detailedName":"United States",
        "coordinates":[-81.63167,28.13333]
      },
      "comment":""
    },
    "stops": [],
    "selectedTripType":0,
    "id":"bnowbkhwb"
  },
  {
    "departure":{
      "date": new Date("2020-03-31T11:15:00.000Z"),
      "place":{
        "id":"place.12519248066880980",
        "placeName":"Charleston",
        "detailedName":"South Carolina, United States",
        "coordinates":[-79.9403,32.7876]
      },
      "comment":""
    },
    "arrival":{
      "date":null,
      "place":{
        "id":"place.15278078705964500",
        "placeName":"New York",
        "detailedName":"New York, United States",
        "coordinates":[-73.9808,40.7648]
      },
      "comment":""
    },
    "selectedTripType":3,
    "id":"CdF1CohdZ",
    "stops": [
      {
        "id":"place.7673410831246050",
        "placeName":"Washington",
        "detailedName":"District of Columbia, United States",
        "coordinates":[-77.0366,38.895]}
      ]
    },
    {
      "departure": {
        "date": new Date("2020-04-08T23:15:00.000Z"),
        "place":{
          "id":"poi.987842560458",
          "placeName":"Newark Liberty International Airport (EWR)",
          "detailedName":"10 Toler Pl, Newark, New Jersey 07114, United States",
          "coordinates":[-74.173296,40.6927355]
        },
        "comment":"Long trip! Pack snacks!"
      },
      "arrival":{
        "date": new Date("2020-04-09T06:00:00.000Z"),
        "place":{
          "id":"poi.953482766534",
          "placeName":"Los Angeles International Airport (LAX)",
          "detailedName":"1 World Way, Los Angeles, California 90045, United States",
          "coordinates":[-118.406829,33.942912]
        },
        "comment":"Arrival is in local time. I should probably add an option for that, right?"
      },
      "stops":[],
      "selectedTripType":0,
      "id":"LeONUcjfV"
    }
  ]

export {searchLimit, tripTypes, sampleTrips}