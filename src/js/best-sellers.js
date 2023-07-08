document.addEventListener('DOMContentLoaded', function() {
  const categoryContainer = document.querySelector('#categoryContainer');

  // за даним API отримую доступ до категорій книг
  fetch('https://books-backend.p.goit.global/books/category-list')
    .then(response => response.json())
    .then(categories => {
      categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');

        const categoryTitleElement = document.createElement('h2');
        categoryTitleElement.textContent = category.list_name;
        categoryElement.appendChild(categoryTitleElement);

        // популярні книги за кожною категорією
        fetch(`https://books-backend.p.goit.global/books/category?category=${category.list_name}`)
          .then(response => response.json())
          .then(data => {
            const books = data;

            if (books.length > 0) {
              const bookListElement = document.createElement('ul');
              bookListElement.classList.add('book-list');

              books.slice(0, 5).forEach(book => {
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

                bookListElement.appendChild(bookItemElement);
              });

              categoryElement.appendChild(bookListElement);

              if (books.length > 5) {
                const seeMoreButtonElement = document.createElement('button');
                seeMoreButtonElement.textContent = 'See More';
                seeMoreButtonElement.classList.add('see-more-button');
                categoryElement.appendChild(seeMoreButtonElement);

                seeMoreButtonElement.addEventListener('click', () => {
                  bookListElement.innerHTML = ''; // чистка списку

                  books.slice(5).forEach(book => {
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

                    bookListElement.appendChild(bookItemElement);
                  });

                  if (books.slice(5).length === 0) {
                    const noMoreBooksElement = document.createElement('p');
                    noMoreBooksElement.textContent = 'Немає більше книг для цієї категорії';
                    categoryElement.appendChild(noMoreBooksElement);
                  }
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