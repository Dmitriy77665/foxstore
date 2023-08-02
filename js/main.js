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

const catalog = document.querySelector('.catalog')
let card = ''
function createProductCard (arr) {
    arr.forEach((product) => {
        card += `<ul class="item ${product.topic}">
                    <li><img src="${product.img}" alt=""></li>
                    <li><button class="btn_add"><span>+</span><p>Add</p></button></li>
                    <li class="item_price">
                        <p>${product.name}</p>
                        <span class="price">$${product.price}</span>
                        <img src="/img/catalog/star.png" alt="">
                        <span>${product.topic}</span>
                    </li>
                </ul>`
    })
    return card
}

let catalogItem = document.createElement('div')
catalogItem.classList.add('catalog_item')
catalogItem.innerHTML = createProductCard(products)
catalog.prepend(catalogItem)




let newProducts = JSON.parse(JSON.stringify(products))
    

const item = document.querySelectorAll('.item')

const btn = document.querySelectorAll('.btn')
function filterProduct (obj) {
    for(let i = 0; i < obj.length; i++) {
        obj[i].addEventListener('click', (event) => {
            event.preventDefault()
            let filterClass = event.target.dataset.filter
            
            item.forEach(elem => {
                if(filterClass == 'all') {
                    elem.style.display = 'block'
                } else {
                    if (elem.classList.contains(filterClass)) {
                        elem.style.display = 'block'
                    } else {
                        elem.style.display = 'none'
                    }
                }
            })
        })
    }
}
filterProduct(btn)

const inpRange = document.querySelector('.slide')
const valuePrice = document.getElementById('price')

function filterByPrice (price) {
    price.innerHTML = inpRange.value
    inpRange.oninput = function() {
        price.innerHTML = inpRange.value
    }
}

filterByPrice(valuePrice)

