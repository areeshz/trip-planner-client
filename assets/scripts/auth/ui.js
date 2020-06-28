
const signInSuccess = (response) => {
  $('#sign-in-form').trigger('reset')
  console.log(response)
  $('#message').text('Sign In Successful').removeClass().addClass('success').show().hide(2500)
}

const signInFailure = (response) => {
  $('#sign-in-form').trigger('reset')
  $('#message').text('Sign In Failure').removeClass().addClass('failure').show().hide(2500)
}

module.exports = {
  signInSuccess,
  signInFailure
}
