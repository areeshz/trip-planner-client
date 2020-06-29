const tripsIndexTemplate = require('./../templates/trips-index.handlebars')

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

module.exports = {
  tripsIndexSuccess,
  tripsIndexFailure,
  createTripSuccess,
  createTripFailure
}
