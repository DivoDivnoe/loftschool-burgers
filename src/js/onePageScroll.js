//one page scroll
class Slider {
  constructor(data) {
    this._length = data.length;
    this._curSlide = 0;
  }

  get length() {
    return this._length;
  }

  get curSlide() {
    return this._curSlide;
  }

  set curSlide(curSlide) {
    this._curSlide = curSlide;
    this.setCurSlideHandler(this);
  }

  nextSlide() {
    if (this.curSlide < this.length - 1) {
      this.curSlide++;
      this.slideHandler(this);
    }

    return this.curElement;
  }

  prevSlide() {
    if (this.curSlide) {
      this.curSlide--;
      this.slideHandler(this);
    }

    return this.curSlide;
  }

  slideTo(num) {
    this.curSlide = num;
    this.slideHandler(this);
  }

  slideHandler(slider) {
    return slider;
  }

  setCurSlideHandler(slider) {
    return slider;
  }
}

const initOnePageScroll = () => {
  const UP_KEY_CODE = 38;
  const DOWN_KEY_CODE = 40;

  const wrapper = $('.wrapper');
  const content = wrapper.find('.maincontent');
  const sections = content.find('.section');
  const count = sections.length;
  const links = content.find('a[data-section]');
  const switcher = $('.section-switch');
  const switches = switcher.find('.section-switch__item');
  const offsets = sections.map((index, section) => $(section).offset().top);
  const duration = +content.css('transition-duration').slice(0, -1) * 1000;

  const slider = new Slider({
    length: sections.length
  });

  const makeItemActive = (items, className, index) => {
    items
      .eq(index)
      .addClass(`${className}--active`)
      .siblings()
      .removeClass(`${className}--active`);
  };

  slider.setCurSlideHandler = function() {
    makeItemActive(sections, 'section', this.curSlide);
    makeItemActive(switches, 'section-switch__item', this.curSlide);
  };

  const performTransition = index => {
    if ($(window).height() >= 750) {
      content.css('transform', 'translateY(' + -100 * index + '%)');
    } else {
      const offset = sections.eq(index).offset().top;

      $('html').animate(
        {
          scrollTop: sections.eq(index).offset().top
        },
        1000
      );
    }
  };

  slider.slideHandler = function() {
    performTransition(this.curSlide);
  };

  const translateHandler = evt => {
    const deltaY = evt.originalEvent.deltaY;
    const direction = deltaY > 0 ? 'down' : 'up';
    const transitionendHandler = () => {
      wrapper.on('wheel', translateHandler);
      content.off('transitionend', transitionendHandler);
    };

    switch (direction) {
      case 'down': {
        if (slider.curSlide !== slider.length - 1) {
          wrapper.off('wheel', translateHandler);
          content.on('transitionend', transitionendHandler);
        }
        slider.nextSlide();
        break;
      }
      case 'up': {
        if (slider.curSlide) {
          wrapper.off('wheel', translateHandler);
          content.on('transitionend', transitionendHandler);
        }
        slider.prevSlide();
      }
    }
  };

  const keydownHandler = evt => {
    const transitionendHandler = () => {
      $(document).on('keydown', keydownHandler);
      content.off('transitionend', transitionendHandler);
    };

    switch (evt.keyCode) {
      case DOWN_KEY_CODE: {
        if (slider.curSlide !== slider.length - 1) {
          $(document).off('keydown', keydownHandler);
          content.on('transitionend', transitionendHandler);
        }
        slider.nextSlide();
        break;
      }
      case UP_KEY_CODE: {
        if (slider.curSlide) {
          $(document).off('keydown', keydownHandler);
          content.on('transitionend', transitionendHandler);
        }
        slider.prevSlide();
      }
    }
  };

  const scrollHandler = () => {
    const scrollTop = $('html').scrollTop();
    let index = 0;

    for (let i = 1; i < offsets.length; i++) {
      if (scrollTop - offsets[i] >= 0) {
        index = i;
      } else {
        break;
      }
    }

    slider.curSlide = index;
  };

  if ($(window).height() >= 750) {
    wrapper.on('wheel', translateHandler);
    wrapper.on('touchmove', evt => evt.preventDefault());
    $(document).on('keydown', keydownHandler);
  } else {
    $(document).on('scroll', scrollHandler);
  }

  if ($(window).width() <= 768) {
    const BASE_DELTA_Y = 50;
    let startY;
    const touchEndHandler = evt => {
      const deltaY = +evt.originalEvent.changedTouches[0].clientY - startY;
      let direction;

      if (deltaY > BASE_DELTA_Y) {
        direction = 'up';
      } else if (deltaY < -BASE_DELTA_Y) {
        direction = 'down';
      } else {
        return;
      }

      const transitionendHandler = () => {
        $(window).on('touchend', touchEndHandler);
        content.off('transitionend', transitionendHandler);
      };

      switch (direction) {
        case 'down': {
          if (slider.curSlide !== slider.length - 1) {
            $(window).off('touchend', touchEndHandler);
            content.on('transitionend', transitionendHandler);
          }
          slider.nextSlide();
          break;
        }
        case 'up': {
          if (slider.curSlide) {
            $(window).off('touchend', touchEndHandler);
            content.on('transitionend', transitionendHandler);
          }
          slider.prevSlide();
        }
      }
    };

    $(window).on('touchstart', evt => {
      startY = +evt.originalEvent.changedTouches[0].clientY;
    });

    $(window).on('touchend', touchEndHandler);
  }

  const clickLinkHandler = evt => {
    evt.preventDefault();

    slider.slideTo(parseInt($(evt.target).attr('data-section'), 10));

    if ($(window).height() >= 750) {
      links.off('click', clickLinkHandler);

      const transitionendHandler = () => {
        links.on('click', clickLinkHandler);
        content.off('transitionend', transitionendHandler);
      };

      content.on('transitionend', transitionendHandler);
    }
  };
  const clickSwitchHandler = evt => {
    evt.preventDefault();

    slider.slideTo($(evt.target).index());

    if ($(window).height() >= 750) {
      switches.off('click', clickSwitchHandler);

      const transitionendHandler = () => {
        switches.on('click', clickSwitchHandler);
        content.off('transitionend', transitionendHandler);
      };

      content.on('transitionend', transitionendHandler);
    }
  };

  links.on('click', clickLinkHandler);
  switches.on('click', clickSwitchHandler);

  if ($(window).height() >= 750) {
    wrapper.addClass('wrapper--active');
  }
};

export default initOnePageScroll;
