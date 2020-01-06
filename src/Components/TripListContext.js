import React from 'react'

const TripListContext = React.createContext({
    trips: [],
    legs: [],
})

const TripListConsumer = TripListContext.Consumer
const TripListProvider = TripListContext.Provider

export {TripListProvider, TripListConsumer, TripListContext}