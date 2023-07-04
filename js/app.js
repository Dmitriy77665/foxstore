const products = [
    {
        id:'1',
        img:'img/catalog/1.png',
        name: 'Stylish chair',
        price: '120.00',
        topic: 'Forest'
    },
    {
        id:'2',
        img:'img/catalog/2.png',
        name: 'Stylish chair',
        price: '120.00',
        topic: 'Office'
    },
    {
        id:'3',
        img:'img/catalog/3.png',
        name: 'Stylish chair',
        price: '120.00',
        topic: 'Foxs kids'
    },
    {
        id:'4',
        img:'img/catalog/4.png',
        name: 'Stylish chair',
        price: '120.00',
        topic: 'Foxs kids'
    },
    {
        id:'5',
        img:'img/catalog/5.png',
        name: 'Stylish chair',
        price: '120.00',
        topic: 'Other'
    },
    {
        id:'6',
        img:'img/catalog/6.png',
        name: 'Stylish chair',
        price: '120.00',
        topic: 'Forest'
    },
    {
        id:'7',
        img:'img/catalog/7.png',
        name: 'Stylish chair',
        price: '120.00',
        topic: 'Forest'
    },
    {
        id:'8',
        img:'img/catalog/8.png',
        name: 'Stylish chair',
        price: '120.00',
        topic: 'Foxs kids'
    },
]

const body = document.querySelector('body')
const openBasket = document.querySelector('.open_basket')
const closeBasket = document.querySelector('.close_basket')
const quantity = document.querySelector('.quantity')
const listCard = document.querySelector('.list_card')
const total = document.querySelector('.total')
const catalog = document.querySelector('.catalog') // list


openBasket.addEventListener('click', () => {
    body.classList.add('active')
})
closeBasket.addEventListener('click', () => {
    body.classList.remove('active')
})

let listCards = []
function innitApp () {
    products.forEach((value, key) => {
        let newDiv = document.createElement('ul')
        newDiv.classList.add('catalog_item')
        newDiv.innerHTML = `
            <li><img src="${value.img}" alt=""></li>
            <li><button onclick="addToCard(${key})" class="btn_add"><span>+</span><p>Add</p></button></li>
            <li class="item_price">
                <p>${value.name}</p>
                <span>$${value.price.toString()}</span>
                <img src="/task2_8/img/catalog/star.png" alt="">
                <span>${value.topic}</span>
            </li>
        `
        catalog.insertBefore(newDiv, catalog.firstChild)
    })
}
innitApp()

function addToCard(key) {
    if(listCards[key] == null) {
        listCards[key] = products[key]
        listCards[key].quantity = 1
    }
    reloadCard()
}

function reloadCard() {
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
                        <button"><img src="/task2_8/img/basket/close-circle.png"></button>
                    </div>
                </div>
            `
            listCard.appendChild(newDiv)
        }
    })
    total.innerText = totalPrice.toString()
    quantity.innerText = count
}

function changeQuantity (key, quantity) {
    if(quantity == 0) {
        delete listCards[key]
    } else {
        listCards[key].quantity = quantity
        listCards[key].price = quantity * products[key].price
    }
    reloadCard()
}
