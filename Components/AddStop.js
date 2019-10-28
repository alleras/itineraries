import React from 'react'
// Context
import {TripListContext} from './TripListContext'
// Components
import PlaceSearch from './TripSelectorComponents/PlaceSearch'

class AddStop extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        toggleSearchBar: false
        }
    }

    render() {
        return(
        <div>
            <button onClick={() => this.setState({toggleSearchBar: !this.state.toggleSearchBar})}>Add Stop</button>        
            {this.state.toggleSearchBar && 
                <PlaceSearch update={this.props.handleAdd(this.props.id)}></PlaceSearch>
            }
        </div>
        )
    }
}

export default AddStop