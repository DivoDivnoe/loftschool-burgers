//slider popup
const initPopup = () => {
  const wrapper = $('.slider__structure-wrapper');
  const structure = wrapper.find('.slider__structure');
  const structureTable = wrapper.find('.structure__table');
  const structureTableCloser = structureTable.find('.structure__close');

  if ($(window).width() <= 768) {
    structure.on('click', () => {
      structureTable.toggleClass('structure__table--active');
    });
    structureTableCloser.on('click', evt => {
      evt.preventDefault();
      structureTable.removeClass('structure__table--active');
    });
  }
};

export default initPopup;
