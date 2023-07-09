const bookItems = document.querySelectorAll('.category-book-wrapper');
const modal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.modal_close');

bookItems.forEach(function (item) {
  item.addEventListener('click', function () {
    openModal();
  });
});

modalCloseButton.addEventListener('click', function () {
  closeModal();
});

function openModal() {
  modal.classList.remove('is-hidden');
}

function closeModal() {
  modal.classList.add('is-hidden');
}
