const mobileMenu = document.querySelector('.menu-container');
const btnMenu = document.querySelector('.button-menu');


btnMenu.addEventListener('click', onBtnMenuClick);

function onBtnMenuClick() {
  btnMenu.classList.toggle('active');
  mobileMenu.classList.toggle('is-open');
  
  if (mobileMenu.classList.contains('is-open')) {
    document.body.style.overflow = 'hidden';
  } else {

    document.body.style.overflow = 'auto';
  }
};
