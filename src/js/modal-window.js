const bookListItems = document.querySelectorAll('.book-list li');
const modal = document.querySelector('.modal');

// Функція відкриття модалки
function openModal() {
  modal.classList.add('open');
  const closeButton = document.querySelector('.modal__close');
  closeButton.addEventListener('click', closeModal);
}

// Функція закриття модалки
function closeModal() {
  modal.classList.remove('open');
  const closeButton = document.querySelector('.modal__close');
  closeButton.removeEventListener('click', closeModal);
}

// Додати обробник події на кожний елемент списку книг
bookListItems.forEach(function (item) {
  item.addEventListener('click', openModal);
});
