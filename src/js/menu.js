//full screen menu
const initMenu = () => {
  if ($(window).width() > 768) return false;

  const hamburger = $('.main-nav__hamburger');
  const menu = $('.main-nav__menu');
  const menuCloser = menu.find('.main-nav__menu-close');
  const wrapper = $('.wrapper');
  const links = menu.find('.main-nav__link');
  const active = wrapper.hasClass('wrapper--active');

  const clickLinkHandler = evt => {
    evt.preventDefault();
    menu.fadeOut(300);
    if (!active) wrapper.removeClass('wrapper--active');
  };
  const scrollHandler = () => $('html').scrollTop(0);

  hamburger.on('click', () => {
    if (!active) wrapper.addClass('wrapper--active');
    menu.fadeIn(300);
  });
  menuCloser.on('click', clickLinkHandler);
  links.on('click', clickLinkHandler);
};

export default initMenu;
