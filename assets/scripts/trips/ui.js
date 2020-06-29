const tripsIndexTemplate = require('./../templates/trips-index.handlebars')
const tripEditTemplate = require('./../templates/trip-edit.handlebars')

const tripsIndexSuccess = (data) => {
  const trips = data.trips

  const tripsIndexHtml = tripsIndexTemplate({trips})
  $('#trips-index-content').html(tripsIndexHtml)

  $('#trips-index-section').removeClass('hidden')
}

const tripsIndexFailure = () => {
  $('#message').text('Trips Index Failure').removeClass().addClass('failure').show().hide(3500)
}

const createTripSuccess = (response) => {
  $('#new-trip-form').trigger('reset')
  $('.select').each(function () {
    $(this)[0].selectedIndex = 0
  })
  $('#message').text('Trip Created Successfully!').removeClass().addClass('success').show().hide(3500)
}

const createTripFailure = () => {
  $('#new-trip-form').trigger('reset')
  $('.select').each(function () {
    $(this)[0].selectedIndex = 0
  })
  $('#message').text('Failed to Create Trip').removeClass().addClass('failure').show().hide(3500)
}

const getTripFailure = () => {
  $('#message').text('Failed to Fetch Trip Data').removeClass().addClass('failure').show().hide(3500)
}

const getTripToEdit = (data) => {
  const trip = data.trip
  console.log('this is the trip:', trip)
  const tripEditHtml = tripEditTemplate({trip: trip})
  $('#trips-edit-section').html(tripEditHtml).removeClass('hidden')
  $('#category-edit-input, #status-edit-input').each(function () { $(this).find('option[value="' + $(this).attr('data-intended') + '"]').prop('selected', true) })
}

const updateTripSuccess = () => {
  $('#message').text('Trip Edited Successfully!').removeClass().addClass('success').show().hide(3500)
}

const updateTripFailure = () => {
  $('#message').text('Failed to Edit Trip').removeClass().addClass('failure').show().hide(3500)
}

module.exports = {
  tripsIndexSuccess,
  tripsIndexFailure,
  createTripSuccess,
  createTripFailure,
  getTripFailure,
  getTripToEdit,
  updateTripSuccess,
  updateTripFailure
}
