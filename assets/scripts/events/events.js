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

  const form = event.target
  const data = getFormFields(form)

  const tripId = form.dataset.id

  api.createEvent(data, tripId)
    .then(ui.createEventSuccess)
    .then(() => onTripShow(tripId))
    .catch(ui.createEventFailure)
}

const onEventDelete = (event) => {
  event.preventDefault()

  let data = event.target.dataset
  data = JSON.parse(JSON.stringify(data))
  const tripId = data.tripid
  const eventId = data.eventid

  api.deleteEvent(tripId, eventId)
    .then(() => onTripShow(tripId))
    .catch(ui.deleteEventFailure)
}

const toEventEdit = (event) => {
  event.preventDefault()

  const button = event.target
  const eventBox = $(button).parent()

  let data = event.target.dataset
  data = JSON.parse(JSON.stringify(data))
  const tripId = data.tripid
  const eventId = data.eventid

  api.getEvent(tripId, eventId)
    .then((response) => ui.renderEditForm(response, eventBox, tripId))
    .catch(ui.getEventFailure)
}

const onEventEdit = (event) => {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  let dataset = event.target.dataset
  dataset = JSON.parse(JSON.stringify(dataset))
  const tripId = dataset.tripid
  const eventId = dataset.eventid

  api.updateEvent(data, tripId, eventId)
    .then(() => onTripShow(tripId))
    .catch(ui.updateEventFailure)
}

const addHandlers = () => {
  // Create event button
  $('#trip-show-section').on('submit', '#event-create-form', onCreateEvent)

  // Delete event button
  $('#trip-show-section').on('click', '.event-delete', onEventDelete)

  // Event to-edit button
  $('#trip-show-section').on('click', '.event-toedit', toEventEdit)

  // Event Edit form submission
  $('#trip-show-section').on('submit', '#event-edit-form', onEventEdit)
}

module.exports = {
  addHandlers
}
