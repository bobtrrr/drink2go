const rangeFilter = document.querySelector('.filter-range');

const PRICE_HANDLE_INDEX = {
  MIN: 0,
  MAX: 1,
};

const MIN_PRICE = 0;
const MAX_PRICE = 1045;

if (rangeFilter) {
  const priceSlider = rangeFilter.querySelector('.filter-range__controls');
  const minPriceInput = rangeFilter.querySelector('#price-min-field');
  const maxPriceInput = rangeFilter.querySelector('#price-max-field');

  const SLIDER_OPTIONS = {
    start: [Number(minPriceInput.value), Number(maxPriceInput.value)],
    connect: true,
    range: {
      min: MIN_PRICE,
      max: MAX_PRICE,
    },
    step: 1,
    format: {
      to: (value) => String(Math.round(value)),
      from: (value) => Number(value),
    },
  };

  const updateSliderStyles = (slider) => {
    slider.querySelector('.noUi-base').classList.add('filter-range__rail');
    slider.querySelector('.noUi-connect').classList.add('filter-range__track');

    const handles = slider.querySelectorAll('.noUi-handle');

    handles.forEach((handle) => handle.classList.add('filter-range__handle-button'));
  };

  const updateSliderFromInput = (input, handleIndex) => {
    const price = Number(input.value);

    if (input.value !== '' && Number.isFinite(price)) {
      const values = [null, null];

      values[handleIndex] = price;
      priceSlider.noUiSlider.set(values);
    }
  };

  const updatePriceInputs = ([minPrice, maxPrice]) => {
    minPriceInput.value = minPrice;
    maxPriceInput.value = maxPrice;
  };

  window.noUiSlider.create(priceSlider, SLIDER_OPTIONS);

  updateSliderStyles(priceSlider);

  priceSlider.noUiSlider.on('update', updatePriceInputs);

  minPriceInput.addEventListener('input', (evt) => {
    const input = evt.currentTarget;

    updateSliderFromInput(input, PRICE_HANDLE_INDEX.MIN);
  });

  maxPriceInput.addEventListener('input', (evt) => {
    const input = evt.currentTarget;

    updateSliderFromInput(input, PRICE_HANDLE_INDEX.MAX);
  });
}
