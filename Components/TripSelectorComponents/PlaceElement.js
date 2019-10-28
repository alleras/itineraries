import React from 'react'

function PlaceElement(props) {
  let className = props.class
  let style = props.style

  return (
    <li onClick={props.submit} class={className}>
      <div className={style.name}>
        {props.city.placeName}
      </div>
      <div className={style.detailedName}>
        {props.city.detailedName}
      </div>
      {/*this.props.city.placeName} | {this.props.city.detailedName*/}
    </li>
  )
}

export default PlaceElement