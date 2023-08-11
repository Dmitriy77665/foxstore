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