

const BASE_URL = 'https://books-backend.p.goit.global';

const fetchCategories = () => {
    return fetch(`${BASE_URL}/books/category-list`).then((response) => {
        if(!response.ok) {
            throw new Error(response.status);
        };
        return response.json();})
}

const fetchCategoryBooks = (categoryName) => {
    return fetch(`${BASE_URL}/books/category?category=${categoryName}`).then((response) => {
        if(!response.ok) {
            throw new Error(response.status);
        };
        return response.json();})
}


export { fetchCategories, fetchCategoryBooks }