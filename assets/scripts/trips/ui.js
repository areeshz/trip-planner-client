const tripsIndexTemplate = require('./../templates/trips-index.handlebars')
const tripEditTemplate = require('./../templates/trip-edit.handlebars')
const tripShowTemplate = require('./../templates/trip-show.handlebars')
const homePageTemplate = require('./../templates/home-page.handlebars')
const store = require('./../store.js')

const loadHome = (response) => {
  const today = new Date(Date.now())
  const days = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ')
  const day = days[today.getDay()]
  const months = 'January February March April May June July August September October November December'.split(' ')
  const month = months[today.getMonth()]
  const dayNum = today.getDate()
  const year = today.getFullYear()

  const fullDate = `${day}, ${month} ${dayNum}, ${year}`

  const trips = response.trips

  const stats = {
    trips: trips,
    numTrips: trips.length,
    numFuture: trips.filter(trip => trip.status === 'Planned Trip').length,
    numPast: trips.filter(trip => trip.status === 'Past Trip').length,
    anyPlans: trips.filter(trip => trip.status === 'Planned Trip').length > 0
  }
  const homePageHtml = homePageTemplate({
    stats: stats,
    user: store.user,
    date: fullDate
  })
  $('#home-section').html(homePageHtml)

  // hide all other pages and display home page
  $('.page').addClass('hidden')
  $('#home-section').removeClass('hidden')
}

const loadHomeFailure = () => {
  $('#message').text('Failed to Retrieve Dashboard Data').removeClass().addClass('failure').hide().show(500).delay(1500).hide(500)
}

const tripsIndexSuccess = (data) => {
  const trips = data.trips
  const futureTrips = trips.filter(trip => trip.status === 'Planned Trip')
  const pastTrips = trips.filter(trip => trip.status === 'Past Trip')
  const pastLogged = pastTrips.length > 0
  const futureLogged = futureTrips.length > 0

  const tripsIndexHtml = tripsIndexTemplate({trips, pastTrips, futureTrips, pastLogged, futureLogged})
  $('#trips-index-content').html(tripsIndexHtml)

  $('.page').addClass('hidden')
  $('#trips-index-section').removeClass('hidden')

  $('.nav-item').removeClass('active')
  $('#my-trips-button').parent().addClass('active')
}

const tripsIndexFailure = () => {
  $('#message').text('Trips Index Failure').removeClass().addClass('failure').hide().show(500).delay(1500).hide(500)
}

const createTripSuccess = (response) => {
  $('#new-trip-form').trigger('reset')
  $('.select').each(function () {
    $(this)[0].selectedIndex = 0
  })
  $('#message').text('Trip Created Successfully!').removeClass().addClass('success').hide().show(500).delay(1500).hide(500)
}

const createTripFailure = () => {
  $('#new-trip-form').trigger('reset')
  $('.select').each(function () {
    $(this)[0].selectedIndex = 0
  })
  $('#message').text('Failed to Create Trip').removeClass().addClass('failure').hide().show(500).delay(1500).hide(500)
}

const getTripFailure = () => {
  $('#message').text('Failed to Fetch Trip Data').removeClass().addClass('failure').hide().show(500).delay(1500).hide(500)
}

const getTripToEdit = (data) => {
  const trip = data.trip
  const tripEditHtml = tripEditTemplate({trip: trip})

  $('.page').addClass('hidden')
  $('#trips-edit-section').html(tripEditHtml).removeClass('hidden')
  // set all the Select elements to their intended values (matching current data)
  $('#category-edit-input, #status-edit-input').each(function () { $(this).find('option[value="' + $(this).attr('data-intended') + '"]').prop('selected', true) })
}

const updateTripSuccess = () => {
  $('#message').text('Trip Edited Successfully!').removeClass().addClass('success').hide().show(500).delay(1500).hide(500)
}

const updateTripFailure = () => {
  $('#message').text('Failed to Edit Trip').removeClass().addClass('failure').hide().show(500).delay(1500).hide(500)
}

const deleteTripSuccess = () => {
  $('#message').text('Trip Deleted Successfully!').removeClass().addClass('success').hide().show(500).delay(1500).hide(500)
}

const deleteTripFailure = () => {
  $('#message').text('Failed to Delete Trip').removeClass().addClass('failure').hide().show(500).delay(1500).hide(500)
}

const showTripSuccess = (data) => {
  const trip = data.trip
  const eventsLogged = trip.events.length > 0
  const tripId = trip._id
  const tripShowHtml = tripShowTemplate({trip: trip, eventsLogged: eventsLogged, tripId: tripId})
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
  showTripSuccess,
  loadHome,
  loadHomeFailure
}
