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
                          <button class="btn_minus" data-action="minus">-</button>
                          <span class="count" data-counter="${product.id}">${product.quantity}</span>
                          <button class="btn_plus" data-action="plus">+</button>
                      </li>
                      <li class="amount_remove">
                          <p>Remove</p>
                          <button class="btn_remove"><img data-action="remove" src="/img/basket/close-circle.png"></button>
                      </li>
                  </ul>
              </div>`;
      });
      listCard.innerHTML = card;
  }
  createBasketProduct(item);
}

let basket = [];

function saveBasketToLocalStorage() {
    localStorage.setItem('basket', JSON.stringify(basket));
}

function loadBasketFromLocalStorage() {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
        basket = JSON.parse(savedBasket);
        createBasket(basket);
        calcBasketPrice();
    }
}

export function addToBasket(product) {
  const existingProduct = basket.find(item => item.id === product.id);

  if (existingProduct) {
      existingProduct.quantity += 1;
  } else {
      basket.push({ ...product, quantity: 1 });
  }

  saveBasketToLocalStorage();
  createBasket(basket);
  calcBasketPrice();
}

window.addEventListener('click', (event) => {
  let counter;
  let cards;
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
      cards = event.target.closest('.cards');
      counter = cards.querySelector(`[data-counter="${event.target.closest('.amount_item').querySelector('.count').dataset.counter}"]`)
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
      saveBasketToLocalStorage()
      
    } else if (event.target.dataset.action === 'remove') {
        const card = event.target.closest('.cards');
        const productId = card.querySelector('.count').dataset.counter;

        basket = basket.filter(item => item.id !== productId);
        saveBasketToLocalStorage();

        card.remove();
        calcBasketPrice();
        saveBasketToLocalStorage()
    }
    saveBasketToLocalStorage()
});

window.addEventListener('load', () => {
    loadBasketFromLocalStorage();
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
  totalSpan.textContent = totalPrice
}