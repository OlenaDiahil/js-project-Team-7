const KEY_SL = 'bookList';
let imgEmpryBig = new URL('/src/assets/img/empty-page@2.png', import.meta.url);
let imgEmpry = new URL('/src/assets/img/empty-page.png', import.meta.url);
let imgchop1 = new URL('/src/assets/img/shop1.png', import.meta.url);
let imgchop2 = new URL('/src/assets/img/shop2.png', import.meta.url);
let imgchop3 = new URL('/src/assets/img/shop3.png', import.meta.url);
let imgIcon = new URL('/src/assets/img/trash-03.png', import.meta.url);

const ulMarkupSL = document.querySelector('.books-shoppingList');

let loadData = localStorage.getItem(KEY_SL);
let parsedData = JSON.parse(loadData);

function loadBookSL() {
  if (parsedData && parsedData.length > 0) {
    markupBookContent(parsedData);
  } else {
    ulMarkupSL.innerHTML = markupBookZoro;
  }
}

const markupBookZoro = `<li><p class="shoppingList-text">
            This page is empty, add some books and proceed to order.
          </p>
          <a href="./index.html">
            <picture>
              <source srcset="${imgEmpryBig} 2x" type="image/png" />
              <img
                class="shoppingList-img"
                src="${imgEmpry}"
                alt="Book"
              />
            </picture>
          </a></li>`;

function markupBookContent(parsedData) {
  ulMarkupSL.innerHTML = '';
  const markupBookLi = parsedData
    .map(parsedData => {
      return `<li class="books-shoppingListLi">
                <img
                  class="books-shoppingList-img"
                  src="${parsedData.image}"
                  alt=""
                />
                <div class="box-shoppingList-content">
                  <div id="cont" class="box-shoppingList">
                    <div>
                      <h2 class="text-shoppingList-title">${parsedData.title}</h2>
                      <p class="text-shoppingList-category">${parsedData.publisher}</p>
                    </div>
                    <button class="box-shoppingList-trash" id="${parsedData.id}">
                       <img
                            class="box-shoppingList-trash-icon"
                            src="${imgIcon}"
                            alt="trash"

                            />       
                      </svg>   
                    </button>
                  </div>
                  <p class="text-shoppingList-content">
                    ${parsedData.description}
                  </p>
                  <div class="box-shoppingList-link">
                    <p class="text-shoppingList-author">${parsedData.author}</p>
                    <ul class="box-shoppingList-shop">
                      <li>
                        <a
                          class="shop-shoppingList-link"
                          target="_blank"
                          href="https://www.amazon.com"
                        >
                           <img
                            class="shop-shoppingList-img1"
                            src="${imgchop1}"
                            alt=""

                            />       
                        </a>
                      </li>
                      <li>
                        <a
                          class="shop-shoppingList-link"
                          target="_blank"
                          href="https://goto.applebooks.apple"
                        >                          
                          <img
                            class="shop-shoppingList-img2"
                            src="${imgchop2}"
                            alt=""

                          />           
                        </a>
                      </li>
                      <li>
                        <a
                          class="shop-shoppingList-link"
                          target="_blank"
                          href="https://du-gae-books-dot-nyt-du-prd.appspot.com"
                        >
                           <img
                            class="shop-shoppingList-img2"
                            src="${imgchop3}"
                            alt=""

                            />       
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            `;
    })
    .join('');
  ulMarkupSL.innerHTML = markupBookLi;

  deliteBookId();
}

function deliteBookId() {
  let dots = document.getElementsByClassName('box-shoppingList-trash');
  let i;

  for (i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', e => {
      let keyId = e.target.parentElement.attributes.id.value;
      let filtered = parsedData.filter(o => o.id !== keyId);

      localStorage.setItem(KEY_SL, JSON.stringify(filtered));
      loadData = localStorage.getItem(KEY_SL);
      parsedData = JSON.parse(loadData);
      loadBookSL();
    });
  }
}


