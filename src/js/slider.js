//slider
const initSlider = () => {
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
      nextIndex: index === count - 1 ? 0 : index + 1,
      prevIndex: index === 0 ? count - 1 : index - 1
    };
  };

  const performSlider = index => {
    const width = 100 / count;

    slider.css('transform', 'translateX(' + -width * index + '%)');
    slider.on('transitionend', evt => {
      if (evt.originalEvent.propertyName !== 'transform') {
        return;
      }

      sliderItems
        .eq(index)
        .addClass('slider__item--active')
        .siblings()
        .removeClass('slider__item--active');
    });
  };

  const slideEventHandler = evt => {
    const target = $(evt.target);
    let index;

    if (target.hasClass('slider__arrow--right')) {
      index = defineSlide().nextIndex;
    } else {
      index = defineSlide().prevIndex;
    }

    performSlider(index);
  };

  arrows.on({
    click: slideEventHandler,
    keydown: evt => {
      if (evt.keyCode === ENTER_KEY_CODE) {
        slideEventHandler(evt);
      }
    }
  });

  if (window.matchMedia('screen and (max-width: 768px)').matches) {
    let startX;

    slider.on('touchstart', evt => {
      startX = +evt.originalEvent.changedTouches[0].clientX;
    });

    slider.on('touchend', evt => {
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
};

export default initSlider;
