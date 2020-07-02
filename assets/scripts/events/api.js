const config = require('./../config.js')
const store = require('./../store.js')

const createEvent = (data, tripId) => {
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

const deleteEvent = (tripId, eventId) => {
  return $.ajax({
    method: 'DELETE',
    url: `${config.apiUrl}/trips/${tripId}/events/${eventId}`,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getEvent = (tripId, eventId) => {
  return $.ajax({
    method: 'GET',
    url: `${config.apiUrl}/trips/${tripId}/events/${eventId}`,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateEvent = (data, tripId, eventId) => {
  const event = data.event
  return $.ajax({
    method: 'PATCH',
    url: `${config.apiUrl}/trips/${tripId}/events/${eventId}`,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      event
    }
  })
}

module.exports = {
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent
}
