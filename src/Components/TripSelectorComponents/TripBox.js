import React from 'react'
import PlaceSearch from './PlaceSearch'
import DateSelector from '../DateSelector'
import {tripTypes} from '../../config'
import style from './TripBox.module.css'
import placeSearchStyle from './TripBox_PlaceSearch.module.css'
import nestedUpdate from '../../Util/nestedUpdate'
var cloneDeep = require('lodash/cloneDeep');


// TODO: Validate input

const StyledPlaceSearch = function(props) {
    return <PlaceSearch {...props} style={placeSearchStyle}></PlaceSearch>
}

class TripBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tripTypes: tripTypes,
            showErrors: false,
            departure: {
                date: new Date(), 
                place: null,
                comment: '',
            },
            arrival: {
                date: null, 
                place: null,
                comment: '',
            },
            stops: [],
            selectedTripType: 0,
        }

        this.initialState = cloneDeep(this.state)

        this.SelectorWithOptions = function(props) {
            return <DateSelector 
                date={props.date}
                config={{
                dateFormat: "D d F h:i K",
                enableTime: true,
                defaultDate: new Date(),
                onChange: props.updater,
                onReady: props.updater,
                ...props.config
            }}/>
        }
    }

    processTrip = () => {
        // TODO: Change to a warning
        if(this.validateTrip(this.state) !== true){
            this.setState({showErrors: true})
            return false
        }

        let {tripTypes, showErrors, ...tripInfo} = cloneDeep(this.state)
        this.props.processTrip(tripInfo)
        this.setState(cloneDeep(this.initialState))
    }
    
    validateTrip = (trip = false) => {

        if(trip === false)
            return false
        
        // Arrival shouldn't happen before departure  -- DONE
        // TODO: Arrival and departure dates shouldn't overlap with any of the other trips
        // Departure and arrival places are required -- DONE
        // Departure and arrival dates are required -- DONE

        let departure = trip.departure
        let arrival = trip.arrival
        let errors = {}
        
        errors.departurePlace = !departure.place ? 'An origin is required.' : ''
        errors.arrivalPlace = !arrival.place ? 'A destination is required.' : ''
        errors.departureDate = !departure.date ?  'Departure date is required.' : ''

        errors.general = 
            (!arrival.date == null && new Date(departure.date) > new Date(arrival.date)
            ? 'The arrival date shouldn\'t be set before departure.' : '')

        // We check that all the error properties are empty strings, if they are,
        // the form is validated. 
        // If not, the errors object is returned
        return Object.keys(errors).every((key) => errors[key].length <= 0) || errors
    }

    selectTripType = (id) => {
        let requiresReturn = this.state.tripTypes.find(tripType => id === tripType.id).requiresReturn
        if(!requiresReturn){
            this.updateNestedState('arrival.date')(null)
        }
        this.setState({selectedTripType: id})
    }

    updateNestedState = path => value => {
        this.setState(prevState => nestedUpdate(path, value)(prevState))
    }

    render() {
        let state = this.state
        /* We filter out the selected trip and then check if it requires a return in order to show the 'Arriving' part */
        let requiresReturn = state.tripTypes.find(tripType => state.selectedTripType === tripType.id).requiresReturn
        let error = this.validateTrip(state)

        return(
            <div className={`${style.box} ${style.shadowedBox}`}>
                <ul className={style.tripTypeSelector}>
                    {/* TODO: Clean up the way the class is generated */}
                    {state.tripTypes.map(tripType => { // The list of trip types as defined in the state.
                        let iconClass = 'fas ' + tripType.icon
                        let buttonClass = `${style.tripTypeButton} `
                        buttonClass +=  state.selectedTripType === tripType.id ? style.selected : ''
                        return (
                            <li class={buttonClass} onClick={() => this.selectTripType(tripType.id)} key={tripType.id}>
                                <i class={iconClass}></i>
                            </li>
                        )
                    })}
                </ul>
                {/* FIXME: Show errors on the respective fields */}
                {this.state.showErrors && (
                <div class={style.error}>
                    <>{error.departurePlace}</>
                    <>{error.arrivalPlace}</>
                    <>{error.departureDate}</>
                    <>{error.general}</>
                </div>
                )}
                {/* TODO: Ditch the row and six columns */}
                {/* FIXME: TODO: Bind PlaceSearch to the state so that when a trip is added, it resets */}
                <div className={`row`}>
                    <div class='six columns' style={{'margin-bottom': '1em'}}>
                        <label>Where to?</label>
                        <div className={`${style.places} ${style.infoElement}`}>
                            <StyledPlaceSearch update={this.updateNestedState('departure.place')} ></StyledPlaceSearch>
                            <div className={`${style.places} ${style.separator}`}>
                                <i class="fas fa-long-arrow-alt-right" />
                            </div>
                            <StyledPlaceSearch update={this.updateNestedState('arrival.place')} ></StyledPlaceSearch>
                        </div>
                    </div>

                    <div class='six columns'>
                        <label>When?</label>
                        <div className={`${style.dates} ${style.infoElement}`}>
                            
                            <this.SelectorWithOptions
                            date={this.state.departure.date} 
                            updater={
                                (val) => this.updateNestedState('departure.date')(val[0])
                            }/>

                            {requiresReturn && 
                                <React.Fragment>
                                    <div className={`${style.dates} ${style.separator}`}>
                                        <i class="fas fa-chevron-right"></i>
                                    </div>
                                    <this.SelectorWithOptions
                                    date={this.state.arrival.date} 
                                    updater={(val) => this.updateNestedState('arrival.date')(val[0])}
                                    config={{
                                        defaultDate: null,
                                    }}/>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
                <div class={`${style.submit}`}>
                    <button class={`${style.button} button-primary shadowedBox`} onClick={this.processTrip}>Add trip</button>
                </div>
            </div>
        )
    }
}

export default TripBox