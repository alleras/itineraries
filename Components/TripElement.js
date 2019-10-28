import React from 'react'
// Components
import AddStop from './AddStop'
// Util
import shortid from 'shortid'
import {tripTypes} from '../config'
import flatpickr from 'flatpickr'

import style from './TripElement.module.scss'

// FIXME: Refactor to more usable component
const TripElement = (props) => {
    const trip = props.trip
    const tripDispatcher = props.dispatcher

    let tripTypeText = tripTypes.filter((element) => element.id === trip.selectedTripType)[0].type

    // FIXME: Fix this convoluted process of getting the icon or text of a tripType
    let iconClass = `fas ${tripTypes.filter((element) => element.id === trip.selectedTripType)[0].icon}`
    return (
        <div class={style.tripElement}>
          {/*<div class={style.tripIconContainer}>
            <i class={iconClass}></i>
          </div>*/}

          <div class={`${style.tripFragment} ${trip.to? style.withLine : null}`}>
            <div class={style.tripIconContainer}>
              <i class='fas fa-circle-notch'></i>
            </div>

            <div class={style.info}>
              <big>{trip.from.detailedName}</big>
              <span>
                Departure: {trip.departure.toDateString()} {trip.departure.toLocaleTimeString()}
              </span>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

          </div>
                   
          <div class={`${style.tripFragment}`}>
            <div class={`${style.tripIconContainer} ${style.icon}`}>
              <i class='fas fa-map-marker-alt'></i>
            </div>
            <div class={style.info}>
              <big>{trip.to.detailedName}</big>
              {trip.arrival && (
                <span>
                  Arrival: {trip.arrival.toDateString()} {trip.arrival.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>

          {/*(<div>
            <h3>{trip.from.detailedName}</h3>
            <span>
              Departure: {trip.departure.toDateString()} {trip.departure.toLocaleTimeString()} <b>{tripTypeText}</b>
            </span>
          </div>

          <div>
            {trip.comment.length > 0 ? (
              trip.comment
            ) : (
              <input type="text" onBlur={(e) => tripDispatcher.modifyComment(trip.id)(e.target.value)}></input>
            )}
          </div>
  
          {trip.stops.length > 0 &&
            trip.stops.map(stop => <div key={shortid.generate()}>{stop.detailedName}</div>)
          }

          {trip.arrival && (
            <div>
              <h3>{trip.to.detailedName}</h3>
              <span>Arrival: {trip.arrival.toDateString()} {trip.arrival.toLocaleTimeString()} </span>
            </div>
          )}
  
          <button onClick={() => tripDispatcher.deleteTrip(trip.id)}>Delete</button>
  
          {trip.selectedTripType === 3 &&
            <AddStop id={trip.id} handleAdd={tripDispatcher.addStop} />
          }
        <hr></hr> )*/}
        </div>
    )
}

export default TripElement