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
    const target = $(evt.target);
    const slider = target.siblings().find('.slider__list');
    const sliderItems = slider.find('.slider__item');
    const sliderItemActive = sliderItems.filter('.slider__item--active');
    let index = sliderItemActive.index();
    const count = sliderItems.length;
    const width = 100 / count;

    if (target.hasClass('slider__arrow-right')) {
      index === count - 1 ? index = 0 : index++;
    } else {
      index === 0 ? index = count - 1 : index--;
    }

    slider.css('transform', 'translateX(' + -width * index + '%)');
    slider.on('transitionend', (evt) => {
      if (evt.originalEvent.propertyName !== 'transform') {
        return;
      }

      sliderItemActive.removeClass('slider__item--active');
      sliderItems.eq(index).addClass('slider__item--active');
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
  const UP_KEY_CODE = 38;
  const DOWN_KEY_CODE = 40;

  const wrapper = $('.wrapper');
  const content = wrapper.find('.maincontent');
  const sections = content.find('.section');
  const count = sections.length;
  const links = content.find('.main-nav__link');
  const switcher = $('.section-switch');
  const switches = switcher.find('.section-switch__item');
  const duration = +content.css('transition-duration').slice(0, -1) * 1000;
  let inScroll = false;

  const defineSections = () => {
    const activeSection = sections.filter('.section--active');

    return {
      activeSection: activeSection,
      nextSection: activeSection.next(),
      prevSection: activeSection.prev()
    }
  };

  const performTransition = (index) => {
    if (inScroll) {
      return;
    }
    inScroll = true;

    setTimeout(function() {
      inScroll = false;
    }, duration + 300);

    sections.eq(index).addClass('section--active').siblings().removeClass('section--active');
    switches.eq(index).addClass('section-switch__item--active').siblings().removeClass('section-switch__item--active');

    content.css('transform', 'translateY(' + -100 * index + '%)');
  };

  const scrollToSection = (dir) => {
    const section = defineSections();

    if (dir === 'down' && section.nextSection.length) {
      performTransition(section.nextSection.index());
    }

    if (dir === 'up' && section.prevSection.length) {
      performTransition(section.prevSection.index());
    }
  };

  wrapper.on('wheel', (evt) => {
    const deltaY = evt.originalEvent.deltaY;
    const direction = deltaY > 0 ? 'down' : 'up';

    scrollToSection(direction);
  });

  $(document).on('keydown', (evt) => {
    const section = defineSections();

    switch (evt.keyCode) {
      case DOWN_KEY_CODE:
        if (section.nextSection.length) {
          performTransition(section.nextSection.index());
        }
      case UP_KEY_CODE:
        if (section.prevSection.length) {
          performTransition(section.prevSection.index());
        }
    }
  });

  links.on('click', (evt) => {
    evt.preventDefault();
    performTransition($(evt.target).attr('data-section'));
  });

  switches.on('click', (evt) => {
    performTransition($(evt.target).index());
  });
});