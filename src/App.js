import React, {useState, useReducer, useEffect} from 'react'
// Utils
import {sampleTrips} from './config'
import shortid from 'shortid'
import Map from './Components/Map'
// Components
import TripBox from './Components/TripSelectorComponents/TripBox'
import TripList from './Components/TripList'
// CSS
import style from './App.module.scss'

var cloneDeep = require('lodash/cloneDeep')


function tripsReducer(state = [], action) {

  const sortTripsByDate = (trips) => {
    return trips.sort((a,b) => {
      let date1 = new Date(a.departure.date)
      let date2 = new Date(b.departure.date)
      
      if (date1 === date2) {
        return 0;
      }
      else {
        return (date1 < date2) ? -1 : 1;
      }
    })
  }

  // Reducer
  switch(action.type) {
    case 'ADD_TRIP': {
      // Trip state structure is shown on TripSelectorComponents/TripBox.js
      let tripWithID = {...action.trip, id: shortid.generate()}
      return sortTripsByDate([...state, tripWithID]) 
    }
    case 'DELETE_TRIP': {
      return state.filter(trip => trip.id !== action.tripID)
    }
    case 'ADD_STOP': {
      return state.map(trip => {
        if(trip.id === action.tripID) {
          // Create a new trip element without the stops
          const {stops, ...newTrip} = cloneDeep(trip)
          // Then add the stops to the previous trip element and incorporate it to the new one
          newTrip.stops = trip.stops.concat(action.stopInfo)
          
          return newTrip
        }
        return trip
      })
    }
    case 'MODIFY_COMMENT': {
      return state.map(trip => {
        if(trip.id === action.tripID){
          return legReducer(trip, action)
        }
        return trip
      })
    }
    default: {
      return state
    }
  }
}

function legReducer(state = [], action) {
  switch(action.type) {
    case 'MODIFY_COMMENT': {
      if(state[action.leg]){
        return {
          ...state,
          [action.leg]: {
            ...state[action.leg],
            comment: action.comment
          }
        }
      }
      return state
    }
    case 'MODIFY_DATE': {
      return state
    }
    default: {
      return state
    }
  }
}


export default () => {
  // Setting state
  // TODO: Make places information source of info be the API (For placeNames, etc), using only the id to store in db.
  const [trips, dispatchTrips] = useReducer(tripsReducer, sampleTrips)

  // Context settings
  const tripContext = {
    // Context state
    trips: trips, 
    // Context actions
    actions: {
      addStop: (id) => (stop) => dispatchTrips({type: 'ADD_STOP', tripID: id, stopInfo: stop}), 
      deleteTrip: (id) => dispatchTrips({type: 'DELETE_TRIP', tripID: id}),
      modifyComment: (id, leg) => comment => dispatchTrips({type: 'MODIFY_COMMENT', tripID: id, leg: leg, comment: comment})
    }
  }

  return (
    <div>      
      <header className={`row ${style.travelHeader}`}>
        <div className={`container ${style.container}`}>
          <h3 className={style.travelTitle}>Itinerary Creator</h3> 
          <div className={style.creator}>by Agustin Lleras</div>
          <div className={style.subtext}>
            <i className="far fa-clock"></i> <b>Trip total:</b> To be determined
          </div>
        </div>
      </header>

      <div className='row'>
        <Map trips={trips}></Map>
      </div>
      
      <div className='row' style={{"marginTop": "-3em"}}>
        <div className={`container ${style.container}`}>
          <TripBox 
          tripList={trips}
          processTrip={(tripInfo) => {
            dispatchTrips({type: 'ADD_TRIP', trip: tripInfo})
          }}></TripBox>
        </div>
      </div>

      <div className={`container ${style.container}`}>
        <TripList tripList={trips} actions={tripContext.actions} />
      </div>
    </div>
  )
}