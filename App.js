import React, {useState, useReducer, useEffect} from 'react'
// Utils
import {sampleTrips} from './config'
import shortid from 'shortid'
// Components
import TripBox from './Components/TripSelectorComponents/TripBox'
import TripList from './Components/TripList'
import TripElement from './Components/TripElement'
// Context
import {TripListContext} from './Components/TripListContext'
// CSS
import './index.css'

function tripsReducer(state, action) {
  const sortTripsByDate = (trips) => {
    return trips.sort((a,b) => {
      let date1 = new Date(a.departure)
      let date2 = new Date(b.departure)
      
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
    case 'add': {
      let tripWithID = {...action.trip, id: shortid.generate()}
      return sortTripsByDate([...state, tripWithID]) 
    }
    case 'delete': {
      return state.filter(trip => trip.id !== action.tripID)
    }
    case 'addStop': {
      return state.map(trip => {
        if(trip.id === action.tripID) {
          // Create a new trip element without the stops
          const {stops, ...newTrip} = trip
          // Then add the stops to the previous trip element and incorporate it to the new one
          newTrip.stops = trip.stops.concat(action.stopInfo)
          
          return newTrip
        }
        return trip
      })
    }
    case 'changeTripProperty': {
      return state.map(trip => {
        if(trip.id === action.tripID){
          const newTrip = {...trip}
          newTrip[action.property] = action.value
          return newTrip
        }
        return trip
      })
    }
    default: {
      return state
    }
  }
}

export default (initialTripList) => {
  // Setting state
  // TODO: Make places information source of info be the API (For placeNames, etc), using only the id to store in db.
  const [trips, dispatchTrips] = useReducer(tripsReducer, sampleTrips)

  // Context settings
  const contextProperties = {
    // Context state
    trips: trips, 
    // Context actions
    dispatcher: {
      addStop: (id) => (stop) => dispatchTrips({type: 'addStop', tripID: id, stopInfo: stop}), 
      deleteTrip: (id) => dispatchTrips({type: 'delete', tripID: id}),
      modifyComment: (id) => (comment) => dispatchTrips({
        type: 'changeTripProperty', 
        property: 'comment', 
        tripID: id,
        value: comment
      })
    }
  }

  return (
    <div>
      <div class='row'>
        <iframe class='mapIframe' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6696.514962166765!2d-80.04900887263476!3d32.94421082734722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fe63d0dc91ef21%3A0xbbb6e90c18e64c96!2s2150+Northwoods+Blvd%2C+North+Charleston%2C+SC+29406!5e0!3m2!1sen!2sus!4v1551045538438" allowfullscreen></iframe>
      </div>
      
      <header class='row travel__header'>
        <div class='container'>
          <h3 class='travel__title'>Vacations in Venezuela</h3>
          <div class='travel__title_subtext'>
            <i class="far fa-clock"></i> 2 days, 4 hours
          </div>
        </div>
      </header>
      
      <div class='row'>
        <div class='container'>
          <TripBox processTrip={(tripInfo) => dispatchTrips({type: 'add', trip: tripInfo})}></TripBox>
        </div>
      </div>

      <div class='row'>
      </div>

      <div class='container'>
        <TripListContext.Provider value={contextProperties}>
          <TripList tripList={contextProperties.trips}>
            {contextProperties.trips.map(
              (tripEl) => <TripElement trip={tripEl} dispatcher={contextProperties.dispatcher} />
            )}
          </TripList>
        </TripListContext.Provider>
      </div>
    </div>
  )
}