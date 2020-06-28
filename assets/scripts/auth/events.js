const getFormFields = require('./../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

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

const addHandlers = () => {
  $('#sign-in-form').on('submit', onSignIn)
  $('#sign-up-form').on('submit', onSignUp)
}

module.exports = {
  addHandlers,
  onSignUp
}
