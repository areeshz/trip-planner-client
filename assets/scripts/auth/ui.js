const store = require('./../store.js')

const toSignUp = (event) => {
  event.preventDefault()
  $('.page').addClass('hidden')
  $('#sign-up-section').removeClass('hidden')
}

const toSignIn = (event) => {
  if (event) {
    event.preventDefault()
  }
  console.log('taking you to sign in page')
  $('.page').addClass('hidden')
  $('#sign-in-section').removeClass('hidden')
}

const signInSuccess = (response) => {
  $('#sign-in-form').trigger('reset')
  store.user = response.user
  console.log(response)
  console.log('store is:', store)
  $('#message').text('Sign In Successful').removeClass().addClass('success').show().hide(3000)

  $('#nav-outside').addClass('hidden')
  $('#nav-inside').removeClass('hidden')

  // trigger click of home page button
  $('#home-button').trigger('click')
}

const signInFailure = (response) => {
  $('#sign-in-form').trigger('reset')
  $('#message').text('Sign In Failure').removeClass().addClass('failure').show().hide(3000)
}

const signUpSuccess = (response) => {
  $('#sign-up-form').trigger('reset')
  console.log(response)
  $('#message').text('Sign Up Successful').removeClass().addClass('success').show().hide(3000)

  $('.page').addClass('hidden')
  $('#sign-in-section').removeClass('hidden')
}

const signUpFailure = (response) => {
  $('#sign-up-form').trigger('reset')
  $('#message').text('Sign Up Failure').removeClass().addClass('failure').show().hide(3000)
}

const signOutSuccess = () => {
  $('#message').text('Sign Out Successful').removeClass().addClass('success').show().hide(3000)
  store.user = {}
  // switch to outside nav
  $('#nav-outside').removeClass('hidden')
  $('#nav-inside').addClass('hidden')
  // hide all pages and show sign-in-section
  $('.page').addClass('hidden')
  $('#sign-in-section').removeClass('hidden')
  // reset inside nav to "home" indication for next login
  $('.nav-item').removeClass('active')
  $('#home-button').parent().addClass('active')
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
  changePasswordFailure,
  toSignUp,
  toSignIn
}
