//reviews
const initReviewsPopup = () => {
  const items = $('.reviews__item');

  if ($(window).width() > 768) {
    return false;
  }

  const modalWrapper = $('.reviews__modal-wrapper');
  const modal = modalWrapper.find('.reviews__modal');
  const content = modal.find('.reviews__modal-content');

  modal.find('.reviews-modal__close').on('click', evt => {
    evt.preventDefault();

    modalWrapper.removeClass('reviews__modal-wrapper--active');
    content.empty();
  });

  items.on('click', evt => {
    const target = $(evt.target);
    const name = target.closest('.reviews__item').find('.reviews__name');
    const text = name.next();

    modalWrapper.addClass('reviews__modal-wrapper--active');
    content.append(name.clone()).append(text.clone());
  });
};

export default initReviewsPopup;
