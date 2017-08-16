$(() => {
  const ENTER_KEY_CODE = 13;
  
  const hamburger = $('.main-nav__hamburger');
  const fullScreenMenu = $('.fullscreen-menu');
  const closer = fullScreenMenu.find('.hamburger-menu__close');

  const showMenuHandler = () => {
    fullScreenMenu.show();
  }
  const closeMenuHandler = () => {
    fullScreenMenu.hide();
  }

  hamburger.on('click', showMenuHandler);
  hamburger.on('keydown', (evt) => {
    if (evt.keyCode === 13) {
      showMenuHandler();
    }
  });

  closer.on('click', closeMenuHandler);
  closer.on('keydown', (evt) => {
    if (evt.keyCode === 13) {
      closeMenuHandler();
    }
  });
})