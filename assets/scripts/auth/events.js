const getFormFields = require('./../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

const onSignIn = (event) => {
  event.preventDefault()
  console.log('you clicked the sign in button')
  const form = event.target
  console.log(form)
  const data = getFormFields(form)
  console.log(data)

  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const addHandlers = () => {
  $('#sign-in-form').on('submit', onSignIn)
}

module.exports = {
  addHandlers
}
