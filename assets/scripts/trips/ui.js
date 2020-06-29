const tripsIndexTemplate = require('./../templates/trips-index.handlebars')

const tripsIndexSuccess = (data) => {
  const trips = data.trips
  // trips.forEach(trip => console.log(trip))

  const tripsIndexHtml = tripsIndexTemplate({trips})
  console.log(tripsIndexHtml)
  $('#trips-index-content').html(tripsIndexHtml)

  $('#trips-index-section').removeClass('hidden')
}

module.exports = {
  tripsIndexSuccess
}
