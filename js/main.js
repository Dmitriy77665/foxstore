async function loadScripts() {
    await import('./product.js');
    await import('./filter.js');
}
function fadeInContent() {
    const catalog = document.querySelector('.catalog');
    catalog.style.opacity = '1';
}
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
  
    loadScripts().then(fadeInContent);
});

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
    
    const footer = document.querySelector('.footer');
    footer.classList.remove('initial-hidden');
    
    loadScripts().then(fadeInContent);
});

import { products } from "./product.js";
import { createProduct } from "./product.js"
import { filterProduct } from "./filter.js"
import { filterProductPrice } from "./filter.js"
import { filterProductName } from "./filter.js"

export let newProducts = JSON.parse(JSON.stringify(products))

export const catalog = document.querySelector('.catalog')


createProduct(newProducts);
filterProduct();
filterProductPrice();
filterProductName()
