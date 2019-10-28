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
const TripList = (props) => {

    const generateList = (tripList) => {
        var currentDay = null

        // TODO: COMMENT ME!
        return tripList.map((tripElement) => {
            let date = tripElement.departure
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
                    <TripElement trip={tripElement} /*dispatcher={contextProperties.dispatcher}*/ />
                </>
            )
        })
    }

    return (
        <div class={style.tripTimeline}>
            {generateList(props.tripList)}
            {/*props.children*/}
        </div>
    )
}


export default TripList
