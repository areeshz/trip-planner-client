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

module.exports = {
  tripsIndex
}
