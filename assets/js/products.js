// Products Page JavaScript - Enhanced Mayur Colour Design

// Product data with 15 diverse products across different categories
const products = [
    // PIGMENTS
    {
        id: 1,
        name: "Titanium Dioxide White",
        category: "pigments",
        colorShade: "#FFFFFF",
        ciGenericName: "Titanium Dioxide",
        casNumber: "13463-67-7",
    },
    {
        id: 2,
        name: "Iron Oxide Red",
        category: "pigments",
        colorShade: "#CD5C5C",
        ciGenericName: "Iron Oxide Red",
        casNumber: "1309-37-1",
    },
    {
        id: 3,
        name: "Chrome Green Oxide",
        category: "pigments",
        colorShade: "#228B22",
        ciGenericName: "Chromium Oxide Green",
        casNumber: "1308-38-9",
    },
    {
        id: 4,
        name: "Ultramarine Blue",
        category: "pigments",
        colorShade: "#4169E1",
        ciGenericName: "Ultramarine Blue",
        casNumber: "57455-37-5",
    },
    {
        id: 5,
        name: "Carbon Black",
        category: "pigments",
        colorShade: "#000000",
        ciGenericName: "Carbon Black",
        casNumber: "1333-86-4",
    },
    {
        id: 6,
        name: "Yellow Iron Oxide",
        category: "pigments",
        colorShade: "#FFD700",
        ciGenericName: "Iron Oxide Yellow",
        casNumber: "51274-00-1",
    },

    // DYES
    {
        id: 7,
        name: "Reactive Red 195",
        category: "dyes",
        colorShade: "#DC143C",
        ciGenericName: "Reactive Red",
        casNumber: "17095-24-8",
    },
    {
        id: 8,
        name: "Direct Blue 199",
        category: "dyes",
        colorShade: "#0000FF",
        ciGenericName: "Direct Blue",
        casNumber: "2602-46-2",
    },
    {
        id: 9,
        name: "Acid Yellow 23",
        category: "dyes",
        colorShade: "#FFFF00",
        ciGenericName: "Acid Yellow",
        casNumber: "1934-21-0",
    },
    {
        id: 10,
        name: "Disperse Orange 30",
        category: "dyes",
        colorShade: "#FF8C00",
        ciGenericName: "Disperse Orange",
        casNumber: "5261-31-4",
    },

    // MASTERBATCH
    {
        id: 11,
        name: "Red Masterbatch",
        category: "masterbatch",
        colorShade: "#FF0000",
        ciGenericName: "Red Color Masterbatch",
        casNumber: "MB-RED-001",
    },
    {
        id: 12,
        name: "Blue Masterbatch",
        category: "masterbatch",
        colorShade: "#0066CC",
        ciGenericName: "Blue Color Masterbatch",
        casNumber: "MB-BLUE-001",
    },
    {
        id: 13,
        name: "Green Masterbatch",
        category: "masterbatch",
        colorShade: "#00AA00",
        ciGenericName: "Green Color Masterbatch",
        casNumber: "MB-GREEN-001",
    },

    // SPECIALTY
    {
        id: 14,
        name: "Pearl Luster Silver",
        category: "specialty",
        colorShade: "#C0C0C0",
        ciGenericName: "Mica Based Pearl Pigment",
        casNumber: "12001-26-2",
    },
    {
        id: 15,
        name: "Metallic Gold",
        category: "specialty",
        colorShade: "#FFD700",
        ciGenericName: "Bronze Powder",
        casNumber: "7440-50-8",
    }
];

// Inquiry cart to store selected products
let inquiryCart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const filterButtons = document.querySelectorAll('.products-filter-btn');
const categoryCards = document.querySelectorAll('.products-category-card');

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
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

// Create product card with 6 per row layout and color shade instead of image
function createProductCard(product, index) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-lg-2'; // 6 products per row on large screens

    const isInInquiry = inquiryCart.some(item => item.id === product.id);

    col.innerHTML = `
        <div class="products-product-card fade-out" data-category="${product.category}" style="animation-delay: ${index * 0.1}s">
            <div class="products-product-color-shade" style="background-color: ${product.colorShade};">
                <div class="color-shade-overlay">
                    <span class="color-name">${product.name}</span>
                </div>
            </div>
            <div class="products-product-info">
                <div class="products-product-category">${product.category}</div>
                <h6 class="products-product-title">${product.name}</h6>
                <div class="technical-details">
                    <div class="tech-detail">
                        <div class="tech-label">C.I. Generic Name:</div>
                        <div class="tech-value">${product.ciGenericName}</div>
                    </div>
                    <div class="tech-detail">
                        <div class="tech-label">CAS No.:</div>
                        <div class="tech-value">${product.casNumber}</div>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn ${isInInquiry ? 'btn-success' : 'btn-primary'} btn-sm products-btn-add-inquiry" 
                            onclick="toggleInquiry(${product.id})" 
                            data-product-id="${product.id}">
                        <i class="fas ${isInInquiry ? 'fa-check' : 'fa-plus'} me-1"></i>
                        ${isInInquiry ? 'Added' : 'Add to Inquiry'}
                    </button>
                </div>
            </div>
        </div>
    `;

    return col;
}

// Initialize filters
function initializeFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
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
        card.addEventListener('click', function () {
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

// Toggle product in inquiry cart
function toggleInquiry(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = inquiryCart.findIndex(item => item.id === productId);
    const button = document.querySelector(`[data-product-id="${productId}"]`);

    if (existingIndex > -1) {
        // Remove from inquiry
        inquiryCart.splice(existingIndex, 1);
        button.classList.remove('btn-success');
        button.classList.add('btn-primary');
        button.innerHTML = '<i class="fas fa-plus me-1"></i>Add to Inquiry';

        showNotification('Product removed from inquiry', 'info');
    } else {
        // Add to inquiry
        inquiryCart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            colorIndex: product.colorIndex,
            ciGenericName: product.ciGenericName,
            casNumber: product.casNumber
        });
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
        button.innerHTML = '<i class="fas fa-check me-1"></i>Added';

        showNotification('Product added to inquiry', 'success');
    }

    updateInquiryCounter();
}

// Update inquiry counter in navigation or header
function updateInquiryCounter() {
    const counter = document.querySelector('.inquiry-counter');
    const stickyCounter = document.querySelector('.sticky-inquiry-counter');
    const stickyButton = document.querySelector('.sticky-inquiry-cart');

    // Update both counters
    if (counter) {
        counter.textContent = inquiryCart.length;
        counter.style.display = inquiryCart.length > 0 ? 'inline' : 'none';
    }

    if (stickyCounter) {
        stickyCounter.textContent = inquiryCart.length;
        stickyCounter.style.display = inquiryCart.length > 0 ? 'flex' : 'none';
    }

    // Show/hide sticky button based on cart items
    if (stickyButton) {
        if (inquiryCart.length > 0) {
            stickyButton.classList.add('show');
            stickyButton.classList.remove('hide');
            stickyButton.style.display = 'block';
        } else {
            // Keep button visible but without counter
            stickyButton.classList.remove('show');
            stickyButton.style.display = 'block';
        }
    }

    // Update modal content
    updateInquiryModal();
}

// Update inquiry modal content
function updateInquiryModal() {
    const emptyState = document.getElementById('inquiryCartEmpty');
    const itemsState = document.getElementById('inquiryCartItems');
    const modalFooter = document.getElementById('inquiryModalFooter');
    const itemCount = document.getElementById('inquiryItemCount');
    const itemsList = document.getElementById('inquiryItemsList');

    if (inquiryCart.length === 0) {
        emptyState.style.display = 'block';
        itemsState.style.display = 'none';
        modalFooter.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        itemsState.style.display = 'block';
        modalFooter.style.display = 'flex';

        itemCount.textContent = inquiryCart.length;

        // Populate items list
        itemsList.innerHTML = '';
        inquiryCart.forEach((item, index) => {
            const product = products.find(p => p.id === item.id);
            if (product) {
                const itemElement = createInquiryItemElement(product, index);
                itemsList.appendChild(itemElement);
            }
        });
    }
}

// Create inquiry item element
function createInquiryItemElement(product, index) {
    const div = document.createElement('div');
    div.className = 'inquiry-item border rounded-3 p-3 mb-3';
    div.innerHTML = `
        <div class="row align-items-center">
            <div class="col-2">
                <div class="inquiry-item-color" style="background-color: ${product.colorShade}; width: 50px; height: 50px; border-radius: 8px; border: 2px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
            </div>
            <div class="col-8">
                <h6 class="mb-1 fw-bold">${product.name}</h6>
                <div class="small text-muted">
                    <div><strong>Category:</strong> ${product.category}</div>
                    <div><strong>Generic Name:</strong> ${product.ciGenericName}</div>
                    <div><strong>CAS No.:</strong> ${product.casNumber}</div>
                    <div><strong>Color Index:</strong> ${product.colorIndex}</div>
                </div>
            </div>
            <div class="col-2 text-end">
                <button class="btn btn-sm btn-outline-danger" onclick="removeFromInquiry(${product.id})" title="Remove from inquiry">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    return div;
}

// Remove product from inquiry
function removeFromInquiry(productId) {
    const existingIndex = inquiryCart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
        inquiryCart.splice(existingIndex, 1);

        // Update button state
        const button = document.querySelector(`[data-product-id="${productId}"]`);
        if (button) {
            button.classList.remove('btn-success');
            button.classList.add('btn-primary');
            button.innerHTML = '<i class="fas fa-plus me-1"></i>Add to Inquiry';
        }

        updateInquiryCounter();
        showNotification('Product removed from inquiry', 'info');
    }
}

// Clear entire inquiry cart
function clearInquiryCart() {
    if (inquiryCart.length === 0) return;

    // Update all button states
    inquiryCart.forEach(item => {
        const button = document.querySelector(`[data-product-id="${item.id}"]`);
        if (button) {
            button.classList.remove('btn-success');
            button.classList.add('btn-primary');
            button.innerHTML = '<i class="fas fa-plus me-1"></i>Add to Inquiry';
        }
    });

    inquiryCart = [];
    updateInquiryCounter();
    showNotification('Inquiry cart cleared', 'info');
}

// Send WhatsApp inquiry
function sendWhatsAppInquiry() {
    const customerName = document.getElementById('customerName').value.trim();
    const customerCompany = document.getElementById('customerCompany').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const inquiryMessage = document.getElementById('inquiryMessage').value.trim();

    // Validation
    if (!customerName) {
        showNotification('Please enter your name', 'warning');
        document.getElementById('customerName').focus();
        return;
    }

    if (!customerPhone) {
        showNotification('Please enter your phone number', 'warning');
        document.getElementById('customerPhone').focus();
        return;
    }

    if (inquiryCart.length === 0) {
        showNotification('Please add products to your inquiry cart', 'warning');
        return;
    }

    // Build WhatsApp message
    let message = `🎨 *Product Inquiry - Mayur Colour & Chemicals*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${customerName}\n`;
    if (customerCompany) message += `Company: ${customerCompany}\n`;
    message += `Phone: ${customerPhone}\n`;
    if (customerEmail) message += `Email: ${customerEmail}\n`;

    message += `\n📦 *Products of Interest (${inquiryCart.length} items):*\n`;

    inquiryCart.forEach((item, index) => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            message += `\n${index + 1}. *${product.name}*\n`;
            message += `   Category: ${product.category}\n`;
            message += `   Generic Name: ${product.ciGenericName}\n`;
            message += `   CAS Number: ${product.casNumber}\n`;
            message += `   Color Index: ${product.colorIndex}\n`;
        }
    });

    if (inquiryMessage) {
        message += `\n💬 *Additional Message:*\n${inquiryMessage}`;
    }

    message += `\n\n🌐 Visit: www.mayurcolour.com`;
    message += `\n📧 Email: info@mayurcolour.com`;

    // WhatsApp business number (replace with actual number)
    const whatsappNumber = '+919876543210'; // Replace with actual WhatsApp business number

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success message
    showNotification('Opening WhatsApp...', 'success');

    // Optional: Clear form after sending
    setTimeout(() => {
        document.getElementById('customerName').value = '';
        document.getElementById('customerCompany').value = '';
        document.getElementById('customerPhone').value = '';
        document.getElementById('customerEmail').value = '';
        document.getElementById('inquiryMessage').value = '';
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification-toast`;

    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    else if (type === 'warning') icon = 'exclamation-triangle';
    else if (type === 'danger') icon = 'exclamation-circle';

    notification.innerHTML = `
        <i class="fas fa-${icon} me-2"></i>
        ${message}
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Modal functionality removed as per requirements

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

// Color swatch interactions removed as per requirements

// Add notification and inquiry animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes productsRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-toast {
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border: none;
        border-radius: 8px;
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

// Loading states removed as details button was removed

// Keyboard navigation for accessibility - modal functionality removed

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