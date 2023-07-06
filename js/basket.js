import {products} from "./products.js"

const body = document.querySelector('body')
const openBasket = document.querySelector('.open_basket')
const closeBasket = document.querySelector('.close_basket')
const quantity = document.querySelector('.quantity')
const listCard = document.querySelector('.list_card')
const total = document.querySelector('.total')

openBasket.addEventListener('click', () => {
    body.classList.add('active')
})
closeBasket.addEventListener('click', () => {
    body.classList.remove('active')
})

export let listCards = []

export function reloadCard() {
    listCard.innerHTML = ''
    let count = 0
    let totalPrice = 0
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price
        count = count + value.quantity
        if(value != null) {
            let newDiv = document.createElement('ul')
            newDiv.classList.add('menu_card')
            newDiv.innerHTML = `
                <div class="cards_item">
                    <div><img class="img_item" src="${value.img}"></div>
                    <div class = "cards_txt">
                        <p>${value.name}</p>
                        <span>${value.price.toString()}</span>
                    </div>
                </div>
                <div class="amount">
                    <div class="amount_item">
                        <button class="btn_minus">-</button>
                        <span>${value.quantity}</span>
                        <button class="btn_plus">+</button>
                    </div>
                    <div class ="amount_remove">
                        <p>Remove</p>
                        <button><img src="/img/basket/close-circle.png"></button>
                    </div>
                </div>
            `
            listCard.appendChild(newDiv)
        }
        const btnMinus = document.querySelector('.btn_minus')
        const btnPlus = document.querySelector('.btn_plus')
        btnMinus.addEventListener('click', () => changeQuantity(key, value.quantity -1))
        btnPlus.addEventListener('click', () => changeQuantity(key, value.quantity +1))
    })
    total.innerText = totalPrice.toString()
    quantity.innerText = count
}

function changeQuantity(key, quantity) {
    if(quantity == 0) {
        delete listCards[key]
    } else {
        listCards[key].quantity = quantity
        listCards[key].price = quantity * products[key].price
    }
    reloadCard()
}

