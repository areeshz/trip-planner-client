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

module.exports = {
  tripsIndexSuccess,
  tripsIndexFailure
}
