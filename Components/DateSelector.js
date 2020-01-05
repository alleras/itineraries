import React from 'react'

import flatpickr from 'flatpickr'

import 'flatpickr/dist/themes/material_blue.css'
import styles from './DateSelector.module.css' // Using CSS Modules

class DateSelector extends React.Component {
    constructor(props){
        super(props)

        this.datePicker = React.createRef()
        this.fpElement = null

        this.state = {
            options: {
                onChange: this.onChange,
                ...this.props.config
            }
        }
    }

    componentDidMount() {
        this.fpElement = flatpickr(this.datePicker.current, this.state.options)
    }

    render() {
        return(
            <div className={styles.dateSelector} tabIndex='0' onClick={() => {
                this.fpElement.open()
            }}>
                <i class="far fa-calendar-alt"></i>

                <input ref={this.datePicker} className={styles.input} />
                <DateDecorator date={this.props.date}>Select date</DateDecorator>
            </div>
        )
    }
}

function DateDecorator(props) {
    let day, time = null

    if(props.date) {
        day = flatpickr.formatDate(props.date, 'D, M d')
        time = flatpickr.formatDate(props.date, 'h:i K')
    }
    return (
        <div class={styles.date}>
            <React.Fragment>
                <span className={styles.day}>{day || props.children}</span> 
                <span className={styles.time}>{time}</span>
            </React.Fragment>
        </div>
    )
}

export default DateSelector