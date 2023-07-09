import { fetchCategories, fetchCategoryBooks } from "./category-api/category-api";

const categoryListEl = document.querySelector('.categories_list');
const allCategoriesBtnEl = document.querySelector('.all-categories-active');
const categoryBooksEl = document.querySelector('.categories-books');
const categoryNameEl = document.querySelector('.category-name');
const bookWrapperEL = document.querySelector('.category-books-wrap');
const bestSellersElmnt = document.querySelector('.home-container');

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

    allCategoriesBtnEl.classList.remove('all-categories-active');

    const categoryName = event.target.name;

    if (categoryName === 'allcategories') {
        bestSellersElmnt.classList.remove('visually-hidden');
        categoryBooksEl.classList.add('visually-hidden');
        return
    }
   
    deleteCategoryBooks();

    const response = await fetchCategoryBooks(categoryName).then(data => {
        if (data.list_name === "") {
            return
        }
        bestSellersElmnt.classList.add('visually-hidden');
        categoryBooksEl.classList.remove('visually-hidden');
    
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

