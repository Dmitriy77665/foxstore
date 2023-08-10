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

export function addToBasket(product) {
  const productIndex = basket.findIndex(item => item.id === product.id);
  
  if (productIndex !== -1) {
      basket[productIndex].quantity += 1;
  } else {
      basket.push({ ...product, quantity: 1 });
  }
  
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
    totalSpan.textContent = totalPrice
}