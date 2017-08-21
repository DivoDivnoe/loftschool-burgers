//full screen menu
$(() => {
  const hamburger = $('.main-nav__hamburger');
  const fullScreenMenu = $('.fullscreen-menu');
  const fullScreenMenuCloser = fullScreenMenu.find('.hamburger-menu__close');

  hamburger.on('click', () => {
    fullScreenMenu.fadeIn(300);
  });
  fullScreenMenuCloser.on('click', (evt) => {
    evt.preventDefault();
    fullScreenMenu.fadeOut(300);
  });
});

//slider popup
$(() => {
  const wrapper = $('.slider__structure-wrapper');
  const structure = wrapper.find('.slider__structure');
  const structureTable = wrapper.find('.structure__table');
  const structureTableCloser = structureTable.find('.structure__close');

  if (window.matchMedia('screen and (max-width: 768px)').matches) {
    structure.on('click', () => {
      structureTable.toggleClass('structure__table--active');
    });
    structureTableCloser.on('click', (evt) => {
      evt.preventDefault();
      structureTable.removeClass('structure__table--active');
    });
  }
});

//slider
$(() => {
  const ENTER_KEY_CODE = 13;
  const arrows = $('.slider__arrow');

  const slideEventHandler = (evt) => {
    const target = evt.target;
    const slider = target.parentElement.querySelector('.slider__list');
    const sliderItems = slider.querySelectorAll('.slider__item');
    const sliderItemActive = Array.from(sliderItems).find((item) => item.classList.contains('slider__item--active'));
    let index = Array.from(sliderItems).indexOf(sliderItemActive);
    const count = sliderItems.length;
    const width = 100 / count;

    if (target.classList.contains('slider__arrow-right')) {
      index === count - 1 ? index = 0 : index++;
    } else {
      index === 0 ? index = count - 1 : index--;
    }

    sliderItemActive.classList.remove('slider__item--active');
    sliderItems[index].classList.add('slider__item--active');
    slider.style.transform = 'translateX(' + -width * index + '%)';
  }

  arrows.on('click', slideEventHandler);
  arrows.on('keydown', (evt) => {
    if (evt.keyCode === ENTER_KEY_CODE) {
      slideEventHandler(evt);
    }
  });
});