import {changeQuantity} from './products.js'

const body = document.querySelector('body')
const openBasket = document.querySelector('.open_basket')
const closeBasket = document.querySelector('.close_basket')
const quantity = document.querySelector('.quantity')
const listCard = document.querySelector('.list_card')
const total = document.querySelector('.total')

let listCards = []

openBasket.addEventListener('click', () => {
    body.classList.add('active')
})
closeBasket.addEventListener('click', () => {
    body.classList.remove('active')
})

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
                        <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                        <span>${value.quantity}</span>
                        <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                    </div>
                    <div class ="amount_remove">
                        <p>Remove</p>
                        <button><img src="/img/basket/close-circle.png"></button>
                    </div>
                </div>
            `
            listCard.appendChild(newDiv)
        }
    })
    total.innerText = totalPrice.toString()
    quantity.innerText = count
}