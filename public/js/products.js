// products.js - Fixed version (no external JSON)

// Product data
const products = {
    'arranque-bosch': {
        name: 'Arranque Bosch',
        brand: 'Bosch',
        price: 'R$ 299,99',
        image: 'arranque.png',
        description: 'Arranque original Bosch para caminhões, com garantia de 12 meses e alto desempenho.',
        specifications: [
            'Tensão: 12V',
            'Potência: 2.5kW',
            'Garantia: 12 meses',
            'Aplicação: Caminhões pesados'
        ]
    },
    'alternador-bosch': {
        name: 'Alternador Bosch',
        brand: 'Bosch',
        price: 'R$ 499,99',
        image: 'alternador.png',
        description: 'Alternador original Bosch com alta eficiência e durabilidade.',
        specifications: [
            'Tensão: 14V',
            'Corrente: 120A',
            'Garantia: 12 meses',
            'Aplicação: Caminhões e ônibus'
        ]
    },
    'carburador-bosch': {
        name: 'Carburador Bosch',
        brand: 'Bosch',
        price: 'R$ 199,99',
        image: 'carburador.png',
        description: 'Carburador original Bosch para motores a combustão.',
        specifications: [
            'Tipo: Eletrônico',
            'Vazão: 200cm³/min',
            'Garantia: 6 meses',
            'Aplicação: Motores médios'
        ]
    }
};

// Convert to array for easier manipulation
const productsArray = Object.entries(products).map(([id, product]) => ({
    id,
    ...product
}));

// DOM elements
const searchInput = document.getElementById('search');
const productsContainer = document.getElementById('produtos-container');
const productsTitle = document.querySelector('.products h1');
const searchForm = document.querySelector('.search form');

// Render products
function renderProducts(productsToRender = productsArray) {
    if (productsToRender.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">Nenhum produto encontrado.</p>';
        return;
    }

    productsContainer.innerHTML = productsToRender.map(product => `
        <div class="product" data-id="${product.id}">
            <div class="img-container">
                <img src="./images/${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="desc-container">
                <h4>${product.name}</h4>
                <small>${product.brand}</small>
                <p>${product.price}</p>
                <a href="/produto?id=${product.id}">Mais Detalhes</a>
            </div>
        </div>
    `).join('');
}

// Filter products
function filterProducts(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) {
        renderProducts();
        return;
    }

    const filteredProducts = productsArray.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );

    renderProducts(filteredProducts);
}

// Toggle title visibility
function toggleTitleVisibility(shouldHide) {
    productsTitle.style.display = shouldHide ? 'none' : 'block';
}

// Initialize
function initProducts() {
    // Render initial products
    renderProducts();

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        filterProducts(searchTerm);
        toggleTitleVisibility(searchTerm.trim() !== '');
    });

    // Prevent form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', initProducts);