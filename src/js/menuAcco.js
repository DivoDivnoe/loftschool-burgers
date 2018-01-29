//menu acco
const initMenuAcco = () => {
  $('.menu-acco__heading').on('click', evt => {
    const target = $(evt.currentTarget);
    const wrapper = target.next();
    const content = wrapper.first();
    const currentItem = target.parent();
    const items = currentItem.parent().children();
    let reqWidth = 540;

    if (window.matchMedia('screen and (max-width: 768px)').matches) {
      reqWidth = $('.menu').outerWidth() - items.length * target.outerWidth();
    }

    wrapper.css(
      'width',
      currentItem.hasClass('menu-acco__item--active') ? 0 : reqWidth + 'px'
    );

    currentItem
      .toggleClass('menu-acco__item--active')
      .siblings()
      .removeClass('menu-acco__item--active')
      .find('.menu-acco__content-wrapper')
      .css('width', 0);
  });
};

export default initMenuAcco;
