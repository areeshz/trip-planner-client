const config = require('./../config.js')
const store = require('./../store.js')

const createEvent = (data, tripId) => {
  console.log('this is data', data)
  const event = data.event
  return $.ajax({
    method: 'POST',
    url: `${config.apiUrl}/trips/${tripId}/events`,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      event
    }
  })
}

module.exports = {
  createEvent
}
