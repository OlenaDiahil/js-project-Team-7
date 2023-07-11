const bookItems = document.querySelectorAll('.category-book-wrapper');
const modal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.modal_close');
const scrollButton = document.querySelector('.back-to-top');

modalCloseButton.addEventListener('click', function () {
  closeModal();
});

export function openModal(bookId) {
  document.body.classList.add('modal-open');
  modal.classList.remove('is-hidden');
  scrollButton.classList.add('is-hidden');
  const apiUrl = `https://books-backend.p.goit.global/books/${bookId}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(bookData => {
      const { book_image, author, title, description, buy_links } = bookData;

      const bookImgElement = document.querySelector('.book_img');
      const bookNameElement = document.querySelector('.modal_name_book');
      const bookAuthorElement = document.querySelector('.modal_name_author');
      const bookAboutElement = document.querySelector('.modal_book_about');
      const bookShopElement = document.querySelector('.modal_window_bookShop');
      const bookShopAmazon = document.querySelector(
        '.modal_window_icon_amazom'
      );
      const bookShopApple = document.querySelector(
        '.modal_window_icon_apple-books'
      );
      const bookShopBookshop = document.querySelector(
        '.modal_window_icon_book-shop'
      );
      

      bookImgElement.src = book_image;
      bookNameElement.textContent = title;
      bookAuthorElement.textContent = author;
      bookAboutElement.textContent = description;
      bookShopAmazon.href = buy_links[0].url;
      bookShopApple.href = buy_links[1].url;
      bookShopBookshop.href = buy_links[4].url;

      const shoppingListButton = document.querySelector(
        '.modal_btn_book_addShop'
      );
      const shoppingList =
        JSON.parse(localStorage.getItem('shoppingList')) || [];
      let bookIndex = -1;

      for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList[i].bookId === bookId) {
          bookIndex = i;
          break;
        }
      }

      if (bookIndex !== -1) {
        shoppingListButton.textContent = 'Remove from the shopping list';
      } else {
        shoppingListButton.textContent = 'Add to shopping list';
      }

      shoppingListButton.addEventListener('click', () => {
        if (bookIndex !== -1) {
          removeBookFromList(bookIndex);
          shoppingListButton.textContent = 'Add to shopping list';
          bookIndex = -1; // Скидаємо значення bookIndex після видалення книги
        } else {
          addBookToList(bookId, bookData);
          shoppingListButton.textContent = 'Remove from the shopping list';
          bookIndex = shoppingList.length - 1; // Оновлюємо значення bookIndex після додавання книги
        }
      });
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

function addBookToList(bookId, bookData) {
  const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
  let existingBookIndex = -1;

  for (let i = 0; i < shoppingList.length; i++) {
    if (shoppingList[i].bookId === bookId) {
      existingBookIndex = i;
      break;
    }
  }

  if (existingBookIndex !== -1) {
    shoppingList[existingBookIndex].bookData = bookData; // Оновлюємо дані про книгу
  } else {
    shoppingList.push({ bookId, bookData }); // Додаємо нову книгу до списку
  }

  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function removeBookFromList(bookIndex) {
  const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
  shoppingList.splice(bookIndex, 1);
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}
