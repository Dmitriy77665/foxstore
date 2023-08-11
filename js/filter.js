import { createProduct } from "./product.js";
import { newProducts } from "./main.js";

export function filterProduct() {
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

export function filterProductPrice() {
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

export function filterProductName () {
  const searchInp = document.getElementById('search')
  searchInp.addEventListener('input', (event) => {
    event.preventDefault()

    let searchValue = searchInp.value.toLowerCase()
    let productsFilter = newProducts.filter((product) => {
      return product.topic.toLowerCase().includes(searchValue)
    })
    createProduct(productsFilter)
  })
}