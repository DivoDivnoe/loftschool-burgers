$(() => {
  const hamburger = $('.main-nav__hamburger');
  const fullScreenMenu = $('.fullscreen-menu');
  const fullScreenMenuCloser = fullScreenMenu.find('.hamburger-menu__close');

  const wrapper = $('.slider__structure-wrapper');
  const structure = wrapper.find('.slider__structure');
  const structureTable = wrapper.find('.structure__table');
  const structureTableCloser = structureTable.find('.structure__close');

  hamburger.on('click', () => {
    fullScreenMenu.fadeIn(300);
  });
  fullScreenMenuCloser.on('click', (evt) => {
    evt.preventDefault();
    fullScreenMenu.fadeOut(300);
  });

  if (window.matchMedia('screen and (max-width: 768px)').matches) {
    structure.on('click', () => {
      structureTable.toggleClass('structure__table--active');
    });
    structureTableCloser.on('click', (evt) => {
      evt.preventDefault();
      structureTable.removeClass('structure__table--active');
    });
  }
})