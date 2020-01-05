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
        "date": new Date("2019-02-06 14:50"),
        "place": {
          "id": "place.14030488380533860",
          "placeName": "Maracaibo",
          "detailedName": "Maracaibo, Zulia, Venezuela",
          "coordinates": [
            -71.63333,
            10.63333
          ]
        },
        "comment": "",
      },
      "arrival": {
        "date": new Date("2019-02-06 16:40"),
        "place": {
          "id": "poi.1460288928359",
          "placeName": "Maracaibo",
          "detailedName": "Maracaibo, Lungomare Barcellona, Alghero, Sassari 07041, Italy",
          "coordinates": [
            8.318614,
            40.569885
          ]
        },
        "comment": "",
      },
      "selectedTripType": 0,
      "id": "2vzwgdnXZ",
      "stops": [],
    },
    {
      "departure": {
        "date": new Date("2019-02-07 08:00"),
        "place": {
          "id": "poi.1460288928359",
          "placeName": "Maracaibo",
          "detailedName": "Maracaibo, Lungomare Barcellona, Alghero, Sassari 07041, Italy",
          "coordinates": [
            8.318614,
            40.569885
          ]
        },
        "comment": "",
      },
      "arrival": {
        "date": null,
        "place": {
          "id": "poi.214748366041",
          "placeName": "Maracaibo",
          "detailedName": "Maracaibo, Isla Indias, López de Legaspi, Guadalajara, JAL, Guadalajara, Jalisco 44950, Mexico",
          "coordinates": [
            -103.37837,
            20.639103
          ]
        },
        "comment": "",
      },
      "selectedTripType": 3,
      "id": "2bUWx4ZqG",
      "stops": [],
    },
    {
      "departure": {
        "date": new Date("2019-02-08 14:50"),
        "place": {
          "id": "poi.1460288928359",
          "placeName": "Maracaibo",
          "detailedName": "Maracaibo, Lungomare Barcellona, Alghero, Sassari 07041, Italy",
          "coordinates": [
            8.318614,
            40.569885
          ]
        },
        "comment": "This is a comment that can be added to the trip.",
      },
      "arrival": {
        "date": new Date("2019-02-08 15:00"),
        "place": {
          "id": "place.14030488380533860",
          "placeName": "Maracaibo",
          "detailedName": "Maracaibo, Zulia, Venezuela",
          "coordinates": [
            -71.63333,
            10.63333
          ]
        },
        "comment": "",
      },
      "selectedTripType": 0,
      "id": "2jK7M0j_M",
      "stops": [],
    }
  ]

export {searchLimit, tripTypes, sampleTrips}