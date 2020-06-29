const config = require('./../config.js')
const store = require('./../store.js')

const tripsIndex = () => {
  console.log('this is the trips index')
  return $.ajax({
    url: config.apiUrl + '/trips',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getTrip = (id) => {
  console.log('about to get a trip')
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
  console.log('data in api file:', data)
  const trip = data.trip
  console.log(trip)

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

module.exports = {
  tripsIndex,
  createTrip,
  getTrip,
  editTrip
}
