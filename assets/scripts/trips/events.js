const api = require('./api.js')
const ui = require('./ui.js')

const onTripsIndex = (event) => {
  event.preventDefault()
  console.log('you clicked the MY TRIPS button!')

  api.tripsIndex()
    .then(ui.tripsIndexSuccess)
    .catch(console.error)
}

const addHandlers = () => {
  $('#my-trips-button').on('click', onTripsIndex)
}

module.exports = {
  addHandlers
}
