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

const onEventDelete = (event) => {
  event.preventDefault()

  let data = event.target.dataset
  data = JSON.parse(JSON.stringify(data))
  const tripId = data.tripid
  const eventId = data.eventid

  console.log('trip id\n', tripId, '\n', 'event id\n', eventId)

  api.deleteEvent(tripId, eventId)
    .then(() => onTripShow(tripId))
    .catch(ui.deleteEventFailure)
}

const toEventEdit = (event) => {
  event.preventDefault()

  console.log('you clicked the event edit button!')
  const button = event.target
  console.log('button is', button)
  const eventBox = $(button).parent()
  // console.log('eventBox is', eventBox)
  // const text = eventBox[0].innerText
  // const contents = text.split('\n')
  // console.log('text is', text)
  // console.log('contents are:', contents)
  // const title = contents[0]
  // const body = contents[3]
  // console.log('title is:', title, '\n', 'body is:', )

  let data = event.target.dataset
  data = JSON.parse(JSON.stringify(data))
  const tripId = data.tripid
  const eventId = data.eventid

  api.getEvent(tripId, eventId)
    .then((response) => ui.renderEditForm(response, eventBox, tripId))
    // .then((response) => console.log(response, '\n', 'testing scope:\n', eventBox))
    .catch(ui.getEventFailure)
}

const onEventEdit = (event) => {
  event.preventDefault()
  console.log('you just edited an event')

  const form = event.target
  const data = getFormFields(form)

  let dataset = event.target.dataset
  dataset = JSON.parse(JSON.stringify(dataset))
  const tripId = dataset.tripid
  const eventId = dataset.eventid

  console.log('trip id\n', tripId, '\n', 'event id\n', eventId)
  console.log('data is', data)

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
