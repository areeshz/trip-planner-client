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

  api.tripsIndex()
    .then(ui.tripsIndexSuccess)
    .catch(console.error)
}

const toTripCreate = (event) => {
  event.preventDefault()

  $('#new-trip-form').trigger('reset')
  $('.select').each(function () {
    $(this)[0].selectedIndex = 0
  })

  $('#trips-index-section').addClass('hidden')
  $('#trips-create-section').removeClass('hidden')
}

const onTripCreate = (event) => {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.createTrip(data)
    .then(ui.createTripSuccess)
    .then(() => onTripsIndex())
    .catch(ui.createTripFailure)
}

const toTripEdit = (event) => {
  event.preventDefault()

  const id = event.target.dataset.id

  api.getTrip(id)
    .then(ui.getTripToEdit)
    .catch(ui.getTripFailure)
}

const onTripEdit = (event) => {
  event.preventDefault()

  const id = event.target.dataset.id
  const form = event.target
  const data = getFormFields(form)

  api.editTrip(data, id)
    .then(ui.updateTripSuccess)
    .then(() => onTripsIndex())
    .catch(ui.updateTripFailure)
}

const onTripRemove = (event) => {
  event.preventDefault()

  const tripId = event.target.dataset.id

  api.deleteTrip(tripId)
    .then(ui.deleteTripSuccess)
    // Adds delay before running onTripsIndex to allow modal to fade out
    .then(() => setTimeout(onTripsIndex, 300))
    .catch(ui.deleteTripFailure)
}

const onTripShow = (event) => {
  event.preventDefault()
  const tripId = event.target.dataset.trip

  api.getTrip(tripId)
    .then(ui.showTripSuccess)
    .catch(ui.getTripFailure)
}

const addHandlers = () => {
  //  Nav Buttons
  $('#my-trips-button').on('click', onTripsIndex)
  $('#home-button').on('click', toHome)
  $('#account-button').on('click', toAccountPage)

  // Call to action button (plan your next trip today) redirect to My Trips page
  $('#home-section').on('click', '.call-to-action', onTripsIndex)

  // Trip creation actions
  // Button to show new trip form
  $('#to-new-trip').on('click', toTripCreate)
  // Button to submit new trip form
  $('#new-trip-form').on('submit', onTripCreate)
  // Back button to trigger same action as #my-trips-button
  $('.back-button').on('click', onTripsIndex)

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
