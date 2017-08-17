$(() => {
  const ENTER_KEY_CODE = 13;
  
  const hamburger = $('.main-nav__hamburger');
  const fullScreenMenu = $('.fullscreen-menu');
  const closer = fullScreenMenu.find('.hamburger-menu__close');

  hamburger.on('click', () => {
    fullScreenMenu.fadeIn(300);
  });
  closer.on('click', () => {
    fullScreenMenu.fadeOut(300);
  });

})