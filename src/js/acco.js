//team acco
const initAcco = () => {
  const clickHandler = evt => {
    const target = $(evt.target);
    const wrapper = target.next();
    const reqHeight = wrapper.find('.team-acco__content').outerHeight();
    console.log(reqHeight);
    const currentItem = target.parent();

    wrapper.css(
      'height',
      currentItem.hasClass('team-acco__item--active') ? 0 : reqHeight + 'px'
    );

    currentItem
      .toggleClass('team-acco__item--active')
      .siblings()
      .removeClass('team-acco__item--active')
      .find('.team-acco__content-wrapper')
      .css('height', 0);
  };

  $('.team-acco__title').on('click', clickHandler);
};

export default initAcco;
