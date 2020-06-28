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

const signUp = (data) => {
  console.log(data.credentials)
  const credentials = data.credentials
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: {
      credentials
    }
  })
}

module.exports = {
  signIn,
  signUp
}
