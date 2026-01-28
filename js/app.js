// Main App Logic
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-grid');
    const searchInput = document.getElementById('search-input');
    const filterContainer = document.getElementById('filter-container');
    const sortSelect = document.getElementById('sort-select');

    let allProducts = [];
    let activeFilter = 'All';

    // WhatsApp Configuration
    const WHATSAPP_PHONE = '1234567890'; // Placeholder

    // Fetch Products
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            initializeFilters(data);
            renderProducts(data);
        })
        .catch(error => console.error('Error loading products:', error));

    // Initialize Category Filters
    function initializeFilters(products) {
        const categories = ['All', ...new Set(products.map(p => p.category))];

        filterContainer.innerHTML = '';
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${category === 'All' ? 'active' : ''}`;
            btn.textContent = category;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = category;
                filterProducts();
            });
            filterContainer.appendChild(btn);
        });
    }

    // Filter Logic
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();

        const filtered = allProducts.filter(product => {
            const matchesCategory = activeFilter === 'All' || product.category === activeFilter;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.tags.some(tag => tag.toLowerCase().includes(searchTerm));

            return matchesCategory && matchesSearch;
        });

        renderProducts(filtered);
    }

    // Search input listener
    searchInput.addEventListener('input', filterProducts);

    // Sort listener
    sortSelect.addEventListener('change', filterProducts);

    // Render Products
    function renderProducts(products) {
        productsContainer.innerHTML = '';

        // Apply Sort
        const sortValue = sortSelect.value;
        const sortedProducts = [...products].sort((a, b) => {
            if (sortValue === 'price-asc') return a.price - b.price;
            if (sortValue === 'price-desc') return b.price - a.price;
            return b.id - a.id; // newest (assuming higher id is newer)
        });

        if (sortedProducts.length === 0) {
            productsContainer.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1 / -1; color: var(--color-text-secondary);">No products found.</p>';
            return;
        }

        sortedProducts.forEach(product => {
            const isSold = product.status === 'sold';
            const card = document.createElement('article');
            card.className = 'product-card';

            // Animation Delay calculation for staggered effect
            // card.style.animationDelay = `${index * 50}ms`;

            const whatsAppMessage = encodeURIComponent(`Hi, I am interested in buying "${product.name}"`);
            const whatsAppUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${whatsAppMessage}`;

            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${product.image}" alt="${product.name}" class="card-image" loading="lazy">
                    ${isSold ? '<div class="sold-badge">Sold Out</div>' : ''}
                </div>
                <div class="card-content">
                    <div class="product-tags">
                        ${product.tags.slice(0, 3).map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    
                    <div class="card-footer">
                        <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                        <a href="${isSold ? '#' : whatsAppUrl}" 
                           class="buy-btn ${isSold ? 'disabled' : ''}" 
                           target="${isSold ? '_self' : '_blank'}"
                           rel="noopener noreferrer">
                            ${isSold ? 'Sold' : 'Inquire'}
                            ${!isSold ? `
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style="margin-top: -2px;">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            ` : ''}
                        </a>
                    </div>
                </div>
            `;
            productsContainer.appendChild(card);
        });
    }
});
