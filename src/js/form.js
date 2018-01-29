//form
const initForm = () => {
  $('.form').on('submit', evt => {
    evt.preventDefault();

    const ENTER_KEY_CODE = 13;
    const form = $(evt.target);
    const url = form.attr('action');
    const data = form.serialize();
    console.log(data);

    var request = $.ajax({
      url: url,
      method: 'POST',
      data: data,
      dataType: 'JSON'
    });

    request.done(msg => {
      const wrapper = form.find('.order__modal-wrapper');
      wrapper
        .find('.order__modal-message')
        .append(msg)
        .addClass('order__modal-wrapper--active');

      wrapper.find('.order__modal-btn').on({
        click: () => wrapper.removeClass('order__modal-wrapper--active'),
        keydown: evt => {
          if (evt.target === ENTER_KEY_CODE) {
            wrapper.removeClass('order__modal-wrapper--active');
          }
        }
      });
    });

    request.fail(function(jqXHR, textStatus) {
      alert('Request failed: ' + textStatus);
    });
  });
};

export default initForm;
