const bookItems = document.querySelectorAll('.book-item');
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
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}
