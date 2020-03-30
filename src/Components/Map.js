import React, {useState, useReducer, useEffect} from 'react'
import mapboxgl from 'mapbox-gl'

import style from './Map.module.scss'

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxsZXJhcyIsImEiOiJjanJvYm42dW8xMHBxM3lvMG9mbnB2eDZkIn0.xyBG3j5GCSV7XLKHnwWtXg';

export default (props) => {
    let mapCenter = null

    // We Check that we're not dealing with an itinerary with no trips
    if(props.trips.length > 0){
        mapCenter = props.trips[0].departure.place.coordinates
    }
    var mapContainer

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: mapCenter || [0,0],
            zoom: 5,
        });
    })

    return (
        <div ref={el => mapContainer = el} className={style.mapContainer} />
    )
}