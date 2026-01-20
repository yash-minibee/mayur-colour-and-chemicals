// Products Page JavaScript

// Sample product data
const products = [
    {
        id: 1,
        name: "Titanium Dioxide White",
        category: "pigments",
        description: "High-opacity white pigment for coatings and plastics with excellent UV resistance.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        colors: ["#FFFFFF", "#F8F9FA", "#E9ECEF"],
        specifications: {
            "Chemical Name": "Titanium Dioxide (TiO₂)",
            "Color Index": "PW 6",
            "Particle Size": "0.2-0.3 μm",
            "Oil Absorption": "15-25 g/100g",
            "pH Value": "6.5-8.0",
            "Moisture Content": "≤0.5%"
        },
        applications: [
            "Architectural coatings",
            "Automotive paints",
            "Plastic masterbatch",
            "Paper coating",
            "Cosmetics"
        ]
    },
    {
        id: 2,
        name: "Iron Oxide Red",
        category: "pigments",
        description: "Natural iron oxide pigment providing excellent color stability and weather resistance.",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
        colors: ["#CD5C5C", "#B22222", "#8B0000"],
        specifications: {
            "Chemical Name": "Iron Oxide (Fe₂O₃)",
            "Color Index": "PR 101",
            "Particle Size": "0.1-0.2 μm",
            "Oil Absorption": "25-35 g/100g",
            "pH Value": "4.0-7.0",
            "Iron Content": "≥96%"
        },
        applications: [
            "Construction materials",
            "Ceramic glazes",
            "Rubber products",
            "Concrete coloring",
            "Artist paints"
        ]
    },
    {
        id: 3,
        name: "Chrome Yellow",
        category: "pigments",
        description: "Bright yellow pigment with excellent hiding power and lightfastness properties.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        colors: ["#FFFF00", "#FFD700", "#FFA500"],
        specifications: {
            "Chemical Name": "Lead Chromate (PbCrO₄)",
            "Color Index": "PY 34",
            "Particle Size": "0.5-1.0 μm",
            "Oil Absorption": "12-18 g/100g",
            "pH Value": "6.0-8.0",
            "Lead Content": "≥64%"
        },
        applications: [
            "Industrial coatings",
            "Traffic paints",
            "Plastic coloring",
            "Printing inks",
            "Ceramic applications"
        ]
    },
    {
        id: 4,
        name: "Reactive Blue 19",
        category: "dyes",
        description: "High-performance reactive dye for cotton and cellulosic fibers with excellent wash fastness.",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        colors: ["#0066CC", "#003399", "#001166"],
        specifications: {
            "Chemical Name": "Anthraquinone derivative",
            "Color Index": "RB 19",
            "Dye Content": "≥60%",
            "pH Value": "7.0-9.0",
            "Solubility": "100 g/L at 25°C",
            "Light Fastness": "6-7"
        },
        applications: [
            "Cotton dyeing",
            "Textile printing",
            "Paper dyeing",
            "Leather coloring",
            "Wool processing"
        ]
    },
    {
        id: 5,
        name: "Acid Red 88",
        category: "dyes",
        description: "Brilliant red acid dye suitable for wool, silk, and nylon with superior color brilliance.",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
        colors: ["#DC143C", "#B22222", "#8B0000"],
        specifications: {
            "Chemical Name": "Azo compound",
            "Color Index": "AR 88",
            "Dye Content": "≥85%",
            "pH Value": "3.0-5.0",
            "Solubility": "200 g/L at 25°C",
            "Wash Fastness": "4-5"
        },
        applications: [
            "Wool dyeing",
            "Silk processing",
            "Nylon coloring",
            "Leather dyeing",
            "Cosmetic applications"
        ]
    },
    {
        id: 6,
        name: "Red Masterbatch",
        category: "masterbatch",
        description: "Concentrated red color masterbatch for polyethylene and polypropylene applications.",
        image: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=300&fit=crop",
        colors: ["#FF0000", "#CC0000", "#990000"],
        specifications: {
            "Base Polymer": "PE/PP",
            "Pigment Content": "40-50%",
            "Melt Flow Index": "5-25 g/10min",
            "Density": "1.2-1.4 g/cm³",
            "Processing Temp": "180-250°C",
            "Dosage Rate": "2-5%"
        },
        applications: [
            "Injection molding",
            "Blow molding",
            "Film extrusion",
            "Fiber spinning",
            "Rotomolding"
        ]
    },
    {
        id: 7,
        name: "Blue Masterbatch",
        category: "masterbatch",
        description: "High-quality blue masterbatch with excellent dispersion and thermal stability.",
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
        colors: ["#0000FF", "#0000CC", "#000099"],
        specifications: {
            "Base Polymer": "PE/PP/PS",
            "Pigment Content": "35-45%",
            "Melt Flow Index": "8-30 g/10min",
            "Density": "1.1-1.3 g/cm³",
            "Processing Temp": "160-280°C",
            "Dosage Rate": "1-4%"
        },
        applications: [
            "Packaging films",
            "Household items",
            "Automotive parts",
            "Textile fibers",
            "Agricultural films"
        ]
    },
    {
        id: 8,
        name: "Metallic Gold",
        category: "specialty",
        description: "Premium metallic gold pigment for luxury applications with brilliant luster effect.",
        image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=300&fit=crop",
        colors: ["#FFD700", "#FFA500", "#FF8C00"],
        specifications: {
            "Base Material": "Mica + Metal Oxide",
            "Particle Size": "10-60 μm",
            "Luster Grade": "Premium",
            "Temperature Stability": "Up to 800°C",
            "Chemical Resistance": "Excellent",
            "Coverage": "High"
        },
        applications: [
            "Automotive coatings",
            "Decorative paints",
            "Printing inks",
            "Cosmetic products",
            "Plastic applications"
        ]
    },
    {
        id: 9,
        name: "Pearl White",
        category: "specialty",
        description: "Pearlescent white pigment creating elegant pearl-like effects with superior brilliance.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        colors: ["#F8F8FF", "#E6E6FA", "#D8BFD8"],
        specifications: {
            "Base Material": "Natural Mica",
            "Particle Size": "5-25 μm",
            "Refractive Index": "1.56-1.58",
            "Temperature Stability": "Up to 600°C",
            "pH Stability": "4-10",
            "Opacity": "Semi-transparent"
        },
        applications: [
            "Cosmetic formulations",
            "Automotive finishes",
            "Architectural coatings",
            "Plastic products",
            "Textile printing"
        ]
    }
];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const filterButtons = document.querySelectorAll('.products-filter-btn');
const categoryCards = document.querySelectorAll('.products-category-card');
const productModal = new bootstrap.Modal(document.getElementById('productModal'));

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    initializeFilters();
    initializeCategoryCards();
    initializeAnimations();
});

// Render products
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    
    productsToRender.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productGrid.appendChild(productCard);
    });
    
    // Trigger fade-in animation
    setTimeout(() => {
        document.querySelectorAll('.products-product-card').forEach(card => {
            card.classList.add('fade-in');
        });
    }, 100);
}

// Create product card
function createProductCard(product, index) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    
    const colorSwatches = product.colors.map(color => 
        `<div class="products-color-swatch" style="background-color: ${color};" data-color="${color}"></div>`
    ).join('');
    
    col.innerHTML = `
        <div class="products-product-card fade-out" data-category="${product.category}" style="animation-delay: ${index * 0.1}s">
            <div class="products-product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="products-color-swatches">
                    ${colorSwatches}
                </div>
            </div>
            <div class="products-product-info">
                <div class="products-product-category">${product.category}</div>
                <h5 class="products-product-title">${product.name}</h5>
                <p class="products-product-description">${product.description}</p>
                <button class="btn btn-primary products-btn-view-details" onclick="showProductDetails(${product.id})">
                    <i class="fas fa-eye me-2"></i>View Details
                </button>
            </div>
        </div>
    `;
    
    return col;
}

// Initialize filters
function initializeFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            filterProducts(filter);
        });
    });
}

// Filter products
function filterProducts(category) {
    const productCards = document.querySelectorAll('.products-product-card');
    
    // Fade out all cards
    productCards.forEach(card => {
        card.classList.remove('fade-in');
        card.classList.add('fade-out');
    });
    
    setTimeout(() => {
        if (category === 'all') {
            renderProducts(products);
        } else {
            const filteredProducts = products.filter(product => product.category === category);
            renderProducts(filteredProducts);
        }
    }, 300);
}

// Initialize category cards
function initializeCategoryCards() {
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-filter="${category}"]`).classList.add('active');
            
            // Filter products and scroll to section
            filterProducts(category);
            document.querySelector('#productGrid').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Show product details in modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Update modal content
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductImage').alt = product.name;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    
    // Update color swatches
    const modalSwatches = document.getElementById('modalColorSwatches');
    modalSwatches.innerHTML = product.colors.map(color => 
        `<div class="products-color-swatch" style="background-color: ${color};" title="${color}"></div>`
    ).join('');
    
    // Update specifications table
    const specsTable = document.getElementById('modalSpecsTable');
    specsTable.innerHTML = Object.entries(product.specifications).map(([key, value]) => 
        `<tr><td class="fw-semibold">${key}</td><td>${value}</td></tr>`
    ).join('');
    
    // Update applications list
    const applicationsList = document.getElementById('modalApplications');
    applicationsList.innerHTML = product.applications.map(app => 
        `<li class="mb-1"><i class="fas fa-check text-primary me-2"></i>${app}</li>`
    ).join('');
    
    // Show modal
    productModal.show();
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in-up, .products-category-card, .products-feature-card').forEach(el => {
        observer.observe(el);
    });
}

// Color swatch interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('products-color-swatch')) {
        // Add ripple effect
        const swatch = e.target;
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: productsRipple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = swatch.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        swatch.style.position = 'relative';
        swatch.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes productsRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Loading states for buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('products-btn-view-details')) {
        const button = e.target;
        const originalText = button.innerHTML;
        
        button.innerHTML = '<div class="products-loading"></div> Loading...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1000);
    }
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && productModal._isShown) {
        productModal.hide();
    }
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}