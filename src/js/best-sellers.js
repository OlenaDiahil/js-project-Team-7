document.addEventListener('DOMContentLoaded', function() {
  const categoryContainer = document.querySelector('#categoryContainer');

  // Отримуємо доступ до категорій книг за допомогою API
  fetch('https://books-backend.p.goit.global/books/category-list')
    .then(response => response.json())
    .then(categories => {
      categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');

        const categoryTitleElement = document.createElement('h2');
        categoryTitleElement.textContent = category.list_name;
        categoryTitleElement.classList.add('category-item');
        categoryElement.appendChild(categoryTitleElement);

        // Отримуємо популярні книги для кожної категорії
        fetch(`https://books-backend.p.goit.global/books/category?category=${category.list_name}`)
          .then(response => response.json())
          .then(data => {
            const books = data;

            if (books.length > 0) {
              const bookListElement = document.createElement('ul');
              bookListElement.classList.add('book-list');

              books.slice(0, 5).forEach(book => {
                const bookItemElement = createBookItemElement(book);
                bookListElement.appendChild(bookItemElement);
              });

              categoryElement.appendChild(bookListElement);

              if (books.length > 5) {
                const seeMoreButtonElement = document.createElement('button');
                seeMoreButtonElement.textContent = 'See More';
                seeMoreButtonElement.classList.add('see-more-button');
                categoryElement.appendChild(seeMoreButtonElement);

                seeMoreButtonElement.addEventListener('click', () => {
                  const bookListElement = categoryElement.querySelector('.book-list');

                  books.slice(5).forEach(book => {
                    const bookItemElement = createBookItemElement(book);
                    bookListElement.appendChild(bookItemElement);
                  });

                  seeMoreButtonElement.remove(); // Видалити кнопку "See More" після додавання нових книг
                });
              }
            } else {
              const noBooksMessageElement = document.createElement('p');
              noBooksMessageElement.textContent = 'Немає популярних книг для цієї категорії';
              categoryElement.appendChild(noBooksMessageElement);
            }
          })
          .catch(error => {
            console.log(`Сталася помилка при отриманні даних для категорії "${category.list_name}" з API:`, error);
          });

        categoryContainer.appendChild(categoryElement);
      });
    })
    .catch(error => {
      console.log('Сталася помилка при отриманні даних з API:', error);
    });
});

function createBookItemElement(book) {
  const bookItemElement = document.createElement('li');
  bookItemElement.classList.add('book-item');

  const bookImageElement = document.createElement('img');
  bookImageElement.src = book.book_image;
  bookImageElement.alt = book.title;
  bookImageElement.classList.add('book-image');
  bookItemElement.appendChild(bookImageElement);

  const bookTitleElement = document.createElement('h3');
  bookTitleElement.textContent = book.title;
  bookTitleElement.classList.add('book-title');
  bookItemElement.appendChild(bookTitleElement);

  const bookAuthorElement = document.createElement('p');
  bookAuthorElement.textContent = book.author;
  bookAuthorElement.classList.add('book-author');
  bookItemElement.appendChild(bookAuthorElement);

  return bookItemElement;
}