const store = require('./../store.js')

const signInSuccess = (response) => {
  $('#sign-in-form').trigger('reset')
  store.user = response.user
  console.log(response)
  console.log('store is:', store)
  $('#message').text('Sign In Successful').removeClass().addClass('success').show().hide(3000)

  $('#nav-outside').addClass('hidden')
  $('#nav-inside').removeClass('hidden')
  $('#sign-in-section').addClass('hidden')
}

const signInFailure = (response) => {
  $('#sign-in-form').trigger('reset')
  $('#message').text('Sign In Failure').removeClass().addClass('failure').show().hide(3000)
}

const signUpSuccess = (response) => {
  $('#sign-up-form').trigger('reset')
  console.log(response)
  $('#message').text('Sign Up Successful').removeClass().addClass('success').show().hide(3000)
}

const signUpFailure = (response) => {
  $('#sign-up-form').trigger('reset')
  $('#message').text('Sign Up Failure').removeClass().addClass('failure').show().hide(3000)
}

const signOutSuccess = () => {
  $('#message').text('Sign Out Successful').removeClass().addClass('success').show().hide(3000)
  store.user = {}

  $('#nav-outside').removeClass('hidden')
  $('#nav-inside').addClass('hidden')
}

const signOutFailure = () => {
  $('#message').text('Sign Out Failure').removeClass().addClass('failure').show().hide(3000)
}

const changePasswordSuccess = () => {
  $('#change-password-form').trigger('reset')
  $('#message').text('Change Password Successful').removeClass().addClass('success').show().hide(3000)
}

const changePasswordFailure = () => {
  $('#change-password-form').trigger('reset')
  $('#message').text('Change Password Failure').removeClass().addClass('failure').show().hide(3000)
}

module.exports = {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
