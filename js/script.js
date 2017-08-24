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
  const slider = $('.slider__list');
  const sliderItems = slider.find('.slider__item');
  const count = sliderItems.length;

  const defineSlide = () => {
    const sliderItemActive = sliderItems.filter('.slider__item--active');
    let index = sliderItemActive.index();

    return {
      activeSlide: sliderItemActive,
      nextIndex: index === (count - 1) ? 0 : index + 1,
      prevIndex: index === 0 ? count - 1 : index - 1
    }
  };

  const performSlider = (index) => {
    const width = 100 / count;

    slider.css('transform', 'translateX(' + -width * index + '%)');
    slider.on('transitionend', (evt) => {
      if (evt.originalEvent.propertyName !== 'transform') {
        return;
      }

      sliderItems.eq(index).addClass('slider__item--active').siblings().removeClass('slider__item--active');
    });
  };

  const slideEventHandler = (evt) => {
    const target = $(evt.target);
    let index;

    if (target.hasClass('slider__arrow--right')) {
      index = defineSlide().nextIndex;
    } else {
      index = defineSlide().prevIndex;
    }
    console.log(index);

    performSlider(index);
  };

  arrows.on({
    click: slideEventHandler,
    keydown: (evt) => {
      if (evt.keyCode === ENTER_KEY_CODE) {
        slideEventHandler(evt);
      }
    }
  });

  if (window.matchMedia('screen and (max-width: 768px)').matches) {
    let startX;

    slider.on('touchstart', (evt) => {
      startX = +evt.originalEvent.changedTouches[0].clientX;
    });

    slider.on('touchend', (evt) => {
      const BASE_DELTA_X = 50;
      const deltaX = +evt.originalEvent.changedTouches[0].clientX - startX;
      let index;

      if (deltaX > BASE_DELTA_X) {
        index = defineSlide().prevIndex;
      } else if (deltaX < -BASE_DELTA_X) {
        index = defineSlide().nextIndex;
      } else {
        return;
      }

      performSlider(index);
    });
  }
});

//team acco
$(() => {
  $('.team-acco__title').on('click touchstart', (evt) => {
    const target = $(evt.target);
    const wrapper = target.next();
    const reqHeight = wrapper.find('.team-acco__content').outerHeight();
    const currentItem = target.parent();

    wrapper.css('height', currentItem.hasClass('team-acco__item--active') ? 0 : reqHeight + 'px');

    currentItem
      .toggleClass('team-acco__item--active')
      .siblings()
      .removeClass('team-acco__item--active')
      .find('.team-acco__content-wrapper')
      .css('height', 0);
  });
});

//menu acco
$(() => {
  $('.menu-acco__heading').on('click', (evt) => {
    const target = $(evt.target);
    const content = target.next();
    const currentItem = target.parent();
    const items = currentItem.parent().children();
    let reqWidth = 540;

    if (window.matchMedia('screen and (max-width: 768px)').matches) {
      reqWidth = $('.menu').outerWidth() - items.length * target.outerWidth();
    }

    if (window.matchMedia('screen and (max-width: 480px)').matches) {
      reqWidth = $('.menu').outerWidth() - target.outerWidth();
      content.find('.menu-acco__close').on('click', () => {
        content.css('width', 0);
        currentItem.removeClass('menu-acco__item--active');
      });

    }

    content.css('width', currentItem.hasClass('menu-acco__item--active') ? 0 : reqWidth + 'px');

    currentItem
      .toggleClass('menu-acco__item--active')
      .siblings()
      .removeClass('menu-acco__item--active')
      .find('.menu-acco__content')
      .css('width', 0);
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
  const links = content.find('a[data-section]');
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

  wrapper.on({
    wheel: (evt) => {
      const deltaY = evt.originalEvent.deltaY;
      const direction = deltaY > 0 ? 'down' : 'up';

      scrollToSection(direction);
    },
    touchmove: (evt) => {
      evt.preventDefault;
    }
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

  links.on('click touchstart', (evt) => {
    evt.preventDefault();
    performTransition(parseInt($(evt.target).attr('data-section'), 10));
  });

  switches.on('click', (evt) => {
    performTransition($(evt.target).index());
  });

  if (window.matchMedia('screen and (max-width: 768px)').matches) {
    let startY;

    $(window).on('touchstart', (evt) => {
      startY = +evt.originalEvent.changedTouches[0].clientY;
    });

    $(window).on('touchend', (evt) => {
      const BASE_DELTA_Y = 50;

      const deltaY = +evt.originalEvent.changedTouches[0].clientY - startY;
      let direction;

      if (deltaY > BASE_DELTA_Y) {
        direction = 'up';
      } else if (deltaY < -BASE_DELTA_Y) {
        direction = 'down';
      } else {
        return;
      }
      scrollToSection(direction);
    });
  }
});

//form
$(() => {
  $('.form').on('submit', (evt) => {
    evt.preventDefault();

    const ENTER_KEY_CODE = 13;
    const form = $(evt.target);
    const url = form.attr('action');
    const data = form.serialize();

    var request = $.ajax({
      url: url,
      method: 'POST',
      data: data,
      dataType: 'json'
    });

    request.done((msg) => {

      const wrapper = $('.order__modal-wrapper');
      const modal = wrapper.find('.order__modal');
      modal.find('.order__modal-message').remove();

      if (msg.status === "OK") {
        modal.prepend('<span class="order__modal-message order__modal-message--sucсess">' + msg.message + '</span>');
      } else {
        modal.prepend('<span class="order__modal-message order__modal-message--error">' + msg.message + '</span>');
      }
      wrapper.addClass('order__modal-wrapper--active');

      wrapper.find('.order__modal-btn').on({
        click: () => wrapper.removeClass('order__modal-wrapper--active'),
        keydown: (evt) => {
          if (evt.target === ENTER_KEY_CODE) {
            wrapper.removeClass('order__modal-wrapper--active')
          }
        }
      });
    });

    request.fail(function(jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });

  });
});

//reviews
$(() => {
  const items = $('.reviews__item');
  items.on('click touchstart', (evt) => {
    const target = $(evt.target);
    const name = target.closest('.reviews__item').find('.reviews__name');
    const text = name.next();
    const wrapper = $('.reviews__modal-wrapper');
    const modal = wrapper.find('.reviews__modal');
    const content = modal.find('.reviews__modal-content');

    wrapper.addClass('reviews__modal-wrapper--active');
    content.append(name.clone()).append(text.clone());

    modal.find('.reviews-modal__close').on('click touchstart', (evt) => {
      evt.preventDefault();

      wrapper.removeClass('reviews__modal-wrapper--active');
      content.empty();
    });
  });
});