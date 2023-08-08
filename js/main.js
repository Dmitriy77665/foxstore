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

let newProducts = JSON.parse(JSON.stringify(products))

const catalog = document.querySelector('.catalog')

function createProduct(productsItem) {
  let card = ''; 

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

  createProductCard(productsItem); 

  catalog.innerHTML = ''; 
  let catalogItem = document.createElement('div');
  catalogItem.classList.add('catalog_item');
  catalogItem.innerHTML = card; 
  catalog.append(catalogItem);
  const allFoxes = document.createElement('button')
  allFoxes.textContent = 'All Foxes'
  allFoxes.classList.add('all_foxes')
  catalog.append(allFoxes)

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
  calcBasketPrice();
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
                  <span class="price_currency">${product.price}</span>
              </li>
          </ul>
          <ul class="amount">
              <li class="amount_item">
                  <button class ="btn_minus" data-action="minus">-</button>
                  <span id="count" data-counter>1</span>
                  <button class ="btn_plus" data-action="plus">+</button>
              </li>
              <li class="amount_remove">
                  <p>Remove</p>
                  <button class="btn_remove" ><img data-action="remove" src="/img/basket/close-circle.png"></button>
              </li>
          </ul>
        </div>`;
    });
    listCard.innerHTML = card;

  }
  createBasketProduct(item);
}

window.addEventListener('click', (event) => {
  let counter;
  let cards;
  if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
    cards = event.target.closest('.cards');
    counter = cards.querySelector('[data-counter]');
    const priceEl = cards.querySelector('.price_currency');
    const productPrice = parseFloat(priceEl.innerText);
    const currentCount = parseInt(counter.innerText);
    let newCount;
    if (event.target.dataset.action === 'plus') {
      newCount = currentCount + 1;
    } else if (event.target.dataset.action === 'minus' && currentCount > 1) {
      newCount = currentCount - 1;
    } else {
      return;
    }

    counter.innerText = newCount;
    priceEl.textContent = (productPrice * newCount).toFixed(2);

  } else if (event.target.dataset.action === 'remove') {
    cards = event.target.closest('.cards');
    cards.remove();
  }
  calcBasketPrice();
});

function calcBasketPrice() {
  const cards = document.querySelectorAll('.cards');
  let totalPrice = 0;
  cards.forEach(function (item) {
    const amountEl = item.querySelector('[data-counter]');
    const priceEl = item.querySelector('.price_currency');
    const currentPrice = parseFloat(amountEl.innerText) * parseFloat(priceEl.innerText);
    totalPrice += currentPrice;
  });
  const totalSpan = document.querySelector('.total');
  totalSpan.textContent = totalPrice.toFixed(2);
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
  price.innerHTML = '200'
  inpRange.oninput = function() {    
      price.innerHTML = inpRange.value
  }
  inpRange.addEventListener('input', () => {
    let productsFilter = newProducts.filter((item) => parseFloat(item.price) <= parseFloat(inpRange.value));
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
