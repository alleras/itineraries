import {searchLimit} from '../config'

// TODO: Define an interface to be able to use any API with it. 
export default function fetchCityList(searchTerm) {
    // TODO: Sanitize searchTerm!!!!!!!!!
    let query = ''

    if(searchTerm) {
        // The main query
        query = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        query += `${searchTerm}.json`

        // We assemble the parameters
        let params = '?access_token=pk.eyJ1IjoiYWxsZXJhcyIsImEiOiJjanJvYm42dW8xMHBxM3lvMG9mbnB2eDZkIn0.xyBG3j5GCSV7XLKHnwWtXg'
        params += '&limit=' + searchLimit

        // Then join everything together
        query += params

        return fetch(query)
        .then(response => {
            let formattedResponse = response.json()
            return formattedResponse
        })
        .then(data => {
            console.log(data)
            // Select the 'features' property from the object
            data = data.features

            // If that property is inexistent, there's no results. We return an empty array
            if(!data)
                return []
            
            // Format data for sending out
            let formattedData = data.map((entry) => {
                let formattedEntry = {}

                formattedEntry.id = entry.id
                formattedEntry.placeName = (entry.address ? entry.address + ' ' : '') + entry.text
                formattedEntry.detailedName = entry.place_name.replace(formattedEntry.placeName + ', ', '').trim()
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