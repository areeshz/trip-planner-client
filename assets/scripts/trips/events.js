const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields.js')

const onTripsIndex = (event) => {
  event.preventDefault()
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

const addHandlers = () => {
  $('#my-trips-button').on('click', onTripsIndex)
  $('#to-new-trip').on('click', toTripCreate)
  $('#new-trip-form').on('submit', onTripCreate)
}

module.exports = {
  addHandlers
}
