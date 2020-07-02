const config = require('./../config.js')
const store = require('./../store.js')

const tripsIndex = () => {
  return $.ajax({
    url: config.apiUrl + '/trips',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getTrip = (id) => {
  return $.ajax({
    url: config.apiUrl + '/trips/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createTrip = (data) => {
  const trip = data.trip
  return $.ajax({
    url: config.apiUrl + '/trips',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      trip
    }
  })
}

const editTrip = (data, id) => {
  const trip = data.trip

  return $.ajax({
    url: config.apiUrl + '/trips/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      trip
    }
  })
}

const deleteTrip = (tripId) => {
  return $.ajax({
    url: config.apiUrl + '/trips/' + tripId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  tripsIndex,
  createTrip,
  getTrip,
  editTrip,
  deleteTrip
}
