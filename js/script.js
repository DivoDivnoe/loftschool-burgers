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

    slider.style.transform = 'translateX(' + -width * index + '%)';
    slider.addEventListener('transitionend', (evt) => {
      if (evt.propertyName !== 'transform') {
        return;
      }
      sliderItemActive.classList.remove('slider__item--active');
      sliderItems[index].classList.add('slider__item--active');
    });
  }

  arrows.on({
    click: slideEventHandler,
    keydown: (evt) => {
      if (evt.keyCode === ENTER_KEY_CODE) {
        slideEventHandler(evt);
      }
    }
  });
});

//one page scroll
$(() => {
  const wrapper = document.querySelector('.wrapper');
  const content = wrapper.querySelector('.maincontent');
  const sections = content.querySelectorAll('.section');
  const count = sections.length;
  const links = content.querySelectorAll('.main-nav__link');
  const switcher = document.querySelector('.section-switch');
  const switches = switcher.querySelectorAll('.section-switch__item');
  let inScroll = false;

  wrapper.addEventListener('wheel', (evt) => {
    const activeSection = Array.from(sections).find((item) => item.classList.contains('section--active'));
    let index = Array.from(sections).indexOf(activeSection);
    let next;
    const deltaY = evt.deltaY;
    const direction = evt.deltaY > 0 ? 'down' : 'up';

    if (!inScroll) {
      inScroll = true;

      setTimeout(function() {
        inScroll = false;
        console.log(inScroll);
      }, 1300);

      if (direction === 'down') {
        next = activeSection.nextElementSibling;
      } else {
        next = activeSection.previousElementSibling;
      }

      if (!next) {
        return;
      }

      index = Array.from(sections).indexOf(next);

      activeSection.classList.remove('section--active');
      next.classList.add('section--active');

      content.style.transform = 'translateY(' + -100 * index + '%)';
    }
  });

  links.forEach((link) => {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();

      const activeSection = Array.from(sections).find((item) => item.classList.contains('section--active'));

      if (!inScroll) {
        inScroll = true;

        setTimeout(function() {
          inScroll = false;
          console.log(inScroll);
        }, 1300);

        index = evt.target.dataset.section;

        activeSection.classList.remove('section--active');
        sections[index].classList.add('section--active');

        content.style.transform = 'translateY(' + -100 * index + '%)';
      }
    });
  });

  switches.forEach((item) => {
    item.addEventListener('click', (evt) => {
      const target = evt.target;
      const activeSection = Array.from(sections).find((item) => item.classList.contains('section--active'));

      if (!inScroll) {
        inScroll = true;

        setTimeout(function() {
          inScroll = false;
          console.log(inScroll);
        }, 1300);

        $(target).siblings().removeClass('section-switch__item--active');
        target.classList.add('section-switch__item--active');
        index = target.dataset.section;
        activeSection.classList.remove('section--active');
        sections[index].classList.add('section--active');

        content.style.transform = 'translateY(' + -100 * index + '%)';
      }
    });
  });
});