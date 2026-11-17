const menu = document.querySelector('.main-nav');
const menuButton = menu.querySelector('.burger-button');
const menuList = menu.querySelector('.main-nav__site-nav');

const menuButtonClickHandler = () => {
  menuList.classList.toggle('main-nav__site-nav--opened');
  menuButton.classList.toggle('burger-button--opened');

  if (menuList.classList.contains('main-nav__site-nav--opened')) {
    menuList.style.top = `${menu.parentElement.clientHeight}px`;
  }
};

menuButton.addEventListener('click', menuButtonClickHandler);
