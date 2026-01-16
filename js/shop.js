let filteredProducts = [...products];

const productGrid = document.querySelector('.product-grid');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderProducts() {
    productGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in visible';
        productCard.innerHTML = `
            <a href="product.html?id=${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="btn btn-outline" style="margin-top: 1rem; width: 100%; border-width: 1px; padding: 0.8rem;">View Product</button>
            </a>
        `;
        productGrid.appendChild(productCard);
    });
}

function filterAndSort() {
    let result = [...products];

    // Search
    const searchTerm = searchInput.value.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(searchTerm));

    // Category (UI only for now, let's wire it up)
    const activeFilter = document.querySelector('.filter-btn.active').dataset.category;
    if (activeFilter !== 'all') {
        result = result.filter(p => p.category === activeFilter);
    }

    // Sort
    const sortBy = sortSelect.value;
    if (sortBy === 'price-low') {
        result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    filteredProducts = result;
    renderProducts();
}

searchInput.addEventListener('input', filterAndSort);
sortSelect.addEventListener('change', filterAndSort);

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterAndSort();
    });
});

// Initial render
renderProducts();
