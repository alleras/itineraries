import React, {useState} from 'react'
// Components
import AddStop from './AddStop'
// Util
import shortid from 'shortid'
import {tripTypes} from '../config'

import style from './TripElement.module.scss'

        
const TripFragment = ({id, leg, icon, tripActions, legName, children}) => {
  let [comment, setComment] = useState(leg.comment)
  let [commentFlag, setFlag] = useState(false)

  const processComment = (text) => {
    tripActions.modifyComment(id, legName)(text)
    return setFlag(text.length === 0 ? false : commentFlag)
  }

  const commentChange = (e) => {
    return setComment(e.target.value)
  }

  return (
    <div class={`${style.tripFragment}`}>
      <div class={style.info}>
        <div class={style.mainPanel}>

          <div class={style.tripIconContainer}>
            <i class={icon}></i>
          </div>

          <div class={style.legName}>
            {/* TODO: Make a util method to get the detailedName without the placeName on it */ }
            <big>{leg.place.placeName}</big>
            <small>{leg.place.detailedName}</small>
          </div>
        </div>

        <div class={style.secPanel}>
          {leg.date && (
          <div class={style.tripInfo}>
          <span class={style.icon}> {leg.date.toDateString()}</span>
          </div>
          )}
          

          <div class={style.utilButton}>
            <span onClick={() => setFlag(!commentFlag)}>
              <i class="fas fa-comment"></i> Comment
            </span>
            <span onClick={() => tripActions.deleteTrip(id)}>
              <i class="fas fa-trash"></i>
            </span>
          </div>
        </div>

        <div class={style.comment} style={{display: (leg.comment.length <= 0 && !commentFlag) ? 'none' : 'inherit'}}>
          {commentFlag ? (
              <input type="text" 
                     onBlur={() => processComment(comment)}
                     onChange={commentChange}
                     placeholder={'Insert your comment here'} 
                     value={comment} />
          ) : (
            leg.comment
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

// FIXME: Refactor to more usable component
const TripElement = ({trip, actions, children}) => {

    let tripTypeText = tripTypes.filter((element) => element.id === trip.selectedTripType)[0].type

    // FIXME: Fix this convoluted process of getting the icon or text of a tripType
    let iconClass = `fas ${tripTypes.filter((element) => element.id === trip.selectedTripType)[0].icon}`
        
    const TripFragmentWithInfo = (props) => (
      <TripFragment id={trip.id} icon={iconClass} tripActions={actions} {...props} >
        {children}
      </TripFragment>
    )
      return (
        <div class={`${style.tripElement}`}>

          {/* Departure */}
          <TripFragmentWithInfo leg={trip.departure} legName='departure'>
            {children}
          </TripFragmentWithInfo>   

          {trip.selectedTripType === 3 && (    
          <div class={style.stopList}>
            {trip.stops.length > 0 && 
              trip.stops.map(stop => (
                <div key={shortid.generate()} class={style.stop}>
                  <i class="fas fa-map-marker-alt"></i> 
                  <b>{stop.placeName}</b>
                  <div class={style.stopSubText}>
                    <small>{stop.detailedName}</small>
                  </div>
                </div>
              ))
            }

            <AddStop handleAdd={actions.addStop(trip.id)} />
          </div>
          )}
          
          {/* Arrival */}
          {trip.arrival && (
            <TripFragmentWithInfo leg={trip.arrival} legName='arrival' />
          )}
        </div>
    )
}

export default TripElement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   