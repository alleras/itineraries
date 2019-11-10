import React from 'react'
import PlaceSearch from './PlaceSearch'
import DateSelector from '../DateSelector'
import {tripTypes} from '../../config'
import style from './TripBox.module.css'
import placeSearchStyle from './TripBox_PlaceSearch.module.css'
import nestedUpdate from '../../Util/nestedUpdate'

// TODO: Validate input
// TODO: Style


const StyledPlaceSearch = function(props) {
    return <PlaceSearch {...props} style={placeSearchStyle}></PlaceSearch>
}

class TripBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tripTypes: tripTypes,
            departure: {
                date: new Date(), 
                place: null,
                nested: {
                    a: 1,
                    b: 2,
                }
            },
            arrival: {
                date: new Date(), 
                place: null
            },
            stops: [],
            comment: '',
            selectedTripType: 0,
        }

        this.SelectorWithOptions = function(props) {
            return <DateSelector config={{
                dateFormat: "D d F h:i K",
                enableTime: true,
                defaultDate: new Date(),
                ...props.config
            }}/>
        }
    }

    // TODO: Form validation
    processTrip = () => {
        // TODO: Even though we are handling data in an inmutable way in this component, the variables that are being sent to the
        // parent component are a reference, not a clone. Fix that.
        let {tripTypes, ...tripInfo} = this.state
        this.props.processTrip(tripInfo)
    }

    selectTripType = (id) => this.setState({selectedTripType: id})

    updateNestedState = path => value => {
        this.setState(prevState => nestedUpdate(path, value)(prevState))
    }

    render() {
        let state = this.state
        /* We filter out the selected trip and then check if it requires a return in order to show the 'Arriving' part */
        let requiresReturn = state.tripTypes.filter(tripType => state.selectedTripType === tripType.id)[0].requiresReturn

        return(
            <div className={`${style.box} shadowedBox`}>
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
                {/* TODO: Ditch the row and six columns */}
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
                            
                            <this.SelectorWithOptions config={{
                                onChange: (val) => this.updateNestedState('departure.date')(val[0]),
                            }}/>

                            {requiresReturn && 
                                <React.Fragment>
                                    <div className={`${style.dates} ${style.separator}`}>
                                        <i class="fas fa-chevron-right"></i>
                                    </div>
                                    <this.SelectorWithOptions config={{
                                        onChange: (val) => this.updateNestedState('arrival.date')(val[0]),
                                        defaultDate: new Date().setDate(new Date().getDate() + 6),

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