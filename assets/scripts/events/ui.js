const createEventSuccess = () => {
  $('#event-create-form').trigger('reset')
}

const createEventFailure = () => {
  $('#message').text('Failed to Create Event').removeClass().addClass('failure').show().hide(3500)
}

module.exports = {
  createEventSuccess,
  createEventFailure
}
