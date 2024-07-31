import { cart, handleAddToCart, handleDisplayCart, displayCart } from './cart.js';
import { handleFilterSearch, displayProducts } from './search.js';

document.addEventListener('DOMContentLoaded', function () {
    const cartCount = document.getElementById('cart-count');
    const cartContainer = document.getElementById('aside-container');
    const productsContainer = document.getElementById('productsContainer');
    const searchBar = document.getElementById('nav-search');
    const shoppingCart = document.getElementById('nav-cart');

    shoppingCart.addEventListener('click', () => handleDisplayCart(cartContainer));

    productsContainer.addEventListener('click', (e) => handleAddToCart(e, cart, cartCount, () => displayCart(cart)));

    fetch('../products.json')
        .then((response) => response.json())
        .then((data) => {
            searchBar.addEventListener('input', (e) => handleFilterSearch(e, data, (filteredData) => displayProducts(filteredData, productsContainer)));
            displayProducts(data, productsContainer);
        });
});
