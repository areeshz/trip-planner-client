const eventEditTemplate = require('./../templates/event-edit-form.handlebars')

const createEventSuccess = () => {
  $('#event-create-form').trigger('reset')
}

const createEventFailure = () => {
  $('#message').text('Failed to Create Event').removeClass().addClass('failure').hide().show(500).delay(1500).hide(500)
}

const deleteEventFailure = () => {
  $('#message').text('Failed to Delete Event').removeClass().addClass('failure').hide().show(500).delay(1500).hide(500)
}

const renderEditForm = (response, eventBox, tripId) => {
  const event = response.event
  const eventEditHtml = eventEditTemplate({event, tripId})
  eventBox.html(eventEditHtml)
  $('.event-toedit').prop('disabled', true).css('cursor', 'not-allowed')
  $('.event-delete').prop('disabled', true).css('cursor', 'not-allowed')
  $('#event-create-button').prop('disabled', true).css('cursor', 'not-allowed')
  $('#event-form-title').prop('disabled', true).css('cursor', 'not-allowed')
  $('#event-form-body').prop('disabled', true).css('cursor', 'not-allowed')
}

const getEventFailure = () => {
  $('#message').text('Failed to Fetch Event Data').removeClass().addClass('failure').hide().show(500).delay(1500).hide(500)
}

const updateEventFailure = () => {
  $('#message').text('Failed to Update Event').removeClass().addClass('failure').hide().show(500).delay(1500).hide(500)
}

module.exports = {
  createEventSuccess,
  createEventFailure,
  deleteEventFailure,
  renderEditForm,
  updateEventFailure,
  getEventFailure
}
