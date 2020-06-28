const config = require('./../config.js')

const signIn = (data) => {
  console.log(data.credentials)
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
        email: data.credentials.email,
        password: data.credentials.password
      }
    }
  })
}

module.exports = {
  signIn
}
