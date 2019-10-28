import {SearchLimit as searchLimit} from '../config'

// TODO: Define an interface to be able to use any API with it. 

const mock = {
    "type": "FeatureCollection",
    "query": [
        "maracaibo"
    ],
    "features": [
        {
            "id": "place.14030488380533860",
            "type": "Feature",
            "place_type": [
                "place"
            ],
            "relevance": 1,
            "properties": {
                "wikidata": "Q171632"
            },
            "text": "Maracaibo",
            "place_name": "Maracaibo, Zulia, Venezuela",
            "bbox": [
                -71.758432,
                10.583805,
                -71.581872,
                10.804575
            ],
            "center": [
                -71.63333,
                10.63333
            ],
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -71.63333,
                    10.63333
                ]
            },
            "context": [
                {
                    "id": "region.12747981326619380",
                    "short_code": "VE-V",
                    "wikidata": "Q43269",
                    "text": "Zulia"
                },
                {
                    "id": "country.5958724522570350",
                    "short_code": "ve",
                    "wikidata": "Q717",
                    "text": "Venezuela"
                }
            ]
        },
        {
            "id": "poi.1460288928359",
            "type": "Feature",
            "place_type": [
                "poi"
            ],
            "relevance": 1,
            "properties": {
                "landmark": true,
                "category": "beach bar, beach, bar, alcohol",
                "address": "Lungomare Barcellona"
            },
            "text": "Maracaibo",
            "place_name": "Maracaibo, Lungomare Barcellona, Alghero, Sassari 07041, Italy",
            "center": [
                8.318614,
                40.569885
            ],
            "geometry": {
                "coordinates": [
                    8.318614,
                    40.569885
                ],
                "type": "Point"
            },
            "context": [
                {
                    "id": "postcode.5901768326644440",
                    "text": "07041"
                },
                {
                    "id": "place.5901768325112750",
                    "wikidata": "Q166282",
                    "text": "Alghero"
                },
                {
                    "id": "region.11582716909870660",
                    "short_code": "IT-SS",
                    "wikidata": "Q16272",
                    "text": "Sassari"
                },
                {
                    "id": "country.4747984886519910",
                    "short_code": "it",
                    "wikidata": "Q38",
                    "text": "Italy"
                }
            ]
        },
        {
            "id": "poi.214748366041",
            "type": "Feature",
            "place_type": [
                "poi"
            ],
            "relevance": 1,
            "properties": {
                "landmark": true,
                "category": "biergarten, brewery, beer, bar, alcohol",
                "address": "Isla Indias, López de Legaspi, Guadalajara, JAL"
            },
            "text": "Maracaibo",
            "place_name": "Maracaibo, Isla Indias, López de Legaspi, Guadalajara, JAL, Guadalajara, Jalisco 44950, Mexico",
            "center": [
                -103.37837,
                20.639103
            ],
            "geometry": {
                "coordinates": [
                    -103.37837,
                    20.639103
                ],
                "type": "Point"
            },
            "context": [
                {
                    "id": "postcode.5285192633250860",
                    "text": "44950"
                },
                {
                    "id": "place.2650347488162500",
                    "wikidata": "Q9022",
                    "text": "Guadalajara"
                },
                {
                    "id": "region.10550176184993510",
                    "short_code": "MX-JAL",
                    "wikidata": "Q13160",
                    "text": "Jalisco"
                },
                {
                    "id": "country.1891876083773450",
                    "short_code": "mx",
                    "wikidata": "Q96",
                    "text": "Mexico"
                }
            ]
        }
    ],
    "attribution": "NOTICE: © 2018 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare."
}
export default function fetchCityList(searchTerm) {
    // TODO: Sanitize searchTerm!!!!!!!!!
    //return fetch(`https://api.teleport.org/api/cities/?search=${encodeURI(searchTerm)}`)

    let query = ''

    if(searchTerm) {
        // The main query
        query = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        query += `${searchTerm}.json`

        // We assemble the parameters
        let params = '?access_token=pk.eyJ1IjoiYWxsZXJhcyIsImEiOiJjanJvYm42dW8xMHBxM3lvMG9mbnB2eDZkIn0.xyBG3j5GCSV7XLKHnwWtXg'
        params += '&limit=5'

        // Then join everything together
        query += params

        return fetch('google.com'/*query*/)
        .then(response => {
            /*let formattedResponse = response.json()*/
            return /*formattedResponse*/mock
        })
        .then(data => {
            // Select the 'features' property from the object
            data = data.features

            // If that property is inexistent, there's no results. We return an empty array
            if(!data)
                return []
            
            // Format data for sending out
            let formattedData = data.map((entry) => {
                let formattedEntry = {}

                formattedEntry.id = entry.id
                formattedEntry.placeName = entry.text
                formattedEntry.detailedName = entry.place_name.replace(formattedEntry.name, '').trim()
                formattedEntry.coordinates = entry.center

                return formattedEntry
            })

            return formattedData
        })
    }
    else {
        // If no searchTerm is provided, the response is an empty array.
        return Promise.resolve([])
    }
}