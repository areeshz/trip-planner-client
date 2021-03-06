const config = require('./../config.js')
const store = require('./../store.js')

const demoSignIn = () => {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
        email: 'demo@tripplanner.com',
        password: 'demo123'
      }
    }
  })
}

const signIn = (data) => {
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
  const credentials = data.credentials
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: {
      credentials
    }
  })
}

const signOut = () => {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const changePassword = (data) => {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      passwords: {
        old: data.passwords.old,
        new: data.passwords.new
      }
    }
  })
}

module.exports = {
  signIn,
  signUp,
  signOut,
  changePassword,
  demoSignIn
}
