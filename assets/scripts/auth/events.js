const getFormFields = require('./../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

const onDemoSignIn = () => {
  api.demoSignIn()
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignIn = (event) => {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignUp = (event) => {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignOut = (event) => {
  event.preventDefault()

  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = (event) => {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const addHandlers = () => {
  $('#sign-in-form').on('submit', onSignIn)
  $('#sign-up-form').on('submit', onSignUp)
  $('#sign-out-button').on('click', onSignOut)
  $('#change-password-form').on('submit', onChangePassword)
  $('#to-sign-up').on('click', ui.toSignUp)
  $('#to-sign-in').on('click', ui.toSignIn)
  $('#demo-sign-in').on('click', onDemoSignIn)
}

module.exports = {
  addHandlers,
  onSignUp,
  onSignOut
}
