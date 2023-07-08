import { fetchCategories, fetchCategoryBooks } from "./category-api/category-api";

const categoryListEl = document.querySelector('.categories_list');
const categoryBooksEl = document.querySelector('.categories-books');
const categoryNameEl = document.querySelector('.category-name');
const bookWrapperEL = document.querySelector('.category-books-wrap');

creatAllCategories();

categoryListEl.addEventListener('click', clikOnCategory)

function creatAllCategories () {
    fetchCategories().then((category) => { renderCategories(category) })
        .catch(error => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', 1000, selectError()));
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

async function clikOnCategory(event) {

    const categoryName = event.target.name;
    deleteCategoryBooks();

    const response = await fetchCategoryBooks(categoryName).then(data => {
        if (data.list_name === "") {
            return
        }
        console.log(data);
        renderCategoryBooks(data);
        categoryNameEl.textContent = categoryName;
    })
        .catch(error => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', 1000, selectError()));
};
  
function renderCategoryBooks(data) {
    const markup = data.map(({ book_image, author, title }) => {
        return `<div class="category-book-wrapper">
        <img class="category-book-img" src="${book_image}" alt="${title}" />
        <h2 class="category-name-book">${title}</h2>
        <p class="category-name-autor">${author}</p>
        </div>`
    })
    .join("");
    bookWrapperEL.insertAdjacentHTML('beforeend', markup);
}

async function deleteCategoryBooks() {
    bookWrapperEL.innerHTML = "";
}

