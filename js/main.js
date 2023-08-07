const products = [
  {
      id:'1',
      img:'img/catalog/1.png',
      name: 'Stylish chair',
      price: '100.00',
      topic: 'Forest'
  },
  {
      id:'2',
      img:'img/catalog/2.png',
      name: 'Stylish chair',
      price: '110.00',
      topic: 'Office'
  },
  {
      id:'3',
      img:'img/catalog/3.png',
      name: 'Stylish chair',
      price: '120.00',
      topic: 'Foxkid'
  },
  {
      id:'4',
      img:'img/catalog/4.png',
      name: 'Stylish chair',
      price: '90.00',
      topic: 'Foxkid'
  },
  {
      id:'5',
      img:'img/catalog/5.png',
      name: 'Stylish chair',
      price: '100.00',
      topic: 'Other'
  },
  {
      id:'6',
      img:'img/catalog/6.png',
      name: 'Stylish chair',
      price: '110.00',
      topic: 'Forest'
  },
  {
      id:'7',
      img:'img/catalog/7.png',
      name: 'Stylish chair',
      price: '90.00',
      topic: 'Forest'
  },
  {
      id:'8',
      img:'img/catalog/8.png',
      name: 'Stylish chair',
      price: '120.00',
      topic: 'Foxkid'
  },
]

let newProducts = JSON.parse(JSON.stringify(products));

const catalog = document.querySelector('.catalog');

function createProduct(productsToShow) {
  let card = ''; // Переменная для хранения карточек продуктов

  function createProductCard(arr) {
    arr.forEach((product) => {
      card += `<ul class="item ${product.topic}" data-product-id="${product.id}">
                  <li><img src="${product.img}" alt=""></li>
                  <li><button class="btn_add" data-product-id="${product.id}"><span>+</span><p>Add</p></button></li>
                  <li class="item_price">
                      <p>${product.name}</p>
                      <span class="price">$${product.price}</span>
                      <img src="/img/catalog/star.png" alt="">
                      <span>${product.topic}</span>
                  </li>
              </ul>`;
    });
  }

  createProductCard(productsToShow); // Вызываем функцию для создания карточек

  catalog.innerHTML = ''; // Очищаем каталог перед добавлением новых карточек
  let catalogItem = document.createElement('div');
  catalogItem.classList.add('catalog_item');
  catalogItem.innerHTML = card; // Присваиваем карточки к контейнеру
  catalog.prepend(catalogItem); // Добавляем контейнер в каталог

  const btnAddBasket = document.querySelectorAll('.btn_add');
  btnAddBasket.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      let productId = event.target.dataset.productId;
      let product = newProducts.find((product) => product.id === productId);

      if (product) {
        addToBasket(product);
      }
    });
  });
}

let basket = [];

function addToBasket(product) {
  basket.push(product);
  createBasket(basket);
  updateTotalPrice();
}

function updateTotalPrice() {
  const totalSpan = document.querySelector('.total');
  const total = basket.reduce((acc, curr) => acc + parseFloat(curr.price), 0);
  totalSpan.textContent = total.toFixed(2);
}

function createBasket(item) {
  const listCard = document.querySelector('.list_card');
  listCard.innerHTML = '';
  let card = '';

  function createBasketProduct(arr) {
    arr.forEach((product) => {
      card += `
        <div class="cards">
          <ul class="cards_item">
              <li><img class="img_item" src="${product.img}"></li>
              <li class="cards_txt">
                  <p>${product.name}</p>
                  <span>${product.price}</span>
              </li>
          </ul>
          <ul class="amount">
              <li class="amount_item">
                  <button class ="btn_minus">-</button>
                  <span id="count"></span>
                  <button class ="btn_plus">+</button>
              </li>
              <li class="amount_remove">
                  <p>Remove</p>
                  <button class="btn_remove" data-product-id="${product.id}"><img src="/img/basket/close-circle.png"></button>
              </li>
          </ul>
        </div>`;
    });
    listCard.innerHTML = card;
    bindRemoveButton();
  }

  createBasketProduct(item);
}


function filterProduct() {
  const btn = document.querySelectorAll('.btn');
  btn.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      let filterClass = event.target.dataset.filter;
      let productsFilter;

      if (filterClass === 'all') {
        productsFilter = newProducts;
      } else {
        productsFilter = newProducts.filter((product) => product.topic === filterClass);
      }

      createProduct(productsFilter);
    });
  });
}

function filterProductPrice() {
  
  const inpRange = document.querySelector('.slide');
  price.innerHTML = '1'
  inpRange.oninput = function() {
          
      price.innerHTML = inpRange.value
  }
  inpRange.addEventListener('input', () => {
    let productsFilter = newProducts.filter((item) => parseFloat(inpRange.value) >= parseFloat(item.price));
    createProduct(productsFilter);
  });
}

const body = document.querySelector('body');
const listCard = document.querySelector('.list_card');
const openBasket = document.querySelector('.open_basket');
const closeBasket = document.querySelector('.close_basket');

openBasket.addEventListener('click', () => {
  body.classList.add('active');
});
closeBasket.addEventListener('click', () => {
  body.classList.remove('active');
});

createProduct(newProducts);
filterProduct();
filterProductPrice();
