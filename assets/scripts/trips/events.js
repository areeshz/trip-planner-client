const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields.js')

const loadHomePage = () => {
  api.tripsIndex()
    .then(ui.loadHome)
    .catch(ui.loadHomeFailure)
}

const toHome = (event) => {
  $('.page').addClass('hidden')
  $('#home-section').removeClass('hidden')

  // Load home page info
  loadHomePage()
  $('.nav-item').removeClass('active')
  $('#home-button').parent().addClass('active')
}

const toAccountPage = (event) => {
  event.preventDefault()

  // show account section
  $('.page').addClass('hidden')
  $('#account-section').removeClass('hidden')

  // update nav highlighting for account page
  $('.nav-item').removeClass('active')
  $('#account-button').parent().addClass('active')
}

const onTripsIndex = (event) => {
  if (event) {
    event.preventDefault()
  }

  console.log('you clicked the MY TRIPS button!')

  api.tripsIndex()
    .then(ui.tripsIndexSuccess)
    .catch(console.error)
}

const toTripCreate = (event) => {
  event.preventDefault()
  console.log('time to create a new trip')

  $('#trips-index-section').addClass('hidden')
  $('#trips-create-section').removeClass('hidden')
}

const onTripCreate = (event) => {
  event.preventDefault()
  console.log('got the info')

  const form = event.target
  const data = getFormFields(form)
  console.log(data)

  api.createTrip(data)
    .then(ui.createTripSuccess)
    .then(() => onTripsIndex())
    .catch(ui.createTripFailure)
}

const toTripEdit = (event) => {
  event.preventDefault()
  console.log('you clicked an edit button')
  const id = event.target.dataset.id
  console.log('button id:', id)

  api.getTrip(id)
    .then(ui.getTripToEdit)
    .catch(ui.getTripFailure)
}

const onTripEdit = (event) => {
  event.preventDefault()
  console.log('time to send these changes!!!')

  const id = event.target.dataset.id
  const form = event.target
  const data = getFormFields(form)
  console.log('new data:', data)
  console.log('id to edit is:', id)

  api.editTrip(data, id)
    .then(ui.updateTripSuccess)
    .then(() => onTripsIndex())
    .catch(ui.updateTripFailure)
}

const onTripRemove = (event) => {
  event.preventDefault()

  const tripId = event.target.dataset.id
  console.log(`you're trying to delete a trip, id:`, tripId)

  api.deleteTrip(tripId)
    .then(ui.deleteTripSuccess)
    // Add delay before running onTripsIndex to allow modal to fade out
    .then(() => setTimeout(onTripsIndex, 300))
    .catch(ui.deleteTripFailure)
}

const onTripShow = (event) => {
  event.preventDefault()
  const tripId = event.target.dataset.trip
  console.log('you clicked on trip title, trip', tripId)

  api.getTrip(tripId)
    .then(ui.showTripSuccess)
    .catch(ui.getTripFailure)

  // call api function for ajax GET request (show/specific trip)
  // ui success function should compile a handlebars template to generate the html for a trip-show page
  // trip show page should eventually have: little .trip section on the left side (col-6) with the event data; identical edit and save buttons; right side (col-6) should have an "events" section with an "Events" header. Similar to trips index page, if no events, have a .event box saying (create an event or something); if events present, display each event in a .event box similar to showing trips on trips index page. In either case, have a small floating form in a .event box at the bottom, 2 simple inputs: title and body, with a "create" button that creates the event, and redirects user back to the trip page (similar to a refresh) such that the new event displays from the handlebars template.
  // trip show page trip edit and delete buttons may have to be handled a little differently than those on the trips index page
}

const addHandlers = () => {
  //  Nav Buttons
  $('#my-trips-button').on('click', onTripsIndex)
  $('#home-button').on('click', toHome)
  $('#account-button').on('click', toAccountPage)

  // Trip creation actions
  // Button to show new trip form
  $('#to-new-trip').on('click', toTripCreate)
  // Button to submit new trip form
  $('#new-trip-form').on('submit', onTripCreate)

  // Buttons on each trip (trip index)
  // Edit trip button
  $('#trips-index-content').on('click', '.trip-edit', toTripEdit)
  // Delete trip button
  $('#trips-index-content').on('click', '.trip-delete', onTripRemove)
  // Show trip button (heading)
  $('#trips-index-content').on('click', '.trip-show-button', onTripShow)

  // Submit trip edit form handler
  $('#trips-edit-section').on('submit', '#edit-trip-form', onTripEdit)

  // Trip (SHOW) buttons
  // Back button to trigger same action as #my-trips-button
  $('#trip-show-section').on('click', '.back-button', onTripsIndex)
}

module.exports = {
  addHandlers
}
