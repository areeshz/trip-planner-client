const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields.js')
const homePageTemplate = require('./../templates/home-page.handlebars')

const loadHomePage = () => {
  api.tripsIndex()
    .then((response) => {
      // console.log('home page response', response)
      const trips = response.trips
      const stats = {
        trips: trips,
        numTrips: trips.length
      }
      console.log('these are the stats', stats)
      const homePageHtml = homePageTemplate({stats: stats})
      $('#home-section').html(homePageHtml)
    })
    .catch(() => {
      $('#message').text('Failed to Retrieve Dashboard Data').removeClass().addClass('failure').show().hide(3500)
    })

  // hide all other pages and display home page
  $('.page').addClass('hidden')
  $('#home-section').removeClass('hidden')
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
    .then(() => setTimeout(onTripsIndex, 100))
    .catch(ui.deleteTripFailure)
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

  $('#trips-edit-section').on('submit', '#edit-trip-form', onTripEdit)
}

module.exports = {
  addHandlers
}
