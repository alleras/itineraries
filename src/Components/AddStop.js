import React from 'react'
// Components
import PlaceSearch from './TripSelectorComponents/PlaceSearch'

import style from './AddStop.module.scss'
import placeSearchStyle from './AddStop_PlaceSearch.module.scss'

class AddStop extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            toggleSearchBar: false
        }
    }

    handleUpdate = (stop) =>{
        this.setState({toggleSearchBar: !this.state.toggleSearchBar})
        this.props.handleAdd(stop)
    }

    render() {
        return(
        <div class={`${style.addStop} ${this.state.toggleSearchBar && style.active}`}>
            <span class={style.addStopButton} onClick={() => this.setState({toggleSearchBar: !this.state.toggleSearchBar})}>
                <i class="fas fa-plus-circle"></i> Add Stop
            </span>        
            {this.state.toggleSearchBar && 
                <PlaceSearch update={this.handleUpdate} style={placeSearchStyle}></PlaceSearch>
            }
        </div>
        )
    }
}

export default AddStop