const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields.js')

const toHome = (event) => {
  $('.page').addClass('hidden')
  $('#home-section').removeClass('hidden')

  $('.nav-item').removeClass('active')
  $('#home-button').parent().addClass('active')
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

const addHandlers = () => {
  //  Nav Buttons
  $('#my-trips-button').on('click', onTripsIndex)
  $('#home-button').on('click', toHome)

  $('#to-new-trip').on('click', toTripCreate)
  $('#new-trip-form').on('submit', onTripCreate)
  $('#trips-index-content').on('click', '.trip-edit', toTripEdit)
  $('#trips-edit-section').on('submit', '#edit-trip-form', onTripEdit)
}

module.exports = {
  addHandlers
}
