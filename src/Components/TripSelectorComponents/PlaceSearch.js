import React from 'react'
import PlaceElement from './PlaceElement'
// Utils
import searchCityList from '../../Util/fetchCityList'
import debounce from '../../Util/debounce'
// CSS
import mainCSS from './PlaceSearch.module.css'

class PlaceSearch extends React.Component {

  constructor(props) {
    super(props)

    // TODO: Make into a standalone function.
    // Merge the two stylesheets and concatenate the css classes names so the new style just overrides or extends it.
    if(props.style){
      var mergedCSS = Object.keys(props.style).reduce((cssObject, property) => {
          // If the original css has the property defined on the new one, then concatenate the names and replace it.
          if(cssObject[property]) 
            return {...cssObject, [property]: [cssObject[property], props.style[property]].join(' ')}

          // Just add the property to the object if it doesn't
          return {...cssObject, [property]: props.style[property]}
      }, mainCSS)
    }

    // Fallback to the mainCSS if no styles are passed.
    this.style = mergedCSS || mainCSS

    // DOM References
    this.node = React.createRef()
    this.inputRef = React.createRef()

    // We use a debounce function to delay the fetching of the data from the API while the user is typing.
    // The debounce function is called here so the closure can be made correctly and the timeout works.
    this.getCityList = debounce(() => { // This function will be called when the timeout finally runs out
      searchCityList(this.state.searchTerm).then((list) => {
        this.setState({cityList: list})
      })
    }, 350)

    this.state = {
      searchTerm: null,
      cityList: null,
      selectedCity: null,
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.handleClick, false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchTerm !== prevState.searchTerm)
      // We call the debounced function everytime the state updates and the searchTerm is different than the previous one.
      this.getCityList()
  }

  updateSearchTerm = (e) => {
    this.setState({searchTerm: e.target.textContent, selectedCity: null})
  }

  // FIXME: Change update the city when selectedCity changes, not only when it's submitted.
  submitCity = (city) => {
    this.props.update(city)
    this.setState({selectedCity: (city ? city.placeName : null), cityList: null, searchTerm: null})
  }

  handleClick = (e) => {
    // If a click is registered outside the element, we clear the cityList array to hide the list.
    if (!this.node.contains(e.target) && this.state.cityList) {
      this.setState({cityList: null})
      return
    }
    else if(this.node.contains(e.target)){
      // Clear the search box and focus it.
      this.setState({selectedCity: null})
      this.submitCity(null)
      this.inputRef.focus()
      return
    }
  }

  render() {
    let style = this.style
    return (
      <div className={style.container}>
      
        <div className={style.box} ref={node => { this.node = node; }}>
          {this.props.children && <label>{this.props.children}</label>}
          
          <div 
            className={`${style.input} ${this.state.selectedCity && style.highlight}`} 
            onInput={this.updateSearchTerm} 
            ref={ref => this.inputRef = ref}
            spellcheck={false}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >{this.state.selectedCity || null}</div>

          <i className={`${style.edit} fas fa-times-circle`} style={this.state.selectedCity && {display: 'inline'}}></i>
        </div>

        <React.Fragment>
        {this.state.cityList && 
          <ul className={`${style.results} shadowedBox`}>
            {this.state.cityList.map(city => 
              <PlaceElement 
                class={style.element} 
                key={city.id} 
                city={city} 
                submit={() => this.submitCity(city)}
                style={style}
              />
            )}
          </ul>
        }
        </React.Fragment>
      </div>
    )
  }
}

export default PlaceSearch