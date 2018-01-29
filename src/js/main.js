import initMenu from './menu';
import initPopup from './sliderPopup';
import initSlider from './slider';
import initOnePageScroll from './onePageScroll';
import initForm from './form';
import initAcco from './acco';
import initMenuAcco from './menuAcco';
import initReviewsPopup from './reviews';

$(() => {
  initOnePageScroll();
  initMenu();
  initPopup();
  initSlider();
  initAcco();
  initMenuAcco();
  initForm();
  initReviewsPopup();
});
