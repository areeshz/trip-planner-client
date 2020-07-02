const tripsIndexTemplate = require('./../templates/trips-index.handlebars')
const tripEditTemplate = require('./../templates/trip-edit.handlebars')
const tripShowTemplate = require('./../templates/trip-show.handlebars')

const tripsIndexSuccess = (data) => {
  const trips = data.trips
  console.log('these are trips to be sorted:', trips)
  const futureTrips = trips.filter(trip => trip.status === 'Planned Trip')
  const pastTrips = trips.filter(trip => trip.status === 'Past Trip')
  const pastLogged = pastTrips.length > 0
  const futureLogged = futureTrips.length > 0
  console.log('future trips:', futureTrips)
  console.log('past trips:', pastTrips)

  const tripsIndexHtml = tripsIndexTemplate({trips, pastTrips, futureTrips, pastLogged, futureLogged})
  $('#trips-index-content').html(tripsIndexHtml)

  $('.page').addClass('hidden')
  $('#trips-index-section').removeClass('hidden')

  $('.nav-item').removeClass('active')
  $('#my-trips-button').parent().addClass('active')
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

  $('.page').addClass('hidden')
  $('#trips-edit-section').html(tripEditHtml).removeClass('hidden')
  // set all the Select elements to their intended values (matching current data)
  $('#category-edit-input, #status-edit-input').each(function () { $(this).find('option[value="' + $(this).attr('data-intended') + '"]').prop('selected', true) })
}

const updateTripSuccess = () => {
  $('#message').text('Trip Edited Successfully!').removeClass().addClass('success').show().hide(3500)
}

const updateTripFailure = () => {
  $('#message').text('Failed to Edit Trip').removeClass().addClass('failure').show().hide(3500)
}

const deleteTripSuccess = () => {
  $('#message').text('Trip Deleted Successfully!').removeClass().addClass('success').show().hide(3500)
}

const deleteTripFailure = () => {
  $('#message').text('Failed to Delete Trip').removeClass().addClass('failure').show().hide(3500)
}

const showTripSuccess = (data) => {
  const trip = data.trip
  console.log(`here's that trip:`, trip)
  const eventsLogged = trip.events.length > 0
  const tripId = trip._id
  const tripShowHtml = tripShowTemplate({trip: trip, eventsLogged: eventsLogged, tripId: tripId})
  console.log(tripShowHtml)
  $('.page').addClass('hidden')
  $('#trip-show-section').html(tripShowHtml).removeClass('hidden')
}

module.exports = {
  tripsIndexSuccess,
  tripsIndexFailure,
  createTripSuccess,
  createTripFailure,
  getTripFailure,
  getTripToEdit,
  updateTripSuccess,
  updateTripFailure,
  deleteTripSuccess,
  deleteTripFailure,
  showTripSuccess
}
