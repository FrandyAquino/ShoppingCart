export function handleFilterSearch(e, data, displayProducts) {
    const searchString = e.target.value.toLowerCase();
    let debounceTimeout;

    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        const dataEncontrada = data.filter((product) => {
            return product.title.toLowerCase().includes(searchString);
        });
        displayProducts(dataEncontrada);
    }, 500);
}

export function displayProducts(products, productsContainer) {
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
}
