const bookItems = document.querySelectorAll('.category-book-wrapper');
const modal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.modal_close');
const scrollButton = document.querySelector('.back-to-top');
/*bookItems.addEventListener('click', function () {
    openModal();
  });*/


modalCloseButton.addEventListener('click', function () {
  closeModal();
});

export function openModal(bookId) {
  document.body.classList.add('modal-open');
  modal.classList.remove('is-hidden');
  scrollButton.classList.add('is-hidden');
  // Формування URL-адреси запиту з використанням bookId
  const apiUrl = `https://books-backend.p.goit.global/books/${bookId}`;

  // Виконання запиту на АПІ
  fetch(apiUrl)
    .then(response => response.json())
    .then(bookData => {
      // Отримання даних про книгу з відповіді API
      const { book_image, author, title, description, marketplaces } = bookData;
      console.log(bookData);
      // Відображення даних книги у модальному вікні
      const bookImgElement = document.querySelector('.book_img');
      const bookNameElement = document.querySelector('.modal_name_book');
      const bookAuthorElement = document.querySelector('.modal_name_author');
      const bookAboutElement = document.querySelector('.modal_book_about');
      const bookShopElement = document.querySelector('.modal_window_bookShop');

      // Зміна властивостей елементів HTML
      bookImgElement.src = book_image;
      bookNameElement.textContent = title;
      bookAuthorElement.textContent = author;
      bookAboutElement.textContent = description;

      // Очистка посилань на майданчики
      bookShopElement.innerHTML = '';

      // Додавання посилань на майданчики
    })
    .catch(error => {
      console.log('Помилка при отриманні даних про книгу:', error);
    });
}

function closeModal() {
  modal.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
  scrollButton.classList.remove('is-hidden');
}
