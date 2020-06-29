const getFormFields = require('./../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

const onQuickSignIn = (event) => {
  event.preventDefault()

  console.log('quick sign in')
  const data = {
    credentials: {
      email: 'hello@hello',
      password: '123'
    }
  }

  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  console.log('you clicked the sign in button')

  const form = event.target
  const data = getFormFields(form)
  console.log(data)

  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignUp = (event) => {
  event.preventDefault()
  console.log('You clicked the sign UP button!')

  const form = event.target
  const data = getFormFields(form)
  console.log(data)

  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignOut = (event) => {
  event.preventDefault()
  console.log('You clicked the sign OUT button!')

  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = (event) => {
  event.preventDefault()
  console.log('You clicked the change password button!')

  const form = event.target
  const data = getFormFields(form)
  console.log('data is:', data)

  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const addHandlers = () => {
  $('#sign-in-form').on('submit', onSignIn)
  $('#sign-up-form').on('submit', onSignUp)
  $('#sign-out-button').on('click', onSignOut)
  $('#change-password-form').on('submit', onChangePassword)
  $('#quick-sign-in').on('click', onQuickSignIn)
}

module.exports = {
  addHandlers,
  onSignUp,
  onSignOut
}
