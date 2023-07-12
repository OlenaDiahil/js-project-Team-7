import { fetchCategories, fetchCategoryBooks } from "./category-api/category-api";
import { openModal } from "./modal-window";
import Notiflix from 'notiflix';

const categoryListEl = document.querySelector('.categories_list');
const allCategoriesBtnEl = document.querySelector('.all-categories-active');
const categoryBooksEl = document.querySelector('.categories-books');
const categoryNameEl = document.querySelector('.category-name');
const bookWrapperEL = document.querySelector('.category-books-wrap');
const bestSellersElmnt = document.querySelector('.home-container');

// З АРІ рендеримо категорії книг
creatAllCategories();

function creatAllCategories () {
    fetchCategories().then((category) => { renderCategories(category) })
        .catch(error => Notiflix.Notify.failure("Failed to retrieve the list of categories!", 4000));
  };

function renderCategories(category) {
    const markup = category.map(({ list_name }) => {
        return `<li class="category_item">
      <button type="button" class="category-item-btn" name="${list_name}">
      ${list_name}
      </button>
      </li>`
    })
    .join("");
    categoryListEl.insertAdjacentHTML('beforeend', markup);
   
};

// Створюємо секцію книги за категоріями при кліку на категорію

categoryListEl.addEventListener('click', clikOnCategory)

async function clikOnCategory(event) {

    allCategoriesBtnEl.classList.remove('all-categories-active');

    const categoryName = event.target.name;

    if (categoryName === 'allcategories') {
        bestSellersElmnt.classList.remove('visually-hidden');
        categoryBooksEl.classList.add('visually-hidden');
        return
    }

    categoryNameEl.innerHTML = "";
   
    deleteCategoryBooks();

    const response = await fetchCategoryBooks(categoryName).then(data => {
        if (data.list_name === "") {
            Notiflix.Notify.info("This category doesn't contain any books!", 4000)
            return 
        }

        bestSellersElmnt.classList.add('visually-hidden');
        categoryBooksEl.classList.remove('visually-hidden');
    
        renderCategoryBooks(data);
        creatCategoryName(categoryName)
    })
        .catch(error => Notiflix.Notify.info("This category doesn't contain any books!", 4000));
         
};
  
function renderCategoryBooks(data) {
    const markup = data.map(({ _id, book_image, author, title }) => {
        return `<div id="${_id}" class="category-book-wrapper">
        <img class="category-book-img" src="${book_image}" alt="${title}" />
        <h2 class="category-name-book">${title}</h2>
        <p class="category-name-autor">${author}</p>
        </div>`
    })
    .join("");
    bookWrapperEL.insertAdjacentHTML('beforeend', markup);

    const bookItemElements = document.querySelectorAll('.category-book-wrapper');
    bookItemElements.forEach(bookItem => {
    bookItem.addEventListener('click', () => {
    const bookId = bookItem.id;
    openModal(bookId); // Виклик функції openModal() з передачею bookId для Modal
    });
  });
}

function deleteCategoryBooks() {
    bookWrapperEL.innerHTML = "";
}

// Функція для виділення останнього слова назви категорії іншим кольором

function creatCategoryName(str) {

    let nameCategory = str.split(' ');
    const lastWord = nameCategory[nameCategory.length - 1];
    nameCategory.pop();

    const firstsWords = nameCategory.join(" ");
    
    const marcupColoredWord = `<h2 class="category-name-first-words">${firstsWords} <span class="category-name-last-word">${lastWord}</span></h2>`;
    categoryNameEl.insertAdjacentHTML('afterbegin', marcupColoredWord);
}