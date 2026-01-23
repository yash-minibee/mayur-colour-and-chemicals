// Products Page JavaScript

// Sample product data with enhanced technical details
const products = [
    {
        id: 1,
        name: "Titanium Dioxide White",
        category: "pigments",
        description: "High-opacity white pigment for coatings and plastics with excellent UV resistance.",
        colorShade: "#FFFFFF",
        colors: ["#FFFFFF", "#F8F9FA", "#E9ECEF"],
        colorIndex: "PW 6",
        genericName: "Titanium Dioxide",
        casNumber: "13463-67-7",
        specifications: {
            "Chemical Name": "Titanium Dioxide (TiO₂)",
            "Color Index": "PW 6",
            "CAS Number": "13463-67-7",
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
        colorShade: "#CD5C5C",
        colors: ["#CD5C5C", "#B22222", "#8B0000"],
        colorIndex: "PR 101",
        genericName: "Iron Oxide",
        casNumber: "1309-37-1",
        specifications: {
            "Chemical Name": "Iron Oxide (Fe₂O₃)",
            "Color Index": "PR 101",
            "CAS Number": "1309-37-1",
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
        colorShade: "#FFFF00",
        colors: ["#FFFF00", "#FFD700", "#FFA500"],
        colorIndex: "PY 34",
        genericName: "Lead Chromate",
        casNumber: "7758-97-6",
        specifications: {
            "Chemical Name": "Lead Chromate (PbCrO₄)",
            "Color Index": "PY 34",
            "CAS Number": "7758-97-6",
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
        colorShade: "#0066CC",
        colors: ["#0066CC", "#003399", "#001166"],
        colorIndex: "RB 19",
        genericName: "Anthraquinone derivative",
        casNumber: "2580-78-1",
        specifications: {
            "Chemical Name": "Anthraquinone derivative",
            "Color Index": "RB 19",
            "CAS Number": "2580-78-1",
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
        colorShade: "#DC143C",
        colors: ["#DC143C", "#B22222", "#8B0000"],
        colorIndex: "AR 88",
        genericName: "Azo compound",
        casNumber: "1658-56-6",
        specifications: {
            "Chemical Name": "Azo compound",
            "Color Index": "AR 88",
            "CAS Number": "1658-56-6",
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
        colorShade: "#FF0000",
        colors: ["#FF0000", "#CC0000", "#990000"],
        colorIndex: "PR 254",
        genericName: "Diketopyrrolopyrrole",
        casNumber: "84632-65-5",
        specifications: {
            "Base Polymer": "PE/PP",
            "Color Index": "PR 254",
            "CAS Number": "84632-65-5",
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
        colorShade: "#0000FF",
        colors: ["#0000FF", "#0000CC", "#000099"],
        colorIndex: "PB 15:3",
        genericName: "Copper Phthalocyanine",
        casNumber: "147-14-8",
        specifications: {
            "Base Polymer": "PE/PP/PS",
            "Color Index": "PB 15:3",
            "CAS Number": "147-14-8",
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
        colorShade: "#FFD700",
        colors: ["#FFD700", "#FFA500", "#FF8C00"],
        colorIndex: "PM 1",
        genericName: "Mica + Metal Oxide",
        casNumber: "12001-26-2",
        specifications: {
            "Base Material": "Mica + Metal Oxide",
            "Color Index": "PM 1",
            "CAS Number": "12001-26-2",
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
        colorShade: "#F8F8FF",
        colors: ["#F8F8FF", "#E6E6FA", "#D8BFD8"],
        colorIndex: "PM 2",
        genericName: "Natural Mica",
        casNumber: "12001-26-2",
        specifications: {
            "Base Material": "Natural Mica",
            "Color Index": "PM 2",
            "CAS Number": "12001-26-2",
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
    },
    {
        id: 10,
        name: "Ultramarine Blue",
        category: "pigments",
        description: "Brilliant blue pigment with excellent heat stability and chemical resistance.",
        colorShade: "#4169E1",
        colors: ["#4169E1", "#0000CD", "#191970"],
        colorIndex: "PB 29",
        genericName: "Ultramarine",
        casNumber: "57455-37-5",
        specifications: {
            "Chemical Name": "Ultramarine",
            "Color Index": "PB 29",
            "CAS Number": "57455-37-5",
            "Particle Size": "0.5-5.0 μm",
            "Oil Absorption": "25-35 g/100g",
            "pH Value": "8.0-10.0",
            "Heat Stability": "Up to 600°C"
        },
        applications: [
            "Plastic coloring",
            "Rubber products",
            "Cosmetic applications",
            "Detergent whitening",
            "Paper brightening"
        ]
    },
    {
        id: 11,
        name: "Carbon Black",
        category: "pigments",
        description: "High-quality carbon black pigment providing deep black color and UV protection.",
        colorShade: "#000000",
        colors: ["#000000", "#1C1C1C", "#2F2F2F"],
        colorIndex: "PBk 7",
        genericName: "Carbon Black",
        casNumber: "1333-86-4",
        specifications: {
            "Chemical Name": "Carbon Black",
            "Color Index": "PBk 7",
            "CAS Number": "1333-86-4",
            "Particle Size": "15-50 nm",
            "Oil Absorption": "90-120 ml/100g",
            "pH Value": "7.0-9.0",
            "Ash Content": "≤0.5%"
        },
        applications: [
            "Automotive coatings",
            "Plastic masterbatch",
            "Printing inks",
            "Rubber compounds",
            "Conductive applications"
        ]
    },
    {
        id: 12,
        name: "Quinacridone Magenta",
        category: "pigments",
        description: "High-performance quinacridone pigment with exceptional lightfastness and transparency.",
        colorShade: "#FF1493",
        colors: ["#FF1493", "#DC143C", "#B22222"],
        colorIndex: "PR 122",
        genericName: "Quinacridone",
        casNumber: "980-26-7",
        specifications: {
            "Chemical Name": "Quinacridone",
            "Color Index": "PR 122",
            "CAS Number": "980-26-7",
            "Particle Size": "0.1-0.3 μm",
            "Oil Absorption": "45-65 g/100g",
            "Light Fastness": "8 (Blue Wool Scale)",
            "Heat Stability": "Up to 300°C"
        },
        applications: [
            "High-end automotive paints",
            "Artist colors",
            "Architectural coatings",
            "Plastic applications",
            "Printing inks"
        ]
    }
];

// Inquiry cart to store selected products
let inquiryCart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const filterButtons = document.querySelectorAll('.products-filter-btn');
const categoryCards = document.querySelectorAll('.products-category-card');

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

// Create product card with 6 per row layout and color shade instead of image
function createProductCard(product, index) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-lg-2'; // 6 products per row on large screens
    
    const isInInquiry = inquiryCart.some(item => item.id === product.id);
    
    col.innerHTML = `
        <div class="products-product-card fade-out" data-category="${product.category}" style="animation-delay: ${index * 0.1}s">
            <div class="products-product-color-shade" style="background: linear-gradient(135deg, ${product.colorShade} 0%, ${product.colors[1] || product.colorShade} 100%);">
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
                        <div class="tech-value">${product.genericName}</div>
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
            genericName: product.genericName,
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
                <div class="inquiry-item-color" style="background: linear-gradient(135deg, ${product.colorShade} 0%, ${product.colors[1] || product.colorShade} 100%); width: 50px; height: 50px; border-radius: 8px;"></div>
            </div>
            <div class="col-8">
                <h6 class="mb-1 fw-bold">${product.name}</h6>
                <div class="small text-muted">
                    <div><strong>Category:</strong> ${product.category}</div>
                    <div><strong>Generic Name:</strong> ${product.genericName}</div>
                    <div><strong>CAS No.:</strong> ${product.casNumber}</div>
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
            message += `   Generic Name: ${product.genericName}\n`;
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