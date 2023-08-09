import { catalog } from "./main.js"
import { addToBasket } from "./basket.js";
import { newProducts } from "./main.js";

export const products = [
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

export function createProduct(productsItem) {
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
    let btnAllFoxes = document.createElement('button')
    btnAllFoxes.classList.add('all_foxes')
    btnAllFoxes.textContent = 'All Foxes'
    catalog.append(btnAllFoxes)
  
    const addButtonElements = catalog.querySelectorAll('.btn_add');
    addButtonElements.forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        let product = newProducts.find((product) => product.id === productId);
        if (product) {
          addToBasket(product);
        }
      });
    });
  }
