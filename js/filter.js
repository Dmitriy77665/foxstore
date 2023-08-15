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

        urlParams.set('filter', filterClass);
        updateUrl();
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

      urlParams.set('price', inpRange.value);
      updateUrl();
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
    urlParams.set('search', searchValue);
    updateUrl();
  })
}

const urlParams = new URLSearchParams(window.location.search);
function updateUrl() {
  const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
  window.history.replaceState(null, '', newUrl);
}

window.addEventListener('load', () => {
  const filterParam = urlParams.get('filter');
  const priceParam = urlParams.get('price');
  const searchParam = urlParams.get('search');

  if (filterParam) {
    const filterBtn = document.querySelector(`[data-filter="${filterParam}"]`);
    if (filterBtn) {
      filterBtn.click();
    }
  }

  if (priceParam) {
    const inpRange = document.querySelector('.slide');
    inpRange.value = priceParam;
    inpRange.dispatchEvent(new Event('input'));
  }

  if (searchParam) {
    const searchInp = document.getElementById('search');
    searchInp.value = searchParam;
    searchInp.dispatchEvent(new Event('input'));
  }
});

