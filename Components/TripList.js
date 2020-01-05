import React from 'react'
import style from './TripList.module.scss'
import TripElement from './TripElement'
// We import flatpickr to use its utility functions for dates
import flatpickr from 'flatpickr'

const DayMarker = (props) => {
    return (
        <div class={style.dayMarker}> 
            <div class={style.day}>
                {flatpickr.formatDate(props.day, 'M, d')}
            </div>
        </div>
    )
}

const TimeInterval = (props) => {
    var addOne = false

    if(props.arrival) {
        let interval = props.arrival.getTime() - props.departure.getTime()
        if (interval < 172800000 && props.arrival.getDate() === props.departure.getDate() + 1)
            addOne = true
    }

    return (
        <div class={style.timeInterval}>
            <div class={style.time}>
                {flatpickr.formatDate(props.departure, 'h:i K')}
            </div>
            <div class={style.bar}></div>
            <div class={style.time}>
                {addOne ? <span class={style.addOne}>+1</span> : null} 
                {props.arrival ? flatpickr.formatDate(props.arrival, 'h:i K') : <span style={{'text-transform': 'none'}}>No ETA</span> }
            </div>
        </div>
    )
}
const TripList = (props) => {

    const generateList = (tripList) => {
        var currentDay = null

        // TODO: COMMENT ME!
        return tripList.map((tripElement) => {
            let date = tripElement.departure.date
            let day = new Date(date.getFullYear(),date.getMonth() , date.getDate())
            let render = false

            // We use getTime for the Date object so the comparison is done properly
            if(!currentDay || day.getTime() !== currentDay.getTime()){
                currentDay = day
                render = true
            }
            
            return (
                <>
                    {render && <DayMarker day={currentDay} />}
                    <div class={style.tripSuperContainer}>
                        <TimeInterval departure={tripElement.departure.date} arrival={tripElement.arrival.date}/>
                        <TripElement trip={tripElement} actions={props.actions}>
                            {/*<>
                            Test
                            </>*/}
                        </TripElement>
                    </div>
                </>
            )
        })
    }

    return (
        <div class={style.tripTimeline}>
            {generateList(props.tripList)}
        </div>
    )
}


export default TripList
