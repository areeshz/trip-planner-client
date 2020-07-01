const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields.js')
const tripApi = require('./../trips/api.js')
const tripUi = require('./../trips/ui.js')

const onTripShow = (tripId) => {
  tripApi.getTrip(tripId)
    .then(tripUi.showTripSuccess)
    .catch(tripUi.getTripFailure)
}

const onCreateEvent = (event) => {
  event.preventDefault()
  console.log('you clicked the create button')

  const form = event.target
  const data = getFormFields(form)
  console.log('create event data:', data)

  const tripId = form.dataset.id
  console.log('this is for trip:', tripId)

  api.createEvent(data, tripId)
    .then(ui.createEventSuccess)
    .then(() => onTripShow(tripId))
    .catch(ui.createEventFailure)
}

const addHandlers = () => {
  // Create event button
  $('#trip-show-section').on('submit', '#event-create-form', onCreateEvent)
}

module.exports = {
  addHandlers
}
