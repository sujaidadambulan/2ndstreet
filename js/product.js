document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));

    const product = products.find(p => p.id === productId) || products[0];

    // Update UI
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('main-product-image').src = product.image;
    document.getElementById('main-product-image').alt = product.name;

    // Render Related Products
    const relatedGrid = document.querySelector('.related-grid');
    const related = products.filter(p => p.id !== product.id).slice(0, 3);

    related.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card fade-in visible';
        card.innerHTML = `
            <a href="product.html?id=${item.id}">
                <div class="product-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
            </a>
        `;
        relatedGrid.appendChild(card);
    });

    // Add to Cart Logic
    const addToCartBtn = document.querySelector('.btn-add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        const size = document.querySelector('input[name="size"]:checked')?.value || 'Not selected';
        const qty = document.getElementById('qty').value;
        alert(`Added to bag:\n${product.name}\nSize: ${size}\nQuantity: ${qty}`);
    });
});
