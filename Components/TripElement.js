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
        <div class={`${style.tripElement} ${trip.to ? style.withLine : null}`}>
          {/*<div class={style.tripIconContainer}>
            <i class={iconClass}></i>
          </div>*/}
          {/* Departure */}
          <div class={`${style.tripFragment}`}>
            <div class={style.tripIconContainer}>
              <i class='fas fa-circle-notch'></i>
            </div>
            <div class={style.info}>
              <div class={style.mainPanel}>
                <div class={style.legName}>
                  {/* TODO: Make a util method to get the detailedName without the placeName on it */ }
                  <big>{trip.from.placeName}</big>
                  <small>{trip.from.detailedName}</small>
                </div>
              </div>

              <div class={style.secPanel}>
                {/* TODO: Select the correct style of icon */ }
                <div class={style.tripInfo}>
                  <span class={style.icon}><i class={`fas fa-plane-departure`}></i> {trip.departure.toDateString()}</span>
                  <span class={style.icon}><i class={`far fa-clock`}></i> {trip.departure.toLocaleTimeString()}</span>
                </div>

                <div class={style.utilButton}>
                  <span onClick={console.log('beep')}>
                    <i class="fas fa-comment"></i>
                  </span>
                  <span onClick={console.log('beep')}>
                    <i class="far fa-edit"></i>
                  </span>
                  <span onClick={console.log('beep')}>
                    <i class="fas fa-trash"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
                   
          {/* Arrival */}
          <div class={`${style.tripFragment}`}>
            <div class={style.tripIconContainer}>
              <i class='fas fa-circle-notch'></i>
            </div>
            <div class={style.info}>
              <div class={style.mainPanel}>
                <div class={style.legName}>
                  {/* TODO: Make a util method to get the detailedName without the placeName on it */ }
                  <big>{trip.to.placeName}</big>
                  <small>{trip.to.detailedName}</small>
                </div>
              </div>

              <div class={style.secPanel}>
                {/* TODO: Select the correct style of icon */ }
                {trip.arrival && (
                <div class={style.tripInfo}>
                <span class={style.icon}><i class={`fas fa-plane-arrival`}></i> {trip.arrival.toDateString()}</span>
                <span class={style.icon}><i class={`far fa-clock`}></i> {trip.arrival.toLocaleTimeString()}</span>
                </div>
                )}
                

                <div class={style.utilButton}>
                  <span onClick={console.log('beep')}>
                    <i class="fas fa-comment"></i>
                  </span>
                  <span onClick={console.log('beep')}>
                    <i class="far fa-edit"></i>
                  </span>
                  <span onClick={console.log('beep')}>
                    <i class="fas fa-trash"></i>
                  </span>
                </div>
              </div>
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