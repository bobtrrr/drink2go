const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.slider__item');
const buttonPrev = slider.querySelector('.slider__button-prev');
const buttonNext = slider.querySelector('.slider__button-next');
const toggleList = slider.querySelector('.toggle-list');
const toggleButtons = toggleList.querySelectorAll('.toggle-button');

const DESKTOP_WIDTH = 1440;
const SLIDER_OPTIONS = {
  COUNT_MAX: slides.length - 1,
  COUNT_MIN: 0,
};

let sliderCount = 0;


const shoudDisabledButton = () => {
  if (sliderCount >= SLIDER_OPTIONS.COUNT_MAX) {
    buttonNext.setAttribute('disabled', 'disabled');
  } else {
    buttonNext.removeAttribute('disabled');
  }

  if (sliderCount <= SLIDER_OPTIONS.COUNT_MIN) {
    buttonPrev.setAttribute('disabled', 'disabled');
  } else {
    buttonPrev.removeAttribute('disabled');
  }
};

const setSlide = (nextSlideIndex) => {
  if (nextSlideIndex < SLIDER_OPTIONS.COUNT_MIN || nextSlideIndex > SLIDER_OPTIONS.COUNT_MAX) {
    return;
  }

  sliderCount = nextSlideIndex;

  slides.forEach((slide, slideIndex) => slide.classList.toggle('slider__item--active', slideIndex === sliderCount));
  toggleButtons.forEach((button, slideIndex) => button.classList.toggle('toggle-button--active', slideIndex === sliderCount));

  // slider.style.backgroundColor = slides[sliderCount].dataset.slideColor;
  slider.style.setProperty('--slide-bg-color', slides[sliderCount].dataset.slideColor);

  shoudDisabledButton();
};

const buttonNextClickHandler = () => {
  setSlide(sliderCount + 1);
};

const buttonPrevClickHandler = () => {
  setSlide(sliderCount - 1);
};

const toggleListClickHandler = (evt) => {
  const target = evt.target;
  const button = target.closest('.toggle-button');

  if (!button) {
    return;
  }

  const slideIndex = Number(button.dataset.slideId);
  setSlide(slideIndex);
};

const initHeadlineAlignment = () => {
  const sliderHeadlines = slider.querySelectorAll('.slide__headline');
  const desktopMediaQuery = window.matchMedia(`(min-width: ${DESKTOP_WIDTH}px)`);

  const updateHeadlineAlignment = () => {
    sliderHeadlines.forEach((headline) => headline.classList.toggle('headline--align-start', desktopMediaQuery.matches));
  };

  updateHeadlineAlignment();

  desktopMediaQuery.addEventListener('change', updateHeadlineAlignment);
};

const initSlider = () => {
  if (!slider) {
    return;
  }

  initHeadlineAlignment();
  setSlide(sliderCount);

  buttonPrev.addEventListener('click', buttonPrevClickHandler);
  buttonNext.addEventListener('click', buttonNextClickHandler);
  toggleList.addEventListener('click', toggleListClickHandler);
};


initSlider();
