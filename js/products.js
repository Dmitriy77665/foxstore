import { listCards, reloadCard} from './basket.js'
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

const catalog = document.querySelector('.catalog')
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
                <img src="/img/catalog/star.png" alt="">
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


