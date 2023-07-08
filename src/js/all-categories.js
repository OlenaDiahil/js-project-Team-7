import { fetchCategories, fetchCategoryBooks } from "./category-api/category-api";

const categoryListEl = document.querySelector('.categories_list');
const categoryBooksEl = document.querySelector('.categories-books');
const categoryNameEl = document.querySelector('.category-name')

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

function clikOnCategory(event) {
    const categoryName = event.target.name;

    categoryBooksEl.innerHTML = "";

    fetchCategoryBooks(categoryName).then(data => {
        categoryNameEl.textContent = categoryName;
        console.log(data);
        renderCategoryBooks(data);
    })
        .catch(error => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', 1000, selectError()));
};
  
function renderCategoryBooks(data) {
    const markup = data.map(({ book_image, author, title }) => {
        return `<div class="category-book-wrap">
        <img class="category-book-img" src="${book_image}" alt="${title}" />
        <h2>${title}</h2>
        <p>${author}</p>
        </div>`
    })
    .join("");
    categoryBooksEl.insertAdjacentHTML('beforeend', markup);
}

