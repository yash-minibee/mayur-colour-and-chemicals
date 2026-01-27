// Mayur Colour Admin Panel JavaScript - Cleaned & Optimized

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the admin panel
    initializeAdminPanel();
    
    // Initialize page-specific functionality
    initializePageSpecific();
});

function initializeAdminPanel() {
    // Initialize sidebar navigation
    initializeSidebar();
    
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize date display
    updateCurrentDate();
    
    // Initialize filters
    initializeFilters();
}

// Page-specific initialization
function initializePageSpecific() {
    // Check if we're on products page
    if (document.getElementById('productsGrid')) {
        initializeProductsPage();
    }
    
    // Check if we're on dashboard page
    if (document.getElementById('currentDate')) {
        initializeDashboardPage();
    }
}

// Products Page Specific Functions
function initializeProductsPage() {
    initializeShadeSwatches();
    initializeProductModal();
}

// Dashboard Page Specific Functions
function initializeDashboardPage() {
    initializeShadeSwatchHoverEffects();
}

// Sidebar Navigation
function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    
    // Sidebar toggle functionality
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            sidebar.classList.toggle('show'); // For mobile
        });
    }
    
    // Navigation link functionality (only for SPA - index.html)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const sectionName = this.getAttribute('data-section');
            
            // Only prevent default and handle sections for SPA
            if (sectionName) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Show corresponding section
                showSection(sectionName);
            }
        });
    });
}

// Section Management (for SPA - index.html only)
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.classList.add('fade-in');
    }
}

// Tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            delay: { show: 300, hide: 100 }
        });
    });
}

// Date Display
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Dashboard Shade Swatch Hover Effects
function initializeShadeSwatchHoverEffects() {
    const shadeSwatches = document.querySelectorAll('.shade-swatch:not(.interactive)');
    shadeSwatches.forEach(swatch => {
        swatch.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.zIndex = '10';
        });
        
        swatch.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.zIndex = '';
        });
    });
}

// Interactive Shade Swatches (Products Page)
function initializeShadeSwatches() {
    const shadeSwatches = document.querySelectorAll('.shade-swatch.interactive');
    
    shadeSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Toggle selection
            this.classList.toggle('selected');
            
            // Add animation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // Enhanced hover effect
        swatch.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.zIndex = '10';
        });
        
        swatch.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = '';
            }
            this.style.zIndex = '';
        });
    });
}

// Product Modal Functionality
function initializeProductModal() {
    let selectedShades = [];

    const addShadeBtn = document.getElementById('addShadeBtn');
    const saveProductBtn = document.getElementById('saveProductBtn');
    const shadeColorInput = document.getElementById('shadeColor');
    const previewSwatch = document.getElementById('previewSwatch');

    // Shade color preview
    if (shadeColorInput && previewSwatch) {
        shadeColorInput.addEventListener('input', function () {
            previewSwatch.style.backgroundColor = this.value;
        });
    }

    // Add shade functionality
    if (addShadeBtn) {
        addShadeBtn.addEventListener('click', function () {
            const shadeName = document.getElementById('shadeName').value.trim();
            const shadeCode = document.getElementById('shadeCode').value.trim();
            const shadeColor = document.getElementById('shadeColor').value;
            const shadeFamily = document.getElementById('shadeFamily').value;

            if (!shadeName || !shadeCode) {
                showNotification('Please enter both shade name and code', 'warning');
                return;
            }

            // Check for duplicate shade codes
            const isDuplicate = selectedShades.some(shade => shade.code === shadeCode);
            if (isDuplicate) {
                showNotification('Shade code already exists', 'danger');
                return;
            }

            // Add shade to list
            const shade = { name: shadeName, code: shadeCode, color: shadeColor, family: shadeFamily };
            selectedShades.push(shade);
            updateShadeList();
            clearShadeForm();
            showNotification('Shade added successfully', 'success');
        });
    }

    // Save product functionality
    if (saveProductBtn) {
        saveProductBtn.addEventListener('click', function () {
            const productName = document.getElementById('productName').value.trim();
            const productCode = document.getElementById('productCode').value.trim();
            const productCategory = document.getElementById('productCategory').value;

            if (!productName || !productCode || !productCategory) {
                showNotification('Please fill in all required fields', 'warning');
                return;
            }

            // Simulate saving
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
            this.disabled = true;

            setTimeout(() => {
                showNotification('Product saved successfully!', 'success');
                document.getElementById('addProductForm').reset();
                selectedShades = [];
                updateShadeList();

                const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
                if (modal) modal.hide();

                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    }

    function updateShadeList() {
        const shadeList = document.getElementById('shadeList');
        if (!shadeList) return;

        shadeList.innerHTML = '';

        if (selectedShades.length === 0) {
            shadeList.innerHTML = '<div class="text-muted text-center py-3">No shades added yet</div>';
            return;
        }

        selectedShades.forEach((shade, index) => {
            const shadeItem = document.createElement('div');
            shadeItem.className = 'shade-item slide-in';
            shadeItem.innerHTML = `
                <div class="shade-swatch" style="background-color: ${shade.color};"></div>
                <div class="shade-info">
                    <div class="shade-name">${shade.name}</div>
                    <div class="shade-code">${shade.code}</div>
                </div>
                <button type="button" class="remove-shade" onclick="removeShade(${index})" title="Remove shade">
                    <i class="bi bi-x-lg"></i>
                </button>
            `;
            shadeList.appendChild(shadeItem);
        });
    }

    function clearShadeForm() {
        const shadeName = document.getElementById('shadeName');
        const shadeCode = document.getElementById('shadeCode');
        const shadeColor = document.getElementById('shadeColor');
        const previewSwatch = document.getElementById('previewSwatch');
        
        if (shadeName) shadeName.value = '';
        if (shadeCode) shadeCode.value = '';
        if (shadeColor) shadeColor.value = '#FF6B6B';
        if (previewSwatch) previewSwatch.style.backgroundColor = '#FF6B6B';
    }

    // Global function for removing shades
    window.removeShade = function (index) {
        selectedShades.splice(index, 1);
        updateShadeList();
    };
}

// Filters
function initializeFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    const shadeFilter = document.getElementById('shadeFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
    
    if (shadeFilter) {
        shadeFilter.addEventListener('change', applyFilters);
    }
    
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(applyFilters, 300);
        });
    }
}

function applyFilters() {
    const category = document.getElementById('categoryFilter')?.value || '';
    const status = document.getElementById('statusFilter')?.value || '';
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const cardParent = card.closest('.col-xl-4, .col-lg-6');
        let shouldShow = true;
        
        // Category filter
        if (category) {
            const categoryBadge = card.querySelector('.badge');
            const cardCategory = categoryBadge ? categoryBadge.textContent.toLowerCase() : '';
            if (!cardCategory.includes(category.toLowerCase())) {
                shouldShow = false;
            }
        }
        
        // Status filter
        if (status) {
            const statusBadges = card.querySelectorAll('.badge');
            let hasStatus = false;
            statusBadges.forEach(badge => {
                if (badge.textContent.toLowerCase().includes(status.toLowerCase())) {
                    hasStatus = true;
                }
            });
            if (!hasStatus) {
                shouldShow = false;
            }
        }
        
        // Search filter
        if (search) {
            const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const code = card.querySelector('small')?.textContent.toLowerCase() || '';
            if (!title.includes(search) && !code.includes(search)) {
                shouldShow = false;
            }
        }
        
        // Show/hide card with animation
        if (shouldShow) {
            if (cardParent) cardParent.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            if (cardParent) cardParent.style.display = 'none';
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 8px;
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Export functions for global access
window.showSection = showSection;
window.showNotification = showNotification;
window.applyFilters = applyFilters;