/*  Este es el codigo completo con todo includo, pero sin dividir
    aqui fue que realice todas las funciones y luego lo separe para
    mayor organización
*/

document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    const cartCount = document.getElementById('cart-count');

    function updateCartCount() {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalQuantity;
    }

    function handleDisplayCart() {
        const cartContainer = document.getElementById('aside-container');
        if (cartContainer.classList.contains('hideCart')) {
            cartContainer.classList.remove('hideCart');
            cartContainer.classList.add('showCart');
        } else {
            cartContainer.classList.remove('showCart');
            cartContainer.classList.add('hideCart');
        }
        displayCart();
    }

    function handleAddToCart(e) {
        if (e.target.classList.contains('add-cart')) {
            const productElement = e.target.closest('.products-container');
            const title = productElement.querySelector('.product-title').textContent;
            const price = parseFloat(productElement.querySelector('.product-price').textContent.replace('$', ''));
            const image = productElement.querySelector('.products-image img').src;
            const description = productElement.querySelector('.product-description').textContent;

            const existingProduct = cart.find(item => item.title === title);
            if (existingProduct) {
                existingProduct.quantity += 1;
                existingProduct.totalPrice += price;
            } else {
                const newProduct = { title, price, description, image, quantity: 1, totalPrice: price };
                cart.push(newProduct);
            }

            updateCartCount();
            displayCart();
        }
    }

    function handleRemoveFromCart(e) {
        if (e.target.classList.contains('remove-cart')) {
            const productElement = e.target.closest('.cart-product');
            const title = productElement.querySelector('h3').textContent;
            const productIndex = cart.findIndex(product => product.title === title);
            if (productIndex !== -1) {
                const product = cart[productIndex];
                product.quantity -= 1;
                product.totalPrice -= product.price;
                if (product.quantity <= 0) {
                    cart.splice(productIndex, 1);
                }
                updateCartCount();
                displayCart();
            }
        }
    }

    function displayCart() {
        const cartContainer = document.getElementById('aside-container');
        cartContainer.innerHTML = '';
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p style="color:black;">No hay productos en el carrito</p>';
        } else {
            cart.forEach((product) => {
                const { title, totalPrice, image, quantity } = product;
                const cartHTML = `
                <div class="cart-product">
                    <div class="cart-product-info">
                        <img src="${image}" alt="${title}" width="75px" height="auto">
                        <div class="cart-product-center">
                            <h3>${title}</h3>
                            <div class="cart-product-row">
                                <p>Precio: $<span>${totalPrice.toFixed(2)}</span></p>
                                <p>Cantidad: <span>${quantity}</span></p>
                            </div>
                        </div>
                        <button class="remove-cart">X</button>
                    </div>
                </div>
                <hr class="dashed">
            `;
                cartContainer.insertAdjacentHTML('beforeend', cartHTML);
            });
            cartContainer.addEventListener('click', handleRemoveFromCart);
        }
    }

    fetch('../products.json')
        .then((response) => response.json())
        .then((data) => {
            let debounceTimeout;

            function handleFilterSearch(e) {
                const searchString = e.target.value.toLowerCase();

                clearTimeout(debounceTimeout);

                debounceTimeout = setTimeout(() => {
                    const dataEncontrada = data.filter((product) => {
                        return product.title.toLowerCase().includes(searchString);
                    });
                    displayProducts(dataEncontrada);
                }, 500);
            }

            const searchBar = document.getElementById('nav-search');
            searchBar.addEventListener('input', handleFilterSearch);

            const productsContainer = document.getElementById('productsContainer');
            const displayProducts = (products) => {
                productsContainer.innerHTML = '';
                products.forEach((product) => {
                    const { title, description, price, url } = product;
                    const productsHTML = `
                    <div class="products-container">
                        <div class="products-image">
                            <img src="${url}" alt="${title}">
                        </div>
                        <div class="product-info">
                            <h1 class="product-title">${title}</h1>
                            <p class="product-description">${description}</p>
                            <div class="product-purchase">
                                <p class="product-price">$${price}</p>
                                <button class="add-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `;
                    productsContainer.insertAdjacentHTML('beforeend', productsHTML);
                });
                productsContainer.addEventListener('click', handleAddToCart);
            };
            displayProducts(data);
        });

    const shoppingCart = document.getElementById('nav-cart');
    shoppingCart.addEventListener('click', handleDisplayCart);
});
